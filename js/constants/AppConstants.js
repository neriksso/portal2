/*
 * AppConstants
 * These are the variables that determine what our central data store (reducer.js)
 * changes in our state. When you add a new action, you have to add a new constant here
 *
 * Follow this format:
 * export const YOUR_ACTION_CONSTANT = 'YOUR_ACTION_CONSTANT';
 */
export const CHANGE_FORM = 'CHANGE_FORM';
export const SET_AUTH = 'SET_AUTH';
export const SENDING_REQUEST = 'SENDING_REQUEST';
export const GET_PROFILE = 'GET_PROFILE';
export const PATCH_PROFILE = 'PATCH_PROFILE';
export const ERROR_PROFILE = 'ERROR_PROFILE';
export const ERROR_PROP = 'ERROR_PROP';

export const AUTH_USER = 'AUTH_USER';
export const AUTH_USER_SUCCESS = 'AUTH_USER_SUCCESS';
export const AUTH_USER_FAIL = 'AUTH_USER_FAIL';
export const AUTH_USER_FROM_LOCALSTORE = 'AUTH_USER_FROM_LOCALSTORE';
export const UNAUTH_USER = 'UNAUTH_USER';

export const GET_USER_PROFILE = 'GET_USER_PROFILE';
export const GET_USER_PROFILE_SUCCESS = 'GET_USER_PROFILE_SUCCESS';
export const GET_USER_PROFILE_FAIL = 'GET_USER_PROFILE_FAIL';

export const GET_USER_GROUPS = 'GET_USER_GROUPS';
export const GET_USER_GROUPS_SUCCESS = 'GET_USER_GROUPS_SUCCESS';
export const GET_USER_GROUPS_FAIL = 'GET_USER_GROUPS_FAIL';

export const GET_AVAILABLE_USER_GROUPS_SUCCESS = 'GET_AVAILABLE_USER_GROUPS_SUCCESS';