import React, { Component } from 'react';
import { Link } from 'react-router';
import Navbar from 'react-bootstrap/lib/Navbar';
import Nav from 'react-bootstrap/lib/Nav';

class NavMain extends Component {


    render() {
        const { navLinks } = this.props;
        console.log(navLinks);
        let brand = <Link to="/" className="navbar-brand">Portal</Link>;
        let links = Object.keys(navLinks).map(this._renderNavItem.bind(this)).concat([
            <li key="github-link">
                <a href="https://github.com/SPANDigital/portal2" target="_blank">GitHub</a>
            </li>
        ]);

        return (
            <Navbar staticTop
                    componentClass="header"
                    className="bs-docs-nav"
                    role="banner"
            >
                <Navbar.Header>
                    {brand}
                </Navbar.Header>
                <Navbar.Collapse className="bs-navbar-collapse">
                    <Nav role="navigation" id="top">
                        {links}
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        );
    }

    _renderNavItem(linkName) {
        let link = this.props.navLinks[linkName];

        return (
            <li className={this.props.activePage === linkName ? 'active' : null} key={linkName}>
                <Link to={link.link}>{link.title}</Link>
            </li>
        );
    }
}

export default NavMain;
