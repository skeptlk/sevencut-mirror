import React, { useContext, useEffect } from 'react';
import { AppContext } from '../AppContext';
import history from '../history';

export default function UploadPage() {
    let context = useContext(AppContext);
    let id = context.orderID;
    if (!id) {
        history.push("/order");
    }
    const isDxfMode = (context.orderMode === "drawing");
    const isCompany = (context.isCompany);
    const msg = (isDxfMode) ? "Скоро наши специалисты свяжутся с Вами." : "Скоро наши специалисты посчитают стоимость заказа и свяжутся с Вами.";

    useEffect(() => {
        document.title = "Спасибо за заказ!";
    }, []);


    return (
        <div className="container stick thanks-page">
            <div className="row">
                <div className="col-12">
                    <h2>Спасибо за заказ!</h2>
                </div>
            </div>
            <div className="row">
                <div className="col-7">
                    <h4>Всё получилось!</h4>
                    <h4>{msg}</h4>
                    <h4>Номер заказа - {id}</h4>
                    { (isCompany) ?
                        <button className="linked">
                            <a href={'https://7cut.ru/api/pdf/' + id} target="_blank" rel="noopener noreferrer">
                                Скачать счёт в формате pdf
                            </a>
                        </button>
                        : ""
                    }
                </div>
                <div className="col-5">
                    <img src="/img/logo.svg" alt="sevencut logo"/>
                </div>
            </div>
        </div>
    );

}