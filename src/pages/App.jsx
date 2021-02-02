import React from 'react'
import history from '../history';
import { Router, Route, Switch } from 'react-router-dom';
import { AppContext } from '../AppContext';
import NotificationService from '@components/NotificationService';
import NotFoundPage from '@pages/NotFoundPage';
import LandingPage from '@pages/LandingPage';
import OrderPage from '@pages/OrderPage';
import '@styles/App.scss';

class App extends React.Component {

    render() {
        return (
            <AppContext.Consumer>{() => <>
                <Router history={history}>
                    <Switch>
                        <Route exact path="/">
                            <LandingPage />
                            <NotificationService />
                        </Route>
                        <Route path="/order">
                            <OrderPage />
                            <NotificationService />
                        </Route>
                        <Route>
                            <NotFoundPage />
                        </Route>
                    </Switch>
                </Router>
            </>}</AppContext.Consumer>
        );
    }
}

export default App;
