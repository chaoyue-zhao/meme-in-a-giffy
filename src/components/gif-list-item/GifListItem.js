import React, { Component } from "react";

class GifListItem extends Component {
  render() {
    return (
      <div>
        <li>
          <img src={this.props.gifImage} alt={this.props.gifTitle} />
        </li>
      </div>
    );
  }
}
export default GifListItem;
