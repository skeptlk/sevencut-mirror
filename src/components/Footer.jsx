import React from 'react'; 
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faMapMarkerAlt, faPhoneAlt } from '@fortawesome/free-solid-svg-icons';
import { faYoutube, faVk, faInstagram } from '@fortawesome/free-brands-svg-icons';
import '../styles/Footer.scss'

export default function Footer() {
    return (
        <footer className="footer">
            <div className="container">
                <div className="row">
                    <div className="col-sm">
                        <Link to={'/'}>
                            <img src="/img/logo.svg" className="logo" alt="sevencut logotype"/>
                        </Link>
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
                    </div>
                    <div className="col-sm">
                        <div className="footer-link">ООО «БИК»</div>
                        <div className="footer-link">ИНН: 3250506243</div>
                        <div className="footer-link">КПП: 325701001</div>
                        <div className="footer-link">ОГРН: 1083254007760</div>
                        <div className="footer-link">
                            Директор Бахрах Евгений Ильич <br/>
                            Действует на основании Устава
                        </div>
                    </div>
                    <div className="col-sm">
                        <div className="footer-link">Расчетный счет №40702810400500000517</div>
                        <div className="footer-link">Кор/счет №30101810300000000600</div>
                        <div className="footer-link">БИК 044525600</div>
                        <div className="footer-link">ПАО «МИнБанк»</div>
                    </div>
                    <div className="col-sm">
                        <div className="footer-link">
                            <FontAwesomeIcon icon={faEnvelope} />
                            <a className="mail" href="mailto:manager@7cut.ru">manager@7cut.ru</a>
                        </div>
                        <div className="footer-link">
                            <FontAwesomeIcon icon={faPhoneAlt} />
                            8-930-725-98-18 <br/>
                            Бухгалтерия: 8-980-312-23-05
                        </div>
                        <div className="footer-link">
                            <FontAwesomeIcon icon={faMapMarkerAlt} />
                            Юридический адрес: 241050 <br/>
                            Брянская обл., г. Брянск <br/>
                            ул. Грибоедова, д.7 кв.10 
                        </div>
                        <div className="footer-link">
                            <FontAwesomeIcon icon={faMapMarkerAlt} />
                            Фактический адрес <br/>
                            Брянск, Кислородная 1
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}