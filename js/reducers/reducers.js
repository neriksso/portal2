/*
 * The reducer takes care of our data
 * Using actions, we can change our application state
 * To add a new action, add it to the switch statement in the homeReducer function
 *
 * Example:
 * case YOUR_ACTION_CONSTANT:
 *   return assign({}, state, {
 *       stateVariable: action.var
 *   });
 */

import { CHANGE_FORM, SET_AUTH, SENDING_REQUEST, GET_PROFILE, PATCH_PROFILE, ERROR_PROFILE } from '../constants/AppConstants';
import * as constants from '../constants/AppConstants';
// Object.assign is not yet fully supported in all browsers, so we fallback to
// a polyfill
const assign = Object.assign || require('object.assign');
import { initialProfile } from '../constants/AppObjectConstants';
import auth from '../utils/auth';

// The initial application state
const initialState = {
    formState: {
        username: '',
        password: ''
    },
    currentlySending: false,
    loggedIn: auth.loggedIn(),
    loginDetails: auth.getToken(),
    profile: Object.assign({}, initialProfile),
    groups: [],
    availableGroups: [],
    profile_errors: {},
    topNavLinks: getTopNavLinks(auth.loggedIn()),
    sideNavLinks: getSideNavLinks(auth.loggedIn()),
    projects: [],
    projects_errors: {},
    trafficlights: {}
};

console.log(initialState);

function getTopNavLinks(loginState) {
    var linkList = [
        {
            link: '/support',
            title: 'Support'
        }
    ];

    if (loginState) {
        return [{
            link: '/logout',
            title: 'Logout'
        }].concat(linkList);
    } else {
        return [{
            link: '/login',
            title: 'Login'
        }].concat(linkList);
    }
}

function getSideNavLinks(loginState) {
    var linkList = [
        {
            link: '/profile',
            title: 'Profile'
        }
    ];

    return linkList
}


function dictifyMapperSmithError(err) {
    return err[0];
}

function flattenGroups(groups, val) {
    return groups.map(function (object, i) {
        return [i, object.pk, object.name, val]
    })
}

function _logoutState() {
    var unauthState = Object.create(initialState);
    unauthState.formState = {
        username: '',
        password: ''
    };
    unauthState.loggedIn = false;
    unauthState.loginDetails = {};
    unauthState.profile = Object.create(initialProfile);
    unauthState.topNavLinks = getTopNavLinks(false);

    return unauthState;
}

// Takes care of changing the application state
export function homeReducer(state = initialState, action) {
    console.log('Reducer');
    console.log(state);
    console.log(action);

    switch (action.type) {
        case CHANGE_FORM:
            return assign({}, state, {
                formState: action.newState
            });
            break;
        case constants.AUTH_USER_SUCCESS:
            var loginDetails = assign({}, state.loginDetails, {
                token: action.payload.token,
                username: action.payload.stats.params.body.username
            });
            return assign({}, state, {
                loggedIn: true,
                loginDetails: loginDetails,
                topNavLinks: getTopNavLinks(true)
            });
            break;
        case constants.UNAUTH_USER:
            var unauthState = _logoutState();
            return assign({}, state, unauthState);
            break;
        case SENDING_REQUEST:
            return assign({}, state, {
                currentlySending: action.sending
            });
            break;
        case constants.GET_USER_PROFILE_SUCCESS:
            return assign({}, state, {
                loggedIn: true,
                profile: action.payload.data,
                profile_errors: {}
            });
            break;
        case constants.GET_USER_PROFILE_FAIL:
            var errors = assign({}, state.profile_errors, dictifyMapperSmithError(action.payload.err));
            return assign({}, state, {profile_errors: errors});
            break;
        case constants.GET_USER_GROUPS_SUCCESS:
            return assign({}, state, {
                groups: flattenGroups(action.payload.data, true)
            });
            break;
        case constants.GET_AVAILABLE_USER_GROUPS_SUCCESS:
            return assign({}, state, {
                availableGroups: flattenGroups(action.payload.data, false)
            });
            break;
        case constants.GET_PROJECTS_FAIL:
            var errors = assign({}, state.projects_errors, dictifyMapperSmithError(action.payload.err));
            return assign({}, state, {projects__errors: errors});
            break;
        case constants.GET_PROJECTS_SUCCESS:
            return assign({}, state, {
                projects: action.payload.data
            });
            break;
        case constants.GET_TRAFFICLIGHT_FAIL:
            var errors = assign({}, state.traffic_light_errors, dictifyMapperSmithError(action.payload.err));
            return assign({}, state, {traffic_light_errors: errors});
            break;
        case constants.GET_TRAFFICLIGHT_SUCCESS:
            var trafficlights = assign({}, state.trafficlights, {[action.payload.stats.url]: action.payload.data});
            return assign({}, state, {
                trafficlights: trafficlights
            });
            break;
        default:
            return state;
    }
}
