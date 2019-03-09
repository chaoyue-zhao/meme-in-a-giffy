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

  onKeyPress = (e) => {
    if(e.key ==='Enter') {
      this.props.handleGalleryItem(this.props.item);
      this.props.handleToggleModal();
    }
  }

  render() {
    const { images, title } = this.props.item;
    return (
      <li
        onClick={this.onItemClick}
        onKeyPress={this.onKeyPress}
        onMouseEnter={this.onMouseEnterHandler}
        onMouseLeave={this.onMouseLeaveHandler}
        tabIndex='0'
      >
        {this.state.hover && <div className="overlay" />}
        <img src={images.fixed_height.url} alt={title} />
      </li>
    );
  }
}

export default GalleryListItem;
