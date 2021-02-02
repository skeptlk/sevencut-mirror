import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import history from '../../history';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleLeft, faPhoneAlt } from '@fortawesome/free-solid-svg-icons';
import ContactModal from '../common/ContactModal';

export default function OrderHeader() {
    const [isModalOpened, setModalState] = useState(false);

    return (
        <header className="order-header">
            <div className="container">
                <div className="row">
                    <div className="col-12">
                        <button className="return float-left sm responsive"
                            onClick={() => history.push("/")}>
                            <FontAwesomeIcon icon={faAngleLeft} />
                            <span>Вернуться</span>
                        </button>

                        <Link to='/'>
                            <img src="/img/logo.svg" className="logo" alt="logotype"/>
                        </Link>

                        <button className="float-right sm responsive" onClick={() => setModalState(true)}>
                            <FontAwesomeIcon icon={faPhoneAlt} />
                            <span>Связаться</span>
                        </button>
                    </div>
                </div>
            </div>
            { isModalOpened ? <ContactModal onClose={() => setModalState(false)} /> : ""}
        </header>
    );
}
