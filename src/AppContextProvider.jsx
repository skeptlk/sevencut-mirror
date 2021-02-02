import React, { Component } from 'react';
import AppContext from './AppContext';
import history from './history';
import OrderItemDTO from  '@models/OrderItemDto.class';
import OrderItem from '@models/OrderItem.class';


export default class AppContextProvider extends Component {

    constructor(props) {
        super(props);
        this.url = process.env.NODE_ENV === 'development' 
            ? 'https://7cut.ru/api/' 
            : '/api/';
        this.lastId = 0;

        let { orderID, orderMode, items } = this.loadSessionStore();
        
        this.state = {
            items,
            orderID,
            orderMode,
            isCompany: false,
            thicknessOptions: undefined,
            isOrderSending: false,
            notifications: null,
            sendOrder: this.sendOrder.bind(this),
            getTotalCost: this.getTotalCost.bind(this),
            setOrderMode: this.setOrderMode.bind(this),
            setIsCompany: this.setIsCompany.bind(this),
            getItemsCount: this.getItemsCount.bind(this),
            addOrderItems: this.addOrderItems.bind(this),
            editOrderItem: this.editOrderItem.bind(this),
            deleteOrderItem: this.deleteOrderItem.bind(this),
            destroyOrderItem: this.destroyOrderItem.bind(this),
            restoreOrderItem: this.restoreOrderItem.bind(this),
            registerNotificationService: this.registerNotificationService.bind(this)
        }
        
        this.loadCuttingOptions();
    }

    registerNotificationService(service) {
        this.setState({ notifications: service });
    }

    setOrderMode(orderMode) {
        // console.log(`==> Order mode switching to ${orderMode}`);
        if (orderMode !== this.state.orderMode) {
            this.setState({ orderMode });
            sessionStorage.setItem("orderMode", orderMode);
            this.destroyAllItems();
        }
    }

    setIsCompany(isCompany) {
        this.setState({ isCompany });
    }

    loadCuttingOptions () {
        fetch('/cut-options.json')
            .then(response => response.json())
            .then(options => {
                OrderItem.options = options; 
                this.setState({ thicknessOptions: options.thickness });
            });
    }

    async getCalculations (orderItem) {
        var formData = new FormData();
        formData.append("file", orderItem.file);

        const url = this.url + 'dxf/';
        const method = "POST";
        const body = formData;

        fetch(url, { method, body })
            .then(response => response.json())
            .then(
                (result) => {
                    if (result.hasOwnProperty('error')) {
                        orderItem.isError = true;
                        orderItem.isLoading = false;
                        this.state.notifications.error(
                            `Файл ${orderItem.name} содержит ошибку и не может быть обработан сервером, но вы можете отправить его для оценки стоимости вручную.`
                        );
                        console.error(result.error);
                        this.destroyOrderItem(orderItem.id);
                    } else {
                        orderItem.drawing = result.entities;
                        orderItem.thumbnail = result.thumbnail;
                        orderItem.area = result.area;
                        orderItem.closedContours = result.closedContours;
                        orderItem.perimeter = result.perimeter;
                        orderItem.isLoading = false;

                        let items = this.state.items.map(item => item.id === orderItem.id ? orderItem : item);
                        this.setState({ items });
                    }
                },
                (err) => {
                    this.state.notifications.error('[Ошибка сервера]: ' + err);
                    console.error(err);
                }
            );
    }

    addOrderItems(files) {
        const isDxfMode = (this.state.orderMode === "drawing");
        const sizeLimit = 20 * 1024 * 1024;

        var items = this.state.items;

        files.forEach(file => {
            if (file.size > sizeLimit) {
                this.state.notifications.error("Этот файл слишком большой. Загрузите файл меньшего размера");
                return;
            }
            if (isDxfMode && file.name.split('.').pop() !== "dxf") {
                this.state.notifications.error("Вы не можете загружать файлы этого формата в режиме расчёта стоимости");
                return;
            }

            var item = new OrderItem(++this.lastId, file);
            item.isLoading = isDxfMode;
            items.push(item);
            this.saveFileInSession(item);
            
            if (isDxfMode) {
                this.getCalculations(item);
            }
        });

        this.saveItemsInSession(items);
        this.setState({ items });
    }

