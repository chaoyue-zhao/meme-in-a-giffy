import React, { Component } from "react";
import GalleryListItem from "./../gallery-list-item/GalleryListItem.js";

class GalleryList extends Component {
  constructor() {
      super();
      this.state = {
          showModal: false
      }
  }
  renderGalleryItems = () => {
    return this.props.displayedItems.map((item, i) => {
      console.log(item.images.original.url);
      let gifImage = item.images.original.url;
      let gifTitle = item.title;
      return <GalleryListItem key={i} gifImage={gifImage} gifTitle={gifTitle} onClick={this.handleToggleModal} />;
    });
  };

  handleToggleModal = () => {
      this.setState((prevState) => {
          return {
              showModal : !prevState.showModal
          }
      });
  }

  render() {
    if (!this.props.displayedItems) return <div />;
    console.log("props", this.props);
    return (
      <div>
        <h2>{this.props.type === "gifs" ? "Gifs List" : "Memes List"}</h2>
        {/* {this.props.displayedItems} */}
        <div>
          <ul>{this.renderGalleryItems()}</ul>
        </div>
      </div>
    );
  }
}

export default GalleryList;
