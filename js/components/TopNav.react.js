/**
 *
 * Nav.react.js
 *
 * This component renders the navigation bar
 *
 */

import React, { Component } from 'react';
import { Link } from 'react-router';
import { logout } from '../actions/AppActions';
import LoadingButton from './LoadingButton.react';
import { Navbar, Nav } from 'react-bootstrap'
//var Button = require('./components/button').Button;

var bootstrap = require('bootstrap');
var bootstrapStyle = require("../../node_modules/bootstrap/dist/css/bootstrap.css");


class TopNav extends Component {
  render() {
    // Render either the Log In and register buttons, or the logout button
    // based on the current authentication state.
    const navButtons = this.props.loggedIn ? (
        <NavBar brand="" inverse fixedTop>
            <Nav right>
              <Link to="/dashboard" className="btn btn--dash btn--nav">Dashboard</Link>
              {this.props.currentlySending ? (
                <LoadingButton className="btn--nav" />
          ) : (
            <a href="#" className="btn btn--login btn--nav" onClick={::this._logout}>Logout</a>
          )}
            </Nav>
        </NavBar>
      ) : (
        <Navbar>
            <Nav>
          <Link to="/register" className="btn btn--login btn--nav">Register</Link>
          <Link to="/login" className="btn btn--login btn--nav">Login</Link>
                </Nav>
        </Navbar>
      );

    return(
      <div>
          { navButtons }
      </div>
    );
  }

  _logout() {
    this.props.dispatch(logout());
  }
}

TopNav.propTypes = {
  loggedIn: React.PropTypes.bool.isRequired,
  currentlySending: React.PropTypes.bool.isRequired
}

export default TopNav;
