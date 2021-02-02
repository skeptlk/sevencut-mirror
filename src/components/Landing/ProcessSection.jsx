import React from 'react';
import { Link } from 'react-router-dom';
import SliderSection from './SliderSection';
import VideoSection from './VideoSection';

export default function ProcessSection() {
    return (
        <section className="process" id="process">
            <div className="container">
                <div className="row">
                    <div className="col-12">
                        <h2>Как это работает:</h2>
                    </div>
                    <div className="col-sm-4 proc-card">
                        <img src="/img/icon-1.svg" alt="" />
                        <h4 className="proc-subheader">Загрузка чертежей</h4>
                    </div>
                    <div className="col-sm-4 proc-card">
                        <img src="/img/icon-2.svg" alt="" />
                        <h4 className="proc-subheader">Автоматический расчёт</h4>
                    </div>
                    <div className="col-sm-4 proc-card">
                        <img src="/img/icon-3.svg" alt="" />
                        <h4 className="proc-subheader">Оплата и доставка</h4>
                    </div>
                </div>
                <div className="row">
                    <div className="col-12 text-center">
                        <button className="get-cost linked">
                            <Link to='/order'>Рассчитать стоимость</Link>
                        </button>
                    </div>
                </div>
                <SliderSection />
                <VideoSection />
            </div>
        </section>
    );
}
