/*
 * Actions change things in your application
 * Since this boilerplate uses a uni-directional data flow, specifically redux,
 * we have these actions which are the only way your application interacts with
 * your appliction state. This guarantees that your state is up to date and nobody
 * messes it up weirdly somewhere.
 *
 * To add a new Action:
 * 1) Import your constant
 * 2) Add a function like this:
 *    export function yourAction(var) {
 *        return { type: YOUR_ACTION_CONSTANT, var: var }
 *    }
 * 3) (optional) Add an async function like this:
 *    export function asyncYourAction(var) {
 *        return function(dispatch) {
 *             // Do async stuff here
 *             return dispatch(yourAction(var));
 *        }
 *    }
 *
 *    If you add an async function, remove the export from the function
 *    created in the second step
 */

import { browserHistory } from 'react-router';

import { SET_AUTH,
    CHANGE_FORM,
    SENDING_REQUEST,
    GET_PROFILE,
    PATCH_PROFILE,
    ERROR_PROFILE,
    ERROR_PROP
} from '../constants/AppConstants';
import * as constants from '../constants/AppConstants';


import auth from '../utils/auth';
import genSalt from '../utils/salt';
import userService from '../utils/userService';
import Client from '../api/client';


export function login(username, password) {
    return function (dispatch) {
        loginUserFromAPI(username, password).then((response) => {
            localStorage.setItem('accessToken', response.data.token);
            localStorage.setItem('username', response.stats.params.body.username);

            dispatch(_doLogin(response));
            forwardTo('/');
        }, (err) => {
            requestFailed(err)
        });
    }
}

export function _doLogin(response) {
    return function (dispatch) {
        return [
            dispatch(getUserProfile(response.stats.params.body.username)),
            dispatch({
                    type: 'AUTH_USER_SUCCESS',
                    payload: response
                }
            )
        ];
    }
}

export function loginUserFromAPI(username, password) {
    return Client.User.login({
        'body': {
            username: username,
            password: password
        }
    }).then((result) => {
        return result;
    });
}

export function logout() {
    return {
        type: 'UNAUTH_USER',
        payload: {
            promise: logoutUser()
        }
    };
}

export function logoutUser() {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('username');
    forwardTo('/');
    return changeForm({
        username: "",
        password: ""
    });
}


/**
 * Registers a user
 * @param  {string} username The username of the new user
 * @param  {string} password The password of the new user
 */
export function register(username, password) {
    alert('IMPLEMETATIONError');
}

/**
 * Sets the authentication state of the application
 * @param {boolean} newState True means a user is logged in, false means no user is logged in
 */
export function setAuthState(newState) {
    return {type: SET_AUTH, newState};
}

/**
 * Sets the form state
 * @param  {object} newState          The new state of the form
 * @param  {string} newState.username The new text of the username input field of the form
 * @param  {string} newState.password The new text of the password input field of the form
 * @return {object}                   Formatted action for the reducer to handle
 */
export function changeForm(newState) {
    return {type: CHANGE_FORM, newState};
}

/**
 * Sets the requestSending state, which displays a loading indicator during requests
 * @param  {boolean} sending The new state the app should have
 * @return {object}          Formatted action for the reducer to handle
 */
export function sendingRequest(sending) {
    return {type: SENDING_REQUEST, sending};
}

export function clearErrorProp(newState) {
    return {type: ERROR_CLEAR, newState}
}

/**
 * Forwards the user
 * @param {string} location The route the user should be forwarded to
 */
function forwardTo(location) {
    console.log('forwardTo(' + location + ')');
    browserHistory.push(location);
}

let lastErrType = "";

/**
 * Called when a request failes
 * @param  {object} err An object containing information about the error
 * @param  {string} err.type The js-form__err + err.type class will be set on the form
 */
function requestFailed(err) {
    // Remove the class of the last error so there can only ever be one
    removeLastFormError();
    const form = document.querySelector('.form-page__form-wrapper');
    // And add the respective classes
    form.classList.add('js-form__err');
    form.classList.add('js-form__err-animation');
    form.classList.add('js-form__err--' + err.type);
    lastErrType = err.type;
    // Remove the animation class after the animation is finished, so it
    // can play again on the next error
    setTimeout(() => {
        form.classList.remove('js-form__err-animation');
    }, 150);
}

/**
 * Removes the last error from the form
 */
function removeLastFormError() {
    const form = document.querySelector('.form-page__form-wrapper');
    form.classList.remove('js-form__err--' + lastErrType);
}

export function clearErrors(errorName) {
    return (dispatch) => {
        console.log(data);
        dispatch(clearErrorProp(errorName));
    }
}

export function getUserProfile(username) {
    console.log(username);
    return {
        type: 'GET_USER_PROFILE',
        payload: {
            promise: getUserProfileFromAPI(username),
        }
    };
}

export function getUserProfileFromAPI(username) {
    return Client.User.getProfile({
        username: username,
        headers: {Authorization: 'JWT ' + localStorage.getItem('accessToken'), 'Content-Type': 'application/json'}
    }).then((result) => {
        return result;
    });
}

