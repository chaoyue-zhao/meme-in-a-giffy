import React, { Component } from "react";

class GifListItem extends Component {
  render() {
    return (
      <div>
        <img src={this.props.gifImage} alt={this.props.gifTitle} />
      </div>
    );
  }
}
export default GifListItem;
