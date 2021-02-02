import React, { Component } from 'react';
import { AppContext } from '../AppContext';
import history from './../history';
import '@styles/Order.scss';


export default class UserFormPage extends Component {

    constructor() {
        super();

        this.state = {
            isCompany: false,
            formGroups: [
                {
                    name: "userData",
                    title: "Контактные данные",
                    visible: true,
                    fields: [
                        {
                            name: 'username',
                            placeholder: 'ФИО',
                            type: 'text',
                            words: 1
                        }, {
                            name: 'email',
                            placeholder: 'Email',
                            type: 'email'
                        }, {
                            name: 'phone',
                            placeholder: 'Телефон',
                            type: 'phone',
                            minLen: 5
                        }, {
                            name: 'address',
                            placeholder: 'Адрес',
                            type: 'text',
                            minLen: 5
                        }
                    ]
                },
                {
                    name: "juridicalData",
                    title: "Информация о компании",
                    visible: false,
                    fields: [
                        {
                            name: 'organizationName',
                            placeholder: 'Наименование организации',
                            type: 'string',
                            minLen: 3
                        }, {
                            name: 'bankAccount',
                            placeholder: 'Номер банковского счёта',
                            type: 'number',
                            minLen: 7
                        }, {
                            name: 'inn',
                            placeholder: 'ИНН',
                            type: 'number',
                            exactLen: 10
                        }, {
                            name: 'kpp',
                            placeholder: 'КПП',
                            type: 'number',
                            exactLen: 9
                        }, {
                            name: 'bik',
                            placeholder: 'БИК',
                            type: 'number',
                            exactLen: 9
                        }
                    ]
                }
            ]
        };
        // this.__fillForm();
    }

    componentDidMount() {
        document.title = "Оформление заказа";
        
        if (this.context.items.length === 0)
            history.push("/order");
        
        let isDxfMode = this.context.orderMode === "drawing";
        // set formgroup visibility
        for (let fg of this.state.formGroups) {
            if (isDxfMode && fg.name === "juridicalData")
                fg.visible = false;
        }
    }

    handleChange = (e, field) => {
        field.value = e.target.value;
        if (field.error)
            this.validateField(field, false);
        // probably not the best practice
        this.setState(this.state);
    }

    /*__fillForm() {
        let defaults = {
            'bankAccount': "124567890",
            'organizationName': "Fly-by-night LLC",
            'inn': "4379815678",
            'kpp': "133719725",
            'bik': "934556124",
            'username': 'Богдан Корж',
            'email': "sceptlc@bk.ru",
            'phone': "89155320000",
            'address': "Брянск, улица Пушкина, 1337"
        };
        this.state.formGroups.forEach((fg) => {
            fg.fields.forEach(field => {
                field.value = defaults[field.name];
            });
        });
    }*/

    validateField(field, shouldRerender = false) {
        var emailRegEx = /(.+)@(.+){2,}\.(.+){2,}/;
        var numberRegEx = /^\d+$/;
        const maxLen = 300;

        if (!field.value)
            field.error = "Заполните поле!";
        else if (field.minLen && field.value.length < field.minLen)
            field.error = "Заполните поле!";
        else if (field.value.length > maxLen)
            field.error = "Длина поля слишком большая";
        else if (field.exactLen && field.value.length !== field.exactLen)
            field.error = "Здесь должно быть ровно " + field.exactLen + " символов";
        else if (field.type === "email" && !emailRegEx.test(field.value))
            field.error = "Введите корректный адрес электронной почты";
        else if (field.type === "number" && !numberRegEx.test(field.value))
            field.error = "Это поле должно содержать число";
        else
            field.error = undefined;

        if (shouldRerender)
            this.forceUpdate();

        return field.error;
    }

    validate() {
        var isValid = true;

        this.state.formGroups.forEach(fg => {
            if (fg.visible) {
                fg.fields.forEach(field => {
                    if (this.validateField(field))
                        isValid = false;
                });
            }
        });

        if (!isValid) // rerender to show errors
            this.forceUpdate();
        return isValid;
    }

