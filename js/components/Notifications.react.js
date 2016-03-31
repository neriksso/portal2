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
        const { notifications, notifications_errors, on_click } = this.props;
        return (
            <section className="text-section notifications-widget">
                <div className="header-row"><h4 className="pull-left">Notifications</h4></div>
                <table className="notifications-table">
                    <tr><th>Message</th><th>Link</th><th>Date Logged</th><th>Priority</th><th>Dismiss</th></tr>
                    {notifications.map(function(notification) {
                        return <tr key={notification.id}><td>{notification.message}</td><td>{notification.link}</td><td>{notification.date_logged}</td>
                            <td>{notification.priority}</td>
                            <td><input type="button" className="btn btn-default" onClick={on_click.bind(this, notification)} value="Dismiss"/></td></tr>;
                    })}
                </table>
            </section>
        );
    }
}