import React, { Component } from "react";
import poweredByGiphy from "./../../assets/poweredByGiphy.gif";

class Footer extends Component {
  render() {
    return (
      <footer>
        <img src={poweredByGiphy} alt="Powered by Giphy" />
      </footer>
    );
  }
}

export default Footer;
