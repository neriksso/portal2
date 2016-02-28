/*
 * HomePage
 *
 * This is the first thing users see of the app
 * Route: /
 *
 */

import React, { Component } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';

class HomePage extends Component {
    render() {
        const { loggedIn } = this.props.data;
        return (
            <article>
                <div>
                    <section className="text-section">
                        {/* Change the copy based on the authentication status */}
                        {loggedIn ? (
                            <h1>You have logged in, the cake was a lie.</h1>
                        ) : (
                            <h1>Welcome, please login to the portal, there is cake.</h1>
                        )}
                    </section>
                </div>
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
export default connect(select)(HomePage);
