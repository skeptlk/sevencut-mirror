import React, { useEffect } from 'react'


export default function OrderStartPage(props) {
    useEffect(() => {
        document.title = "Выберите тип заказа";
    }, []);
    return (
        <div className="container stick">
            <h2>Заказ деталей</h2>
            <div className="row choose-file">
                <div onClick={() => props.onNavigateUploadPage('drawing')} className="col-md-6 order-file-option primary">
                    <div className="inner outline">
                        <div className="body">
                            <div className="img"><img src="/img/part_white.svg" alt="Деталь" /></div>
                            <div className="content">
                                <h4>У меня есть .dxf файл</h4>
                                <p>Загрузите ваш файл в формате .dxf, и мы сможем быстро рассчитать стоимость работ по изготовлению данной детали.</p>
                            </div>
                        </div>
                        <div className="foot">Цена за 60 секунд</div>
                    </div>
                </div>
                <div onClick={() => props.onNavigateUploadPage('any')} className="col-md-6 order-file-option">
                    <div className="inner outline">
                        <div className="body">
                            <div className="img"><img src="/img/part.svg" alt="Деталь" /></div>
                            <div className="content">
                                <h4>У меня нет .dxf файлов</h4>
                                <p>Загрузите ваш файл в любом формате, и мы сможем по имеющимся данным произвести чертёж и рассчитать стоимость работ по изготовлению данной детали.</p>
                            </div>
                        </div>
                        <div className="foot">Цена в течение 2-х дней</div>
                    </div>
                </div>
            </div>
        </div>
    );
}
