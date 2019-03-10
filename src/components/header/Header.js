import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import SuperNiceButton from '../button/Button';

class Header extends Component {
  render() {
    return (
      <header className="header">
        <div className="wrapper">
          <nav className="header-nav">
            <ul className="clearfix">
              <li>
                <NavLink to="/" exact>
                  <SuperNiceButton text="Search" />
                </NavLink>
              </li>
              {this.props.isAuth && (
                <li>
                  <NavLink to="/saved">
                  <SuperNiceButton text="Saved" />
                  </NavLink>
                </li>
              )}
              {this.props.isAuth ? (
                <SuperNiceButton onClick={this.props.handleLogOutClick} text="Log Out"/>
              ) : (
                <SuperNiceButton onClick={this.props.handleLogInClick} text="Log In"/>
              )}
            </ul>
          </nav>
          <h1 className="header-title clearfix heading heading-primary">
            Meme in a Giffy
          </h1>
          <h2 className="heading heading-secondary">
            Best place to create Memes and share them with your friends!
          </h2>
        </div>
      </header>
    );
  }
}

export default Header;
