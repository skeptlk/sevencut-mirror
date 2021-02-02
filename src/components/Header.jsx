import React, { useState } from 'react';
import { HashLink } from 'react-router-hash-link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faTimes, faPhoneAlt } from '@fortawesome/free-solid-svg-icons';
import '../styles/Header.scss';


export default function Header(props) {
    const [isMenuOpened, setIsMenuOpened] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpened(!isMenuOpened);
    }

    return (
        <header className={ 'header ' + (isMenuOpened ? 'open' : '')}>
            <div>
                <HashLink to='/'><img src="/img/logo.svg" className="logo" alt="logotype"/></HashLink>
            </div>
            <ul className="top-nav" onClick={toggleMenu}>
                <HashLink to="/#process" className="top-nav-item">Процесс работы</HashLink>
                <HashLink to="/#faq" className="top-nav-item">Вопросы и ответы</HashLink>
                <HashLink to="/#contact" className="top-nav-item">Контакты</HashLink>
            </ul>
            <button className="responsive" onClick={props.onOpenModalClick}>
                <FontAwesomeIcon icon={faPhoneAlt}/>
                <span>Связаться</span>
            </button>
            <div className="menu-bar" onClick={toggleMenu}>
                <FontAwesomeIcon icon={isMenuOpened ? faTimes : faBars}/>
            </div>
        </header>
    );
}
