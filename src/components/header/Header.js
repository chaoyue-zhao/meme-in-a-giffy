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
                  <NavLink to="/">Search</NavLink>
                </li>
                <li>
                  <NavLink to="/saved">Saved</NavLink>
                </li>
              </ul>
            </nav>
          </header>
        );
    }
}

export default Header;