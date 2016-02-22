import React, { Component } from 'react';
import { Link } from 'react-router';
import { logout } from '../actions/AppActions';
import { getUserProfile, setUserProfile, clearErrors } from '../actions/AppActions';
import LoadingButton from './LoadingButton.react';
import ReadOnlyCollection from './ReadOnlyCollection.react';
import InlineEdit from 'react-edit-inline';


export default class Profile extends Component {

    constructor(props) {
        super(props)
        this.state = { showConfirm: false };
    }

    componentDidMount() {
        var info = this.props.username;
        console.log(info);
        console.log(this.props.loginDetails);
        console.log(this.props.profile);
        this._getUserDetails(this.props.loginDetails.username)
    }

    _getUserDetails(username, token) {
        this.props.dispatch(getUserProfile(username));
    }

    customValidateText(text) {
        return (text.length > 0 && text.length < 64);
    }

    dataChanged = (data) => {
        this.props.dispatch(setUserProfile(this.props.loginDetails.username, data))
    };

    confirmMail = (event) => {
        this.props.dispatch(setUserProfile(this.props.loginDetails.username, this.state.data));
        this.setState({showConfirm: false});
    };

    emailChanged = (data) => {
        this.setState({
            showConfirm: true,
            data: data
        });
    };

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
                                validate={this.customValidateText}
                                change={this.dataChanged}
                        />
                        </p>
                        <p>
                            error: {this.props.errors.first_name}
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
                        <p>
                            error: {this.props.errors.last_name}
                        </p>
                    </li>
                    <li>
                        <p>
                            Email: <InlineEdit
                            activeClassName="editing"
                            text={this.props.profile.email}
                            paramName="email"
                            change={this.emailChanged} />
                        </p>
                        {this.state.showConfirm ?
                            <button onClick={this.confirmMail}>Confirm</button> :
                            null
                        }
                        <p>
                            error: {this.props.errors.email}
                        </p>
                    </li>
                    <li>
                        <p>
                            Group Path: <Link to="/groups" >Groups</Link>
                        </p>
                    </li>
                    <li>
                        <p>
                            Credentials: {this.props.profile.credentials.length ? null : 'None'}
                        </p>
                        <ReadOnlyCollection collection={this.props.profile.credentials} />
                    </li>
                    <li>
                        <p>
                            All Permissions: {this.props.profile.permissions.length ? null : 'None'}
                        </p>
                        <ReadOnlyCollection collection={this.props.profile.permissions} />
                    </li>

                </ul>

            </section>
        );
    }
}