import React, { Component } from 'react';
import { Link } from 'react-router';
import { logout } from '../actions/AppActions';
import { getUserProfile, setUserProfile } from '../actions/AppActions';
import LoadingButton from './LoadingButton.react';
import ReadOnlyCollection from './ReadOnlyCollection.react';
import InlineEdit from 'react-edit-inline';


export default class Profile extends Component {

    componentDidMount() {
        var info = this.props.username;
        console.log(info);
        console.log(this.props.loginDetails);
        console.log(this.props.profile);
        this._getUserDetails(this.props.loginDetails.username, this.props.loginDetails.token)
    }

    _getUserDetails(username, token) {
        this.props.dispatch(getUserProfile(username, token));
    }

    customValidateText(text) {
        return (text.length > 0 && text.length < 64);
    }

    dataChanged = (data) => {
        // data = { description: "New validated text comes here" }
        // Update your model from here
        //console.log(data);
        this.props.dispatch(setUserProfile(this.props.loginDetails.username, this.props.loginDetails.token, data))
    }

    render() {
        return (
            <section className="text-section">
                <h2>User Profile</h2>
                <ul>
                    <li>
                        <p>
                            Username: {this.props.profile.username}
                        </p>
                    </li>
                    <li>
                        <p>
                            First Name: <InlineEdit
                                activeClassName="editing"
                                text={this.props.profile.first_name}
                                paramName="first_name"
                                change={this.dataChanged} />
                        </p>
                    </li>
                    <li>
                        <p>
                            Last Name: <InlineEdit
                            activeClassName="editing"
                            text={this.props.profile.last_name}
                            paramName="last_name"
                            change={this.dataChanged} />
                        </p>
                    </li>
                    <li>
                        <p>
                            Email: <InlineEdit
                            activeClassName="editing"
                            text={this.props.profile.email}
                            paramName="email"
                            change={this.dataChanged} />
                        </p>
                    </li>
                    <li>
                        <p>
                            Groups: {this.props.profile.groups.length ? null : 'None'}
                        </p>
                        <ReadOnlyCollection collection={this.props.profile.groups} />
                    </li>
                    <li>
                        <p>
                            Credentials: {this.props.profile.credentials.length ? null : 'None'}
                        </p>
                        <ReadOnlyCollection collection={this.props.profile.credentials} />
                    </li>
                    <li>
                        <p>
                            Permissions: {this.props.profile.permissions.length ? null : 'None'}
                        </p>
                        <ReadOnlyCollection collection={this.props.profile.permissions} />
                    </li>

                </ul>

            </section>
        );
    }
}