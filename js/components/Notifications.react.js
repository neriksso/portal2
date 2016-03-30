import React, { Component } from 'react';
import { getNotifications } from '../actions/AppActions';


export default class Notifications extends Component {

    constructor(props) {
        super(props)
    }

    componentDidMount() {
        this._getNotifications();
    }

    _getNotifications() {
        this.props.dispatch(getNotifications());
    }

    render() {
        const { notifications, notifications_errors } = this.props;
        return (
            <section className="text-section">
                <h2>Notifications</h2>
                <table className="notifications-table">
                    <tr><th>Message</th><th>Link</th></tr>
                    {notifications.map(function(notification) {
                        return <tr><td>{notification.message}</td><td>{notification.link}</td></tr>;
                    })}
                </table>

            </section>
        );
    }
}