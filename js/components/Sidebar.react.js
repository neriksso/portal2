import React, { Component } from 'react';
import { Link } from 'react-router';
import { logout } from '../actions/AppActions';
import LoadingButton from './LoadingButton.react';
import { Navbar, Nav, Glyphicon, Col, Button } from 'react-bootstrap'

class SideBar extends Component {
    render() {
        const { navLinks } = this.props;
        console.log(navLinks);
        let links = Object.keys(navLinks).map(this._renderNavItem.bind(this));

        return (
            <Col md={3}>
                <div className="profile-sidebar">
                    <div className="profile-userpic">
                        <img
                            src="https://zippy.gfycat.com/WellwornDelightfulBlueshark.gif"
                            className="img-responsive" alt=""/>
                    </div>
                    <div className="profile-usertitle">
                        <div className="profile-usertitle-name">
                            Marcus Doe
                        </div>
                        <div className="profile-usertitle-job">
                            Developer
                        </div>
                    </div>
                    <div className="profile-userbuttons">
                        <Button bsSize="small" bsStyle="success" >Follow</Button>
                        <Button bsSize="small" bsStyle="danger">Message</Button>
                    </div>
                    <div className="profile-usermenu">
                        <Nav>
                            { links }
                        </Nav>
                    </div>
                </div>
            </Col>
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
