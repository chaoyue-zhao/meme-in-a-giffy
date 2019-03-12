import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import SuperNiceButton from '../button/Button';

class Header extends Component {
  render() {
    return (
      <header className="header">
        <div className="wrapper">

          <input type="checkbox" className="header-nav-checkbox" id="checkbox"/>
          <label htmlFor="checkbox" className="header-nav-button">
            <span className="header-nav-icon"></span>
          </label>
          <nav className="header-nav clearfix">
            <ul className="clearfix">
              <li>
                <NavLink to="/" exact >
                  <SuperNiceButton
                    text="Search"
                  />
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
                <li>
                <SuperNiceButton
                  click={this.props.handleLogOutClick}
                  text="Log Out"
                />
                </li>
              ) : (
                <li>
                <SuperNiceButton
                  click={this.props.handleLogInClick}
                  text="Log In"
                />
                </li>
              )}
            </ul>
          </nav>
          <h1 className="header-title clearfix heading heading-primary">
            Meme in a Giffy
          </h1>
          <h2 className="heading heading-secondary">
           {this.props.history.location.pathname !=='/saved' &&
             'Best place to create Memes and share them with your friends!' } 
          </h2>
        </div>
      </header>
    );
  }
}

export default Header;
