/*
 * HomePage
 *
 * The Dashboard is only visible to logged in users
 * Route: /dashboard
 *
 */

import React, { Component } from 'react';
import { connect } from 'react-redux';

import Nav from '../Nav.react';
import GroupEdit from '../GroupEdit.react';
import GroupList from '../GroupList.react';

import {
    getUserProfile,
    getUserGroups,
    getAvailableUserGroups,
    setUserGroups,
    unsetUserGroups } from '../../actions/AppActions';
import ReadOnlyCollection from '../ReadOnlyCollection.react';


class Group extends Component {
    constructor(props) {
        super(props);
        this.state = {showConfirm: false};
    }

    componentDidMount() {
        if (!this.props.data.profile.username)
            this._getUserDetails(this.props.data.loginDetails.username);
        this._getGroupDetails(this.props.data.loginDetails.username);
    }

    _getUserDetails(username, token) {
        this.props.dispatch(getUserProfile(username));
    }

    _getGroupDetails(username) {
        this.props.dispatch(getUserGroups(username));
        this.props.dispatch(getAvailableUserGroups(username));
    }

    render() {
        const dispatch = this.props.dispatch;
        const { groups } = this.props.data;
        const { availableGroups } = this.props.data;
        const { username } = this.props.data.loginDetails;
        var permsArray = this.props.data.profile.permissions.filter((val) => {
            return val.toLowerCase() == 'auth.change_group'
        });
        if (permsArray.length > 0) {
            var GroupComp = GroupEdit;
        } else {
            var GroupComp = GroupList;
        }

        return (
            <article>
                <GroupComp caption="Groups"
                           groups={ groups }
                           checked={true}
                           dispatch={ dispatch }
                           username={ username }
                           changeEvent={unsetUserGroups}/>
                <GroupComp caption="Available Groups"
                           groups={ availableGroups }
                           checked={false}
                           dispatch={ dispatch }
                           username={ username }
                           changeEvent={setUserGroups}/>
            </article>
        );
    }
}

// Which props do we want to inject, given the global state?
function select(state) {
    return {
        data: state
    };
}

// Wrap the component to inject dispatch and state into it
export default connect(select)(Group);
