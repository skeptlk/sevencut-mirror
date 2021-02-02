import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faYoutube, faVk, faInstagram } from '@fortawesome/free-brands-svg-icons';

export default function ContactsSection(props) {
    return (
        <section className="contact container" id="contact">
            <div className="row">
                <div className="col-12">
                    <h2>Контакты</h2>
                </div>
                <div className="col-md-6 col-lg-5">
                    <div className="caption">Адрес:</div>
                    <div className="value">г. Брянск, Кислородная 1</div>
                    <div className="caption">Телефон:</div>
                    <div className="value">8-930-725-98-18</div>
                    <div className="caption">Email:</div>
                    <div className="value">manager@7cut.ru</div>
                    <div className="caption">Часы работы:</div>
                    <div className="value">ежедневно с 8:00 до 22:00</div>
                    <div className="caption">Соцсети:</div>
                    <div className="social-i">
                        <a href="https://youtube.com" target="_blank" rel="noopener noreferrer">
                            <FontAwesomeIcon icon={faYoutube} />
                        </a>
                        <a href="https://vk.com" target="_blank" rel="noopener noreferrer">
                            <FontAwesomeIcon icon={faVk} />
                        </a>
                        <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
                            <FontAwesomeIcon icon={faInstagram} />
                        </a>
                    </div>
                    <button onClick={props.onOpenModalClick} className="get-cost">
                        Заказать обратный звонок
                    </button>
                </div>
                <div className="col-md-6 col-lg-7">
                    <iframe width="100%" height="530" frameBorder="0" title="map"
                        src="https://yandex.com/map-widget/v1/?um=constructor%3A3f315d6c301076ae14c3abfd9232413e2bf799624c8ba86be7d6c2344d7273bd" >
                    </iframe>
                </div>
            </div>
        </section>
    );
}