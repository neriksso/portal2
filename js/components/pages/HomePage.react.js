/*
 * HomePage
 *
 * This is the first thing users see of the app
 * Route: /
 *
 */

import React, { Component } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import {getProjects} from '../../actions/AppActions';
import Projects from '../Projects.react.js';
import Notifications from '../Notifications.react.js';

class HomePage extends Component {
    render() {
        const dispatch = this.props.dispatch;
        const { loggedIn, projects, trafficlights, projects_errors, statuses, statuses_errors, notifications, notifications_errors } = this.props.data;
        return (
            <article>
                <div>
                    <section className="text-section">
                        {/* Change the copy based on the authentication status */}
                        {loggedIn ? (
                            <h1>You have logged in, the cake was a lie.</h1>
                        ) : (
                            <h1>Welcome, please login to the portal, there is cake.</h1>
                        )}
                        <Notifications on_click={ this.handler } dispatch={ dispatch } notifications={ notifications } notifications_errors={ notifications_errors } />
                        <button className="btn btn-default" onClick={::this._click}>Get Projects</button>
                        <Projects dispatch={ dispatch } projects={ projects } errors={ projects_errors } trafficlights={trafficlights} statuses={statuses} statuses_errors={statuses_errors} />
                    </section>
                </div>
            </article>
        );
    }

    _click() {
        this.props.dispatch(getProjects());
    }

    handler = (notification, e) => {
        console.log(notification);
    }
}

// Which props do we want to inject, given the global state?
function select(state) {
    return {
        data: state
    };
}

// Wrap the component to inject dispatch and state into it
export default connect(select)(HomePage);
