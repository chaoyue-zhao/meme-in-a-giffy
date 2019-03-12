import React, { Component } from "react";
import giphy from "./../../assets/giphy.gif";

class Footer extends Component {
  render() {
    return (
      <footer className="clearfix">
        <div className="clearfix wrapper">
          <p>
            Made by <a href="http://chaoyuezhao.com/" target="_blank" rel="noopener noreferrer" className="space">Chaoyue Zhao,</a>
            <a href="http://jeannetteng.com/" target="_blank" rel="noopener noreferrer" className="space">Jeannette Ng,</a>
            <a href="http://jonathanwongcodes.com/" target="_blank" rel="noopener noreferrer" className="space">Jonathan Wong,</a>
            <a href="http://mabbas.codes/" target="_blank" rel="noopener noreferrer" className="space">Mohammed Abbas</a>            
          </p>
          <img src={giphy} alt="Powered by Giphy" />
        </div>
      </footer>
    );
  }
}

export default Footer;
