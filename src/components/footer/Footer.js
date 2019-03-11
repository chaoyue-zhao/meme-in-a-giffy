import React, { Component } from "react";
import giphy from "./../../assets/giphy.gif";

class Footer extends Component {
  render() {
    return (
      <footer className="clearfix">
        <div className="clearfix wrapper">
          <p>
            Made by <a href="#">Chao</a>&nbsp;
            <a href="#">Jonathan</a> &nbsp;
            <a href="#">Jeannette</a> &nbsp;
            <a href="#">Moe</a>
          </p>
          <img src={giphy} alt="Powered by Giphy" />
        </div>
      </footer>
    );
  }
}

export default Footer;
