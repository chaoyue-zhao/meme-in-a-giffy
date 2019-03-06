import React, { Component } from "react";
class MemeListItem extends Component {
  render() {
    const { images, title, inputOne, inputTwo } = this.props.item;
    console.log(this.props.item);
    return (
      <li>
        <p>{inputOne}</p>
        <img src={images.original.url} alt={title} />
        <p>{inputTwo}</p>
      </li>
    );
  }
}
export default MemeListItem;
