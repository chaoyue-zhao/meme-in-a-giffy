import React, { Component } from "react";

class GalleryListItem extends Component {
  onItemClick = () => {
    this.props.handleGalleryItem(this.props.item);
    this.props.handleToggleModal();
  };

  render() {
    const { images, title } = this.props.item;

    return (
      <li onClick={this.onItemClick}>
        <img src={images.fixed_height.url} alt={title} />
      </li>
    );
  }
}

export default GalleryListItem;
