import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import SuperNiceButton from "../button/Button";

class Header extends Component {
  constructor(){
    super();

    this.checkbox = React.createRef();
  }

  handleCheckBox = () => {
    this.checkbox.current.checked = false;
  }

  render() {
    return (
      <header className="header">
        <div className="wrapper">
          <input
            type="checkbox"
            className="header-nav-checkbox"
            id="checkbox"
            ref={this.checkbox}
          />
          <label htmlFor="checkbox" className="header-nav-button">
            <span className="header-nav-icon" />
          </label>
          <nav className="header-nav clearfix">
            <ul className="clearfix">
              <li onClick={this.handleCheckBox}>
                <NavLink to="/" exact>
                  <SuperNiceButton text="Search" />
                </NavLink>
              </li>
              {this.props.isAuth && (
                <li onClick={this.handleCheckBox}>
                  <NavLink to="/saved">
                    <SuperNiceButton text="Saved" />
                  </NavLink>
                </li>
              )}
              {this.props.isAuth ? (
                <li onClick={this.handleCheckBox}>
                  <SuperNiceButton
                    click={this.props.handleLogOutClick}
                    text="Log Out"
                  />
                </li>
              ) : (
                <li onClick={this.handleCheckBox}>
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
            {this.props.history.location.pathname !== "/saved" &&
              "Best place to create Memes and share them with your friends!"}
          </h2>
        </div>
      </header>
    );
  }
}

export default Header;
