/**
 *
 * App.react.js
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 */

// Import stuff
import React, { Component } from 'react';
import TopNav from './TopNav.react';
import NavMain from './NavMain';
import SideBar from './Sidebar.react';
import { connect } from 'react-redux';
import auth from '../utils/auth';
import { Row } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap/dist/css/bootstrap-theme.css'
const mainStyle = require('../../css/main.scss');

class App extends Component {
    render() {
        return (
            <main>
                <Row className="mainContent">
                    <NavMain navLinks={ this.props.data.topNavLinks } />
                <SideBar loggedIn={this.props.data.loggedIn} loginDetails={this.props.data.loginDetails}
                         history={this.props.history} location={this.props.location} dispatch={this.props.dispatch}
                         currentlySending={this.props.data.currentlySending} navLinks={ this.props.data.sideNavLinks }/>
                { this.props.children }
                    </Row>
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
