import React, { Component } from 'react';
import history from '../history';
import { AppContext } from '../AppContext';
import Canvas from '@components/Canvas/Canvas';
import OrderList from '@components/Order/OrderList';
import OrderFooter from '@components/Order/OrderFooter';
import DragZone from '@components/Order/DragZone';
import Guide from '@components/Order/Guide';


export default class UploadPage extends Component {

    constructor(props) {
        super();
        this.typeRequested = props.type;
        this.state = { 
            openedItem: null, 
            validating: false 
        };
    }

    render() {
        let showCanvas = this.state.openedItem && this.state.openedItem.drawing;
        let isOptionsLoaded = !!this.context.thicknessOptions;
        let mode = this.context.orderMode;

        return (
            <div className="container stick">
                <DragZone mode={mode}
                        onSelected={this.handleFiles.bind(this)}/>
                {mode === "drawing" ?
                    <Guide />
                : ""}
                {isOptionsLoaded ? 
                    <OrderList items={this.context.items}
                            validating={this.state.validating}
                            onChange={this.editOrderItem.bind(this)}
                            onDelete={this.deleteOrderItem.bind(this)}
                            onDrawingOpen={this.openDrawing.bind(this)} />
                : ""}
                <OrderFooter mode={mode}
                        onSubmit={this.submit.bind(this)}
                        cost={this.context.getTotalCost()}
                        quantity={this.context.getItemsCount()} />
                {showCanvas ?
                    <Canvas openedItem={this.state.openedItem}
                            onClose={() => this.setState({ openedItem: null })} />
                : ""}
            </div>
        );
    }

    componentDidMount() {
        document.title = "Выбор файлов";
    }

    handleFiles(files) {
        this.context.addOrderItems(files);
    }

    deleteOrderItem(index) {
        this.context.deleteOrderItem(index);
    }

    editOrderItem(index, item) {
        this.context.editOrderItem(index, item);
    }

    openDrawing(index) {
        this.setState({ openedItem: this.context.items[index] });
    }

    validate() {
        this.setState({ validating: true });
        for (let item of this.context.items) {
            if (!item.isDeleted) {
                if (!item.isValid())
                    return false;
                item.description = item.description?.substring(0, 1000);
            }
        }
        return true;
    }

    submit() {
        if (this.context.getItemsCount() === 0) {
            this.context.notifications.error("Загрузите файлы!");
            return;
        }

        this.setState({ validating: true });
        if (this.validate()) {
            history.push("/order/form");
        } else {
            this.context.notifications.error("Форма не заполнена!");
        }
    }

}

UploadPage.contextType = AppContext;
