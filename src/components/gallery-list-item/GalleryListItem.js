import React, { Component } from "react";

class GalleryListItem extends Component {
  render() {
    return (
      <li>
        <img src={this.props.gifImage} alt={this.props.gifTitle} />
      </li>
    );
  }
}
export default GalleryListItem;
