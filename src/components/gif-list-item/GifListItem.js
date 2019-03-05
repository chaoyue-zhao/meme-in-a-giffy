import React, { Component } from "react";

class GifListItem extends Component {
  render() {
    return (
      <li>
        <img src={this.props.gifImage} alt={this.props.gifTitle} />
      </li>
    );
  }
}
export default GifListItem;
