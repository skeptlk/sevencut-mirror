import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import Header from '@components/Header';
import Footer from '@components/Footer';
import '@styles/NotFound.scss';

export default function NotFoundPage() {
    useEffect(() => {
        document.title = "404 - Страница не найдена";
    }, []);
    return (<>
        <Header />
        <div className="container stick notfound">
            <h2>Страница не найдена</h2>
            <button className="linked">
                <Link to='/'>На главную</Link>
            </button>
        </div>
        <Footer />
    </>);
}
