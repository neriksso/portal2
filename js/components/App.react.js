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
import { getUserProfile } from '../actions/AppActions';
import { Row, Col } from 'react-bootstrap';
import { Transition } from 'react-overlays';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';
const mainStyle = require('../../css/main.scss');

class App extends Component {

    componentDidMount() {
        var info = this.props.username;
        this._getUserDetails(this.props.data.loginDetails.username)
    }

    _getUserDetails(username, token) {
        this.props.dispatch(getUserProfile(username));
    }

    render() {
        console.log(this.props);
        const { loggedIn } = this.props.data;
        return (
            <main>
                <Row className="mainContent">
                    <NavMain navLinks={ this.props.data.topNavLinks }/>
                        <Col md={3}>

                            <SideBar loggedIn={ loggedIn } loginDetails={this.props.data.loginDetails}
                                     history={this.props.history} location={this.props.location}
                                     dispatch={this.props.dispatch}
                                     profile={this.props.data.profile} navLinks={ this.props.data.sideNavLinks }/>
                        </Col>
                    <Col md={9}>
                        <div className="content-window">
                        { this.props.children }
                            </div>
                    </Col>
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