    editOrderItem(index, item) {
        var modified = this.state.items.map((el, i) =>
            i === index ? item : el
        );
        this.saveItemsInSession(modified);
        this.setState({ items: modified });
    }

    deleteOrderItem(id) {
        this.state.items.find(i => i.id === id).isDeleted = true;
        this.saveItemsInSession(this.state.items);
        this.setState({ items: this.state.items });
    }

    destroyOrderItem(id) {
        let items = this.state.items.filter(i => i.id !== id);
        this.removeFileFromSession(id);
        this.saveItemsInSession(items);
        this.setState({ items });
    }

    destroyAllItems() {
        for (let item in this.state.items)
            this.removeFileFromSession(item.id);
        this.saveItemsInSession([]);
        this.setState({ items: [] });
    }

    restoreOrderItem(id) {
        this.state.items.find(item => item.id === id).isDeleted = false;
        this.saveItemsInSession(this.state.items);
        this.setState({ items: this.state.items });
    }

    getTotalCost() {
        return this.state.items.reduce((total, el) => 
            (el.isChecked) ? (total + el.cost() * el.quantity) : total, 0).toFixed(2);
    }

    getItemsCount() {
        const isDxfMode = (this.state.orderMode === "drawing");
        return this.state.items.reduce((count, el) => 
            (el.isChecked && !el.isDeleted && !(el.isError && isDxfMode)) 
            ? (count + Number(el.quantity)) : count, 0
        );
    }

    sendOrder({ userData, juridicalData }) {
        this.setState({ isOrderSending: true });
        const isDxfMode = (this.state.orderMode === "drawing");
            
        const url = this.url + 'order/' + (isDxfMode ? 'dxf' : 'any');
        const headers = new Headers({'Content-Type': 'application/json'});
        const method = 'POST';
        const items = this.state.items
                                .filter(item => 
                                    item.isChecked && 
                                    !item.isDeleted && 
                                    !(item.isError && isDxfMode)
                                )
                                .map(item => new OrderItemDTO(item));
        
        const body = JSON.stringify({
            userData,
            juridicalData,
            items
        });
        
        fetch(url, { method, headers, body })
            .then(response => response.json())
            .then(
                (result) => {
                    if (result.hasOwnProperty('error')) {
                        this.state.notifications.error('[Ошибка]: ' + result.error.text);
                        console.error(result.error);
                    } else {
                        if (Number.isInteger(result)) {
                            this.state.notifications.info("Заказ отправлен! ID вашего заказа " + result);
                            history.push("/order/thanks");
                            this.destroyAllItems();
                            this.setState({ orderID: result });
                        } else 
                            this.state.notifications.error("Ошибка при отправке заказа!");
                    }
                },
                (err) => {
                    this.state.notifications.error("Ошибка при отправке заказа!");
                    console.error(err);
                }
            )
            .finally(() => {
                this.setState({ isOrderSending: false });
            });
    }

    loadSessionStore() {
        var orderMode = sessionStorage.getItem("orderMode") || "any";
        var items = JSON.parse(sessionStorage.getItem("items")) || [];
        var orderID = 0;

        items = items.map(base => {
            // convert to OrderItems instances
            // TODO: can we simplify next line?
            var instance = Object.assign(Object.create(OrderItem.create()), base);
            const base64 = sessionStorage.getItem("item_" + instance.id);
            if (base64) {
                instance.restoreFromBase64(base64);
                orderID = Math.max(instance.id, orderID);
                if (orderMode === 'drawing') {
                    this.getCalculations(instance);
                }
                return instance;
            }
            return undefined; // base64 not found
        })
        .filter(i => !!i); // remove undefineds

        return { orderMode, orderID, items };
    }

    saveItemsInSession(items) {
        setTimeout(() => 
            sessionStorage.setItem("items", JSON.stringify(items))
        , 0);
    }

    async saveFileInSession(item) {
        const base64 = await item.encodeBase64();
        sessionStorage.setItem("item_" + item.id, base64);
    }

    removeFileFromSession(id) {
        sessionStorage.removeItem("item_" + id);
    }

    render() {
        return (
            <AppContext.Provider
                value={{...this.state}}>
                {this.props.children}
            </AppContext.Provider>
        );
    }
}
