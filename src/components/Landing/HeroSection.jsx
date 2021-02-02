import React from 'react';
import { Link } from 'react-router-dom';

export default function HeroSection() {
    return (
        <section className="hero">
            <div className="inner">
                <div className="container">
                    <div className="row">
                        <div className="col-12">
                            <h1>7CUT</h1>
                            <p className="subheader-large">
                                Производство, доступное каждому
                            </p>
                            <p className="subheader">
                                Быстрый и качественный раскрой листовых материалов по вашим чертежам. <br/>
                                Больше никаких заказов обратных звонков и долгих переписок по e-mail. <br/>
                                Мы производим расчёт стоимости прямо здесь и сейчас. <br/>
                            </p>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-4 hero-card">
                            <img src="/img/icon-1.svg" alt="" />
                            <div className="hero-card-text">Ваш чертёж</div>
                        </div>
                        <div className="col-4 hero-card">
                            <img src="/img/icon-2.svg" alt="" />
                            <div className="hero-card-text">В любое время 24/7</div>
                        </div>
                        <div className="col-4 hero-card">
                            <img src="/img/icon-3.svg" alt="" />
                            <div className="hero-card-text">Всего за 60 секунд</div>
                        </div>
                    </div>
                    <div className="row">
                        <button className="get-cost linked">
                            <Link to='/order'>Рассчитать стоимость</Link>
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
}
