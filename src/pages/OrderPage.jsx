import React, { Component } from 'react';
import { Route, Switch, Redirect, withRouter } from 'react-router-dom';
import { AppContext } from '../AppContext';
import history from '../history';
import OrderStartPage from '@pages/OrderStartPage';
import UserFormPage from '@pages/UserFormPage';
import UploadPage from '@pages/UploadPage';
import ThanksPage from '@pages/ThanksPage';
import PaymentPage from './PaymentPage';
import OrderHeader from '@components/Order/OrderHeader';
import Footer from '@components/Footer';
import '@styles/Order.scss';


class Order extends Component {

    render() {
        const showFooter = !(history.location.pathname.includes("upload"));
        const match = this.props.match;
        return (<>
            <OrderHeader />
            <Switch>
                <Route path={`${match.url}/form`}>
                    <UserFormPage />
                </Route>
                <Route path={`${match.url}/upload/any`}>
                    <UploadPage type="any" />
                </Route>
                <Route path={`${match.url}/upload/drawing`}>
                    <UploadPage type="drawing" />
                </Route>
                <Route path={`${match.url}/payment`}>
                    <PaymentPage/>
                </Route>
                <Route path={`${match.url}/thanks`}>
                    <ThanksPage />
                </Route>
                <Route exact path={match.url}>
                    <OrderStartPage onNavigateUploadPage={this.goToUpload.bind(this)}/>
                </Route>
                <Route>
                    <Redirect to="/" />
                </Route>
            </Switch>
            {showFooter ? <Footer /> : ''}
        </>);
    }

    static contextType = AppContext;
    constructor(props, context) {
        super(props, context);
        // handle cases when user loaded specific pages directly
        if (history.location.pathname.includes("any"))
            this.context.setOrderMode("any");
        else if (history.location.pathname.includes("drawing"))
            this.context.setOrderMode("drawing");
    }

    goToUpload(mode) {
        this.context.setOrderMode(mode);
        history.push("/order/upload/" + mode);
    }

}

export default withRouter(Order);
