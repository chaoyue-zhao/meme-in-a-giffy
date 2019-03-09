import React, { Component } from "react";
import GalleryListItem from "./../gallery-list-item/GalleryListItem.js";
import MemeListItem from "./../meme-list-item/MemeListItem.js";
import GifModal from "../gif-modal/GifModal.js";

class GalleryList extends Component {
  constructor() {
    super();
    this.state = {
      //state to toggle modal on and off on click of each gallery list item
      showModal: false,
      //state to define the item being click on so the modal can render the current image
      currentGalleryItem: ""
    };
  }

  renderGalleryItems = () => {
    if (this.props.type === "memes") {
      this.props.displayedItems.sort((a, b) => {
        if (a.likes > b.likes) {
          return -1;
        } else if (b.likes > a.likes) {
          return 1;
        } else {
          return 0;
        }
      });
    }

    return this.props.displayedItems.map((item, i) => {
      return this.props.type === "gifs" ? (
        <GalleryListItem
          key={i}
          //passing the entire item down instead of individual key/value pairs so we can get them all!!!!
          item={item}
          //passing the function down so we can trigger the render for modal on button click
          handleToggleModal={this.handleToggleModal}
          //passing the function down so we can receive the state change from GalleryListItem on which item is being clicked on
          handleGalleryItem={this.handleGalleryItem}
        />
      ) : (
        <MemeListItem
          savedMeme={this.props.savedMeme}
          item={item}
          authId={this.props.authId}
        />
      );
    });
  };

  handleGalleryItem = item => {
    this.setState({
      currentGalleryItem: item
    });
  };

  handleToggleModal = () => {
    this.setState(prevState => {
      //very very sweet syntax alert! we are toggling the state of showModal on click of the image. remember we have access to prevState in this.setState({}). so if the previous state of showModal is true, this will change it to false and vice versa.
      return {
        showModal: !prevState.showModal
      };
    });
  };

  render() {
    console.log("displayedItems", this.props);
    //conditional rendering only if this.props.displayedItems(the array contains our data from api is NOT empty/falsy)
    if (!this.props.displayedItems) return <div />;
    return (
      //conditional rendering again! we are choosing to display the title based on user's selection - linking to the dropdown
      <div>
        <h2>{this.props.type === "gifs" ? "Gifs List" : "Memes List"}</h2>
        {/* ??? what is this for??? {this.props.displayedItems} */}
        <div className="gallery ">
          <ul className="clearfix">{this.renderGalleryItems()}</ul>
        </div>
        {/*conditional rendering again again! rendering the modal only when the following two conditions are met 1) user clicked on an image 2)user selected gifs from the dropdown. we are also passing the nicly packaged gallery item down */}
        {this.state.showModal && this.props.type === "gifs" && (
          <GifModal item={this.state.currentGalleryItem} />
        )}
      </div>
    );
  }
}

export default GalleryList;
