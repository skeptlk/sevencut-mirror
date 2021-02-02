import React, { useEffect, useRef, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCopy, faDownload } from '@fortawesome/free-solid-svg-icons';

export default function DragZone(props) {
    const [dragging, setDragging] = useState(false);
    var [dragCounter, setDragCounter] = useState(0);
    const fileInputRef = useRef(null);
    const fileSampleRef = useRef(null);

    const fileChange = (e) => {
        if (e.target.files && e.target.files.length > 0) {
            var files = Array.from(e.target.files);
            props.onSelected(files);
        }
    }

    const triggerSystemDialog = () => {
        fileInputRef.current.click();
    }

    // cannot place sample link directly in drag zone
    // so i'll just trigger click on hidden link here 
    const downloadSample = (e) => {
        e.stopPropagation();
        fileSampleRef.current.click();
    }

    const handleDragLeave = e => {
        e.stopPropagation();
        e.preventDefault();
        dragCounter--;
        setDragCounter(dragCounter);
        if (dragCounter > 0) {
            return;
        }
        setDragging(false);
    };

    const handleDragEnter = e => {
        const dt = e.dataTransfer;
        e.stopPropagation();
        e.preventDefault();
        dragCounter++;
        setDragCounter(dragCounter);
        if (dt.items && dt.items.length > 0 && dt.items[0].kind === 'file') {
            setDragging(true);
        }
    }

    const handleDragOver = e => {
        e.stopPropagation();
        e.preventDefault();
    }

    const handleDrop = e => {
        e.stopPropagation();
        e.preventDefault();
        if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
            setDragging(false);
            var files = Array.from(e.dataTransfer.files);
            props.onSelected(files);
        }
    }

    useEffect(() => {        
        window.addEventListener('dragenter', handleDragEnter);
        window.addEventListener('dragleave', handleDragLeave);
        window.addEventListener('dragover', handleDragOver);
        window.addEventListener('drop', handleDrop);

        return function cleanup() {
            window.removeEventListener('dragenter', handleDragEnter);
            window.removeEventListener('dragleave', handleDragLeave);
            window.removeEventListener('dragover', handleDragOver);
            window.removeEventListener('drop', handleDrop);
        }
    });

    const isDxfMode = props.mode === 'drawing';
    const title    = isDxfMode ? "Перетащите файл .dxf сюда, чтобы рассчитать его стоимость"
                                : "Перетащите файл сюда";
    const message1 = isDxfMode ? "Поддерживаются только чертежи формата .dxf"
                                : "Для загрузки допускаются файлы изображений и чертежей (.dxf, .dwg, .svg, .autocad, .pdf, .jpg, .png и т.д.)";
    const message2 = isDxfMode ? "Максимальный размер файлов - не более 20 Мб"
                                : "Размер каждого файла не более 20 Мб, за один раз можно загрузить не более 10 файлов";
    const accept  = props.mode === "any" ? "*" : ".dxf";
    
    return (<>
        <div className='drag-zone row d-none d-sm-block' onClick={triggerSystemDialog}>
            <div className="col-md-10 offset-md-1 inner">
                <h4>{ title }</h4>
                <button>или нажмите сюда, чтобы загрузить файл</button>
                <p className="message">{message1}<br/>{message2}</p>
                <span className="sample" onClick={downloadSample}>
                    <FontAwesomeIcon icon={faDownload}/> 
                    Скачать образец чертежа
                </span>
            </div>
        </div>
        <div className="d-sm-none mobile-upload-block">
            <button onClick={triggerSystemDialog}>Загрузить файл</button>
        </div>
        <input type="file" multiple
            className="hidden-input"
            accept={accept}
            ref={fileInputRef}
            onChange={fileChange} />
        <a className="hidden-sample-link" 
            href="/examples/example.dxf"
            ref={fileSampleRef}
            download>
            Пример файла
        </a>
        <div className={(dragging ? 'active' : '') + ' drag-zone-fullscreen'}>
            <div className="icon"><FontAwesomeIcon icon={faCopy}/></div>
            <div className="text">Отпустите файлы, чтобы прикрепить их к заказу</div>
        </div>
    </>);
}