    submit(e) {
        e.preventDefault();
        if (this.validate()) {
            var form = {};
            this.state.formGroups.forEach((fg) => {
                if (!this.state.isCompany && fg.name === "juridicalData") {
                    return;
                }
                form[fg.name] = {};

                fg.fields.forEach(({ name, value }) => {
                    form[fg.name][name] = value;
                });
            });
            this.context.sendOrder(form);
        }
        else {
            this.context.notifications.error("Форма не заполнена!");
        }
    }

    setIsCompany(isCompany) {
        this.state.formGroups.forEach(fg => {
            if (fg.name === 'juridicalData')
                fg.visible = isCompany;
        });

        this.setState({ isCompany });
        this.context.setIsCompany(isCompany);
    }

    renderForm() {
        return (<>{
            this.state.formGroups.map((formGroup, i) =>
                formGroup.visible
                ? <div className="row" key={i}>
                    <div className="col-12">
                        <h4>{formGroup.title}</h4>
                    </div>
                    {formGroup.fields.map((field, j) =>
                        <div className="col-sm-4" key={j}>
                            <input className={'cool-input ' + (field.error ? 'invalid' : '')}
                                    placeholder={field.placeholder}
                                    type="text"
                                    name={field.name}
                                    value={field.value || ""}
                                    onChange={(e) => this.handleChange(e, field)}
                                    onBlur={() => this.validateField(field, true)}/>
                            <span className="error">{field.error}</span>
                        </div>
                    )}
                </div> : ""
            )
        }</>);
    }

    renderCompanySwitcher () {
        return (
            <div className="row">
                <div className="col-12">
                    <div className="cool-radio">
                        <input
                            checked={!this.state.isCompany}
                            onChange={() => this.setIsCompany(false)}
                            type="radio" name="comp-individual"
                            id="individual" value="individual" />
                        <label htmlFor="individual" className="radio"></label>
                        <label htmlFor="individual" className="caption">Физическое лицо</label>
                    </div>
                    <div className="cool-radio">
                        <input
                            checked={this.state.isCompany}
                            onChange={() => this.setIsCompany(true)}
                            type="radio" name="comp-individual"
                            id="company" value="company" />
                        <label htmlFor="company" className="radio"></label>
                        <label htmlFor="company" className="caption">Компания</label>
                    </div>
                </div>
            </div>
        );
    }

    renderFormHeader () {
        let isDxfMode = this.context.orderMode === "drawing";
        return (
            <div className="row form-header">
                <div className="col-12">
                    <h2>Оформление заказа</h2>
                </div>
                <div className="col-lg-7">
                    {isDxfMode ? 
                        <>
                            <h4>Количество деталей: <span>{this.context.getItemsCount()}</span></h4>
                            <h4>Итоговая стоимость: <span>{this.context.getTotalCost()} P</span></h4>
                        </> :
                        <h4>
                            Отлично! <br/>
                            Мы оценим стоимость Ваших деталей <br/>
                            и пришлём ответ в течение 2-х дней. <br/>
                            Чтобы мы могли сообщить вам стоимость, <br/> оставьте, пожалуйста, немного информации о себе:
                        </h4>
                    }
                </div>
                <div className="col-lg-5">
                    <img src="/img/logo.svg" alt="sevencut logo"/>
                </div>
            </div>
        );
    }

    render() {
        let isDxfMode = this.context.orderMode === "drawing";
        return (
            <form className="contact-form container stick">
                {this.renderFormHeader()}
                {isDxfMode ? this.renderCompanySwitcher() : ""}
                {this.renderForm()}
                <div className="row">
                     <div className="col-12 text-center">
                        <button className={"submit " + (this.context.isOrderSending ? 'loading' : '')}
                            disabled={this.context.isOrderSending}
                            onClick={(e) => this.submit(e)}>
                            Оформить заказ
                        </button>
                    </div>
                </div>
            </form>
        );
    }
}

UserFormPage.contextType = AppContext;
