import React, { Component } from "react";
import { NavLink } from "react-router-dom";

class Header extends Component {
  render() {
    return (
      <header className="header">
        <div className="wrapper">
          <nav className="header-nav">
            <ul className="clearfix">
              <li>
                <NavLink to="/" exact>
                  Search
                </NavLink>
              </li>
              {this.props.isAuth && (
                <li>
                  <NavLink to="/saved">Saved</NavLink>
                </li>
              )}
              {this.props.isAuth ? (
                <button onClick={this.props.handleLogOutClick}>Log Out</button>
              ) : (
                <button onClick={this.props.handleLogInClick}>Log In</button>
              )}
            </ul>
          </nav>
          <h1 className="header-title clearfix">Meme in a Giffy</h1>
        </div>
      </header>
    );
  }
}

export default Header;
