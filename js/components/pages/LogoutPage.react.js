/*
 * LoginPage
 *
 * Users login on this page
 * Route: /login
 *
 */

import React, { Component} from 'react';
import { connect } from 'react-redux';
import Form from '../Form.react';
import auth from '../../utils/auth';
import { logout } from '../../actions/AppActions';
import LoadingIndicator from '../LoadingIndicator.react';

export default class LogoutPage extends Component {
    render() {
        const dispatch = this.props.dispatch;
        const { formState, currentlySending } = this.props.data;
        return (
            <div className="form-page__wrapper">
                <div className="form-page__form-wrapper">
                    <div className="form-page__form-header">
                        <h2 className="form-page__form-heading">You have logged out.</h2>
                    </div>
                </div>
            </div>
        );
    }

    componentDidMount() {
        this.props.dispatch(logout());
    }

    _login(username, password) {
        this.props.dispatch(login(username, password));
    }
}

// Which props do we want to inject, given the global state?
function select(state) {
    return {
        data: state
    };
}

// Wrap the component to inject dispatch and state into it
export default connect(select)(LogoutPage);
