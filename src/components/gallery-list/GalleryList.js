import React, { Component } from "react";
import GifListItem from "./../gif-list-item/GifListItem.js";

class GalleryList extends Component {
  // constructor() {
  //     super();
  //     this.state = {

  //     }
  // }
  renderGalleryItems = () => {
    return this.props.displayedItems.map(item => {
      console.log(item.images.original.url);
      let gifImage = item.images.original.url;
      let gifTitle = item.title;
      return <GifListItem gifImage={gifImage} gifTitle={gifTitle} />;
    });
  };

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
