import React from 'react';

export default function OrderFooter({ quantity, cost, mode, onSubmit }) {
    return (
        <div className={"order-footer mode-" + mode}>
            <div className="inner">
                <div className="info">
                    <div>Количество деталей: {quantity}</div>
                    <div>Стоимость: {cost} ₽</div>
                </div>
                <button onClick={onSubmit} className="get-cost">Оформить заказ</button>
            </div>
        </div>
    );
}
