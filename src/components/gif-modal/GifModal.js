import React, { Component } from "react";
import database from '../firebase/firebase.js';

class GifModal extends Component {
  constructor() {
    super();
    this.state = {
      showModal: true,
      inputOne: "",
      inputTwo: "",
      tags: ""
    };
  }
  handleInputOneChange = e => {
    this.setState({ inputOne: e.target.value });
  };
  handleInputTwoChange = e => {
    this.setState({ inputTwo: e.target.value });
  };
  handleInputTag = e => {
    this.setState({ tags: e.target.value });
  };

  handleSubmit = (e) => {
      e.preventDefault();
      database.ref('memes').push({
          likes: 0,
          dislikes: 0,
          images: this.props.item.images,
          title: this.props.item.title,
          tags: this.state.tags,
          inputOne: this.state.inputOne,
          inputTwo: this.state.inputTwo
      })
  }

  render() {
    const { images, title } = this.props.item;

    return (
      <section className="modal-background">
        <div className="modal-body">
          <div className="modal-meme-container">
            <p className="modal-textTop">
              {this.state.inputOne && this.state.inputOne}
            </p>
            <div className="model-image-container">
              <img
                src={images.original.url}
                alt={title}
                className="modal-image"
              />
            </div>
            <p className="modal-textBottom">
              {this.state.inputTwo && this.state.inputTwo}
            </p>
          </div>
          <form action="" onSubmit={this.handleSubmit}>
            <label htmlFor="inputTop">Top text:</label>
            <input
              className="modal-inputTop"
              type="text"
              id="inputTop"
              onChange={this.handleInputOneChange}
              value={this.state.inputOne}
            />
            <label htmlFor="inputBottom">Bottom text:</label>
            <input
              className="modal-inputBottom"
              type="text"
              id="inputBottom"
              onChange={this.handleInputTwoChange}
              value={this.state.inputTwo}
            />
            <input
              type="text"
              className="modal-inputTag"
              placeholder="Tags here"
              onChange={this.handleInputTag}
              value={this.state.tags}
            />
            <div className="modal-button-container">
              <button type="submit" className="modal-button">
                Save
              </button>
              <button type="button" className="modal-button">
                Back
              </button>
            </div>
          </form>
        </div>
      </section>
    );
  }
}

export default GifModal;
