import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';

class Header extends Component {
    render() {
        return (
          <header className="header">
            <h1 className="header-title">Meme in a Giffy</h1>
            <nav>
              <ul>
                <li>
                  <NavLink to="/" exact>Search</NavLink>
                </li>
                <li>
                  <NavLink to="/saved">Saved</NavLink>
                </li>
                {this.props.isAuth ? <button onClick={this.props.handleLogOutClick}>Log Out</button>: <button onClick={this.props.handleLogInClick}>Log In</button>}
              </ul>
            </nav>
          </header>
        );
    }
}

export default Header;