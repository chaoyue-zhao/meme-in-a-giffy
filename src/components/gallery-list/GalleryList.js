import React, { Component } from "react";
import GalleryListItem from "./../gallery-list-item/GalleryListItem.js";
import GifModal from '../gif-modal/GifModal.js';

class GalleryList extends Component {
  constructor() {
      super();
      this.state = {
          showModal: false,
          currentGalleryItem: ""
      }
  }
  renderGalleryItems = () => {
    return this.props.displayedItems.map((item, i) => {

      return (
        <GalleryListItem 
          key={i} 
          item={item}
          handleToggleModal={this.handleToggleModal} 
          handleGalleryItem={this.handleGalleryItem}/>
      )     
    });
  };

  handleGalleryItem = (item) => {
    this.setState({
      currentGalleryItem: item
    })
  }

  handleToggleModal = () => {
      this.setState((prevState) => {
          return {
              showModal : !prevState.showModal
          }
      });
    }

  render() {
    if (!this.props.displayedItems) return <div />;
    return (
      <div>
        <h2>{this.props.type === "gifs" ? "Gifs List" : "Memes List"}</h2>
        {/* {this.props.displayedItems} */}
        <div className="gallery">
          <ul>{this.renderGalleryItems()}</ul>
        </div>
        {(this.state.showModal && this.props.type === 'gifs') && <GifModal item={this.state.currentGalleryItem}/> }
      </div>
    );
  }
}

export default GalleryList;
