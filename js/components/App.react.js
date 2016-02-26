/**
 *
 * App.react.js
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 */

// Import stuff
import React, { Component } from 'react';
import TopNav from './TopNav.react.js';
import { connect } from 'react-redux';
import auth from '../utils/auth';
const mainStyle = require('../../css/main.sass');

class App extends Component {
    render() {
        return (
            <main>
                <TopNav loggedIn={this.props.data.loggedIn} loginDetails={this.props.data.loginDetails}
                     history={this.props.history} location={this.props.location} dispatch={this.props.dispatch}
                     currentlySending={this.props.data.currentlySending}/>
                { this.props.children }

            </main>
        )
    }
}

export default App;

// REDUX STUFF

// Which props do we want to inject, given the global state?
function select(state) {
    return {
        data: state
    };
}

// Wrap the component to inject dispatch and state into it
export default connect(select)(App);
