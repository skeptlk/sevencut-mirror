import React, { useContext } from 'react';
import { AppContext } from '../../AppContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import OrderListItem from './OrderListItem';

export default function OrderList(props) {
    const {
        restoreOrderItem,
        destroyOrderItem,
        thicknessOptions,
        orderMode
    } = useContext(AppContext);
    const isDxfMode = orderMode === "drawing";

    return (
        <ul className="order-list list-group">
            {props.items.map((item, index) =>
                (item.isDeleted ?
                    <li key={index} className="list-group-item outline">
                        <div className="deleted">
                            Файл удалён
                            <u onClick={() => restoreOrderItem(item.id)}>Отмена</u>
                            <div className="delete">
                                <FontAwesomeIcon icon={faTimes} className="delete-item"
                                    onClick={() => destroyOrderItem(item.id)} />
                            </div>
                        </div>
                    </li>
                    :
                    <OrderListItem
                        item={item} index={index} key={index}
                        isDxfMode={isDxfMode} 
                        validating={props.validating}
                        thicknessOptions={thicknessOptions}
                        onChange={() => props.onChange(index, item)}
                        onDelete={() => props.onDelete(item.id)}
                        onDrawingOpen={() => props.onDrawingOpen(index)}>
                    </OrderListItem>
                )
            )}
        </ul>
    );
}
