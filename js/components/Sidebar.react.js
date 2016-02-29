import React, { Component } from 'react';
import { Link } from 'react-router';
import { logout } from '../actions/AppActions';
import LoadingButton from './LoadingButton.react';
import { Navbar, Nav, Glyphicon, Col, Button } from 'react-bootstrap';
import { Transition } from 'react-overlays';

class SideBar extends Component {
    render() {
        const { navLinks } = this.props;
        console.log(this.props);
        let links = Object.keys(navLinks).map(this._renderNavItem.bind(this));

        return (
            <div className="profile-sidebar">
                <Transition
                    in={ this.props.loggedIn }
                    timeout={ 500 }
                    className='fade'
                    enteredClassName='in'
                    enteringClassName='in'
                >
                    <div>
                    <div className="profile-userpic">
                        <img
                            src="https://zippy.gfycat.com/WellwornDelightfulBlueshark.gif"
                            className="img-responsive" alt=""/>
                    </div>
                    <div className="profile-usertitle">
                        <div className="profile-usertitle-name">
                            { this.props.profile.first_name } { this.props.profile.last_name }
                        </div>
                        <div className="profile-usertitle-job">
                            Developer
                        </div>
                    </div>
                    <div className="profile-usermenu">
                        <Nav>
                            { links }
                        </Nav>
                    </div>
                        </div>
                </Transition>
            </div>
        );
    }

    _renderNavItem(linkName) {
        let link = this.props.navLinks[linkName];

        return (
            <li className={this.props.activePage === linkName ? 'active' : null} key={linkName}>
                <Link to={link.link}><Glyphicon glyph="user"/> {link.title}</Link>
            </li>
        );
    }

}

export default SideBar;
