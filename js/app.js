/**
 *
 * app.js
 *
 * This is the entry file for the application, mostly just setup and boilerplate
 * code
 *
 */

// Load the ServiceWorker, the Cache polyfill, the manifest.json file and the .htaccess file
//import 'file?name=[name].[ext]!../serviceworker.js';
//import 'file?name=[name].[ext]!../serviceworker-cache-polyfill.js';
import 'file?name=[name].[ext]!../manifest.json';
import 'file?name=[name].[ext]!../.htaccess';
import 'file?name=[name].[ext]!../favicon.ico';
import 'file?name=[name].[ext]!../favicon.png';

////Check for ServiceWorker support before trying to install it
//if ('serviceWorker' in navigator) {
//    // Install ServiceWorker
//  navigator.serviceWorker.register('/serviceworker.js').then(() => {
//  }).catch((err) => {
//    // Installation failed
//    console.log('ServiceWorker registration failed, error:', err);
//  });
//} else {
//  // No ServiceWorker Support
//  console.log('ServiceWorker is not supported in this browser');
//}

// Import all the third party stuff
import React from 'react';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import promiseMiddleware from 'redux-promise-middleware';
import multi from 'redux-multi'
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import { homeReducer } from './reducers/reducers';

// Import the components used as pages
import HomePage from './components/pages/HomePage.react';
import LoginPage from './components/pages/LoginPage.react';
import LogoutPage from './components/pages/LogoutPage.react';
import RegisterPage from './components/pages/RegisterPage.react';
import Dashboard from './components/pages/Dashboard.react';
import NotFound from './components/pages/NotFound.react';
import Group from './components/pages/Group.react';
import App from './components/App.react';

// Creates the Redux reducer with the redux-thunk middleware, which allows us
// to do asynchronous things in the actions
const createStoreWithMiddleware = applyMiddleware(thunk, multi, promiseMiddleware({
    promiseTypeSuffixes: ['', 'SUCCESS', 'FAIL']
}))(createStore);
const store = createStoreWithMiddleware(homeReducer);

var requireAuth = function(nextState, replace){
    let { loggedIn } = store.getState();
    console.log(loggedIn);
    console.log(nextState);

    if(!loggedIn){
        replace({
            pathname: '/login',
            state: { nextPathname: nextState.location.pathname }
        })
    }
}

function checkAuth(nextState, replace) {



    let { loggedIn } = store.getState();
    console.log('checkAuth');
    console.log(nextState)

    // check if the path isn't dashboard
    // that way we can apply specific logic
    // to display/render the path we want to
    if (nextState.location.pathname !== '/dashboard') {
        if (loggedIn) {
            if (nextState.location.state && nextState.location.pathname) {
                replace(nextState.location.pathname);
            } else {
                replace('/');
            }
        }
    } else {
        // If the user is already logged in, forward them to the homepage
        if (!loggedIn) {
            if (nextState.location.state && nextState.location.pathname) {
                replace(nextState.location.pathname);
            } else {
                replace('/');
            }
        }
    }
}

// Mostly boilerplate, except for the Routes. These are the pages you can go to,
// which are all wrapped in the App component, which contains the navigation etc
ReactDOM.render(
    <Provider store={store}>
        <Router history={browserHistory}>
            <Route component={App}>
                <Route path="/" component={HomePage}/>
                <Route path="/login" component={LoginPage}/>
                <Route path="/logout" component={LogoutPage}/>
                <Route path="/register" component={RegisterPage} onEnter={requireAuth}/>
                <Route path="/dashboard" component={Dashboard} onEnter={requireAuth}/>
                <Route path="/groups" component={Group} onEnter={requireAuth}/>
                <Route path="*" component={NotFound}/>
            </Route>
        </Router>
    </Provider>,
    document.getElementById('app')
);