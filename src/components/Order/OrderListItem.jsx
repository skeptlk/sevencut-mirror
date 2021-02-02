import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes, faSearch } from '@fortawesome/free-solid-svg-icons';
import CoolSelect from '@components/common/CoolSelect';
import CoolNumeric from '@components/common/CoolNumeric';


export default function OrderListItem(props) {
    const {item, index, thicknessOptions, isDxfMode, validating} = props;
    const {onChange, onDelete, onDrawingOpen} = props;

    const handleInputChange = (event) => {
        const { name, value } = event.target;

        if (name === 'type')
            item.material = item.thickness = '';
        else if (name === 'material')
            item.thickness = '';

        item[name] = value;
        onChange();
    }

    const handleCheckboxChange = (e) => {
        item.isChecked = e.target.checked;
        onChange();
    }

    function getProcessTypes () {
        let types = [];
        for (const type in thicknessOptions)
            if (thicknessOptions.hasOwnProperty(type))
                types.push({ name: type, label: type });
        return types;
    }

    function getMaterials (type) {
        let materials = [];
        let typeObj = thicknessOptions[type];
        for (const material in typeObj)
            if (typeObj.hasOwnProperty(material))
                materials.push({ name: material, label: material });
        return materials;
    }

    function getThickness (type, material) {
        if (!type || !material)
            return [];
        return thicknessOptions[type][material]
            .map(th => ({ name: th, label: th }));
    }

    const types = getProcessTypes();
    const materials = getMaterials(item.type);
    const thickness = getThickness(item.type, item.material);

    return (
    <li className="list-group-item outline">
        <div className="list-item-header">
            <div className="cool-check include-in-order">
                <input checked={item.isChecked}
                    onChange={handleCheckboxChange}
                    id={'check' + index} type="checkbox" />
                <label htmlFor={'check' + index} className="box"></label>
                <label htmlFor={'check' + index} className="caption">Добавить в заказ</label>
            </div>
            <div className="item-name">{item.file.name}</div>
            <div className="delete">
                <FontAwesomeIcon icon={faTimes} className="delete-item"
                    onClick={onDelete} />
            </div>
        </div>
        <div className="list-item-body">
            {   isDxfMode ?
                <div className="list-item-sidebar" onClick={onDrawingOpen}>
                    <div className={"thumbnail " + (item.isLoading ? "loading" : "")}>
                        <img src={"data:image/png;base64, " + item.thumbnail} alt="" />
                    </div>
                    <button><FontAwesomeIcon icon={faSearch} /></button>
                </div> : ''
            }
            <div className="list-item-form">
                <div className="list-item-options row">
                    <CoolSelect value={item.type}
                        options={types}
                        onChange={handleInputChange}
                        invalid={validating && !item.type}
                        name="type" placeholder="Метод" className="col-6 col-md-3" />
                    <CoolSelect value={item.material}
                        options={materials}
                        onChange={handleInputChange}
                        invalid={validating && !item.material}
                        name="material" placeholder="Материал" className="col-6 col-md-3" />
                    <CoolSelect value={item.thickness}
                        options={thickness}
                        onChange={handleInputChange}
                        invalid={validating && !item.thickness}
                        name="thickness" placeholder="Толщина" className="col-6 col-md-3" />
                    <CoolNumeric value={item.quantity}
                        onChange={handleInputChange}
                        invalid={validating && item.quantity < 1}
                        name="quantity" className="col-6 col-md-3" />
                </div>
                <div className="row notes">
                    <div className="col-12">
                        <textarea value={item.description}
                            onChange={handleInputChange}
                            placeholder={isDxfMode ? 'Примечание' : 'Описание детали'}
                            className="cool-textarea" rows="5"
                            name="description">
                        </textarea>
                    </div>
                </div>
            </div>
        </div>
        { isDxfMode ? <>
            <div className="open-canvas-mobile"
                onClick={onDrawingOpen}>
                <FontAwesomeIcon icon={faSearch} />
                Предпросмотр
            </div>
            <div className={'list-item-footer ' + (item.isTooLarge() ? 'error' : '')}>{ 
                item.isTooLarge() ?
                "Размер детали слишком велик для этого типа материала!" :
                "Цена:" + (item.isFilled() ? `${item.cost()} ₽` : "[Выберите опции]")
            }</div>
        </> : ""}
    </li>
    )
}