export function getUserGroups(username) {
    return {
        type: 'GET_USER_GROUPS',
        payload: {
            promise: getUserGroupsFromAPI(username),
        }
    };
}

export function getAvailableUserGroups(username) {
    return {
        type: 'GET_AVAILABLE_USER_GROUPS',
        payload: {
            promise: getAvailableUserGroupsFromAPI(username),
        }
    };
}

export function getAllGroups(username) {
    return function (dispatch) {
        return [
            dispatch(getUserGroups(username)),
            dispatch(getAvailableUserGroups(username))
        ];
    }
}

export function setUserGroups(username, groupNames) {
    return function (dispatch) {
        userGroupsFromAPI(Client.User.setGroups, username, groupNames).then((result) => {
            return dispatch(getAllGroups(username));
        }, (err) => {
            logger.error(err)
        });
    }
}

export function unsetUserGroups(username, groupNames) {
    return function (dispatch) {
        userGroupsFromAPI(Client.User.unsetGroups, username, groupNames).then((result) => {
            return dispatch(getAllGroups(username));
        }, (err) => {
            logger.error(err)
        });
    }
}

export function getUserGroupsFromAPI(username) {
    return Client.User.getGroups({
        username: username,
        headers: {Authorization: 'JWT ' + localStorage.getItem('accessToken'), 'Content-Type': 'application/json'}
    }).then((result) => {
        return result;
    });
}

export function getAvailableUserGroupsFromAPI(username) {
    return Client.User.getAvailableGroups({
        username: username,
        headers: {Authorization: 'JWT ' + localStorage.getItem('accessToken'), 'Content-Type': 'application/json'}
    }).then((result) => {
        return result;
    });
}

export function userGroupsFromAPI(method, username, groupNames) {
    return method({
        username: username,
        body: {
            group_names: groupNames
        },
        headers: {Authorization: 'JWT ' + localStorage.getItem('accessToken'), 'Content-Type': 'application/json'}
    }).then((result) => {
        console.log('return');
        return result;
    });
}

export function setUserProfile(username, data) {
    return {
        type: 'GET_USER_PROFILE',
        payload: {
            data: data,
            promise: setUserProfileFromAPI(username, data)
        }
    };
}

export function setUserProfileFromAPI(username, data) {
    return Client.User.patchProfile({
        username: username,
        body: data,
        headers: {Authorization: 'JWT ' + localStorage.getItem('accessToken'), 'Content-Type': 'application/json'}
    }).then((result) => {
        return result;
    });
}

export function getProjects() {
    return {
        type: 'GET_PROJECTS',
        payload: {
            promise: getProjectsFromAPI(),
        }
    };
}

export function getProjectsFromAPI() {
    return Client.Reports.getProjects({
        headers: {Authorization: 'JWT ' + localStorage.getItem('accessToken'), 'Content-Type': 'application/json'}
    }).then((result) => {
        return result;
    });
}

export function getStatuses() {
    return {
        type: 'GET_STATUSES',
        payload: {
            promise: getStatusesFromAPI(),
        }
    };
}

export function getStatusesFromAPI() {
    return Client.Reports.getStatuses({
        headers: {Authorization: 'JWT ' + localStorage.getItem('accessToken'), 'Content-Type': 'application/json'}
    }).then((result) => {
        return result;
    });
}

export function getTrafficLight(url) {
    return {
        type: 'GET_TRAFFICLIGHT',
        payload: {
            promise: getTrafficLightFromAPI(url),
        }
    };
}

export function getTrafficLightFromAPI(url) {
    return Client.Reports.getTrafficLightByUrl({
        headers: {Authorization: 'JWT ' + localStorage.getItem('accessToken'), 'Content-Type': 'application/json'},
        url: url
    }).then((result) => {
        return result;
    });
}

export function setTrafficLightUnit(unit, data) {
    return {
        type: 'GET_TRAFFICLIGHTUNIT',
        payload: {
            data: data,
            promise: setTrafficLightUnitFromAPI(unit, data)
        }
    };
}

export function setTrafficLightUnitFromAPI(unit, data) {
    return Client.Reports.patchTrafficLightUnit({
        trafficlightunit: unit,
        body: data,
        headers: {Authorization: 'JWT ' + localStorage.getItem('accessToken'), 'Content-Type': 'application/json'}
    }).then((result) => {
        return result;
    });
}

export function createTrafficLightUnit(data) {
    return {
        type: 'GET_TRAFFICLIGHTUNIT',
        payload: {
            data: data,
            promise: createTrafficLightUnitFromAPI(data)
        }
    };
}

export function createTrafficLightUnitFromAPI(data) {
    return Client.Reports.createTrafficLightUnit({
        body: data,
        headers: {Authorization: 'JWT ' + localStorage.getItem('accessToken'), 'Content-Type': 'application/json'}
    }).then((result) => {
        return result;
    });
}