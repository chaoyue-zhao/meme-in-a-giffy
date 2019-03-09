import React, { Component } from "react";

class GalleryListItem extends Component {
  constructor() {
    super();
    this.state = {
      hover: false
    };
  }
  onItemClick = () => {
    this.props.handleGalleryItem(this.props.item);
    this.props.handleToggleModal();
  };
  onMouseEnterHandler = () => {
    this.setState({ hover: true });
  };

  onMouseLeaveHandler = () => {
    this.setState({ hover: false });
  };

  render() {
    const { images, title } = this.props.item;
    return (
      <li
        onClick={this.onItemClick}
        onMouseEnter={this.onMouseEnterHandler}
        onMouseLeave={this.onMouseLeaveHandler}
      >
        {this.state.hover && <div className="overlay" />}
        <img src={images.fixed_height.url} alt={title} />
      </li>
    );
  }
}

export default GalleryListItem;
