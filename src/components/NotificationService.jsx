import React, { Component } from 'react';
import { AppContext } from '../AppContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { Spring } from 'react-spring/renderprops';
import '../styles/Notification.scss';

export default class NotificationService extends Component {
    constructor() {
        super();
        this.nextID = 0;
        this.state = {
            items: []
        };
    }

    render() {
        return (
            <div className="notifications">
                { this.state.items.map((msg, i) => 
                    <Spring from={{ opacity: 0 }} to={{ opacity: 1 }} key={i}>
                        { props => 
                            <div style={props} key={i} className={"msg " + msg.type}>
                                <i onClick={() => this.dismiss(msg.id)}><FontAwesomeIcon icon={faTimes} /></i>
                                {msg.text}
                            </div>
                        }
                    </Spring>
                )}
            </div>
        );
    }

    componentDidMount() {
        this.context.registerNotificationService(this);
    }

    add(text, type) {
        const id = ++this.nextID;
        const timer = setTimeout(() => this.dismiss(id), 6000);
        this.state.items.push({ id, text, type, timer });
        this.setState({ items: this.state.items });
    }

    info = (msg) => {
        this.add(msg, 'info');
    }

    warn = (msg) => {
        this.add(msg, 'warn');
    }

    error = (msg) => {
        this.add(msg, 'error');
    }

    dismiss (id) {
        this.setState({ items: this.state.items.filter(item => item.id !== id) });
    }
}

NotificationService.contextType = AppContext;
