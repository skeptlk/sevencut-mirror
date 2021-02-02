import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { faYoutube, faVk, faInstagram } from '@fortawesome/free-brands-svg-icons';


export default function ContactModal(props) {
    return (
        <div className="overlay" onClick={props.onClose}>
            <div className="modal contact-modal" onClick={(e) => e.stopPropagation()}>
                <div className="head">
                    <FontAwesomeIcon icon={faTimes} onClick={props.onClose} />
                    <h4>Связаться с нами</h4>
                </div>
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
                <br/>
                Телефон: 8-930-725-98-18<br />
            </div>
        </div>
    );
}
