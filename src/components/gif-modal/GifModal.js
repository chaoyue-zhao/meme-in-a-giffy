import React, { Component } from "react";
import database from "../firebase/firebase.js";

class GifModal extends Component {
  constructor() {
    super();
    this.state = {
      showModal: true,
      inputOne: "",
      inputTwo: "",
      inputFontSize: "font-big",
      tags: "",
      error: null
    };
  }

  // these one liner setState are very sweet. they help us get the value from da inputs.
  handleInputOneChange = e => {
    if (e.target.value.length >= 22) {
      this.setState ({ inputFontSize: "font-small" })
    } else {
      this.setState({ inputFontSize: "font-big" })
    }
    this.setState({ inputOne: e.target.value });
  };

  handleInputTwoChange = e => {
    if (e.target.value.length >= 22) {
      this.setState({ inputFontSize: "font-small" })
    } else {
      this.setState({ inputFontSize: "font-big" })
    }
    this.setState({ inputTwo: e.target.value });
  };

  handleInputTag = e => {
    this.setState({ tags: e.target.value });
  };


  validateInput = async () => {
    if (!this.state.inputOne && !this.state.inputTwo) {
     await this.setState({
        error: "Error enter text to continue"
      });
    } else {
    await this.setState({ 
       error: null
    })
  }}

  handleSubmit =  async (e) => {
      // chao's fav form method. don't forget. please don't forget.
      e.preventDefault();
      // this is very nice also. PUSHING TO FIREBASE with a customized object to the meme ref
      await this.validateInput() 
      
      if(!this.state.error) {
        database.ref('memes').push({
          // with all of our things. all of them. 
          likes: 0,
          dislikes: 0,
          images: this.props.item.images,
          title: this.props.item.title,
          tags: this.state.tags,
          inputOne: this.state.inputOne,
          inputTwo: this.state.inputTwo,
          subject: this.props.item.slug
      }) 
      
      this.props.handleToggleSaveModal();
      this.props.handleToggleModal();
  }
}

  render() {
    //very NOICE deconstructing here. Good job taking out those key (on the left) off the object (on the right)
    const { images, title } = this.props.item;
    return (
      <section
        className="modal-background modal"
        onClick={this.props.handleToggleModal}
      >
        <div className="modal-body" onClick={e => e.stopPropagation()}>
          <div className="modal-image-container">
            <p
              className={`modal-meme-text modal-text-top ${
                this.state.inputFontSize
              }`}
            >
              {/* conditionally render if inputOne has content (trusly), show the result from inputOne in the DOM*/}
              {this.state.inputOne && this.state.inputOne}
            </p>
            <img
              src={images.original.url}
              alt={title}
              className="modal-image"
            />
            {/* referring to the deconstructing up top. also commenting in JSX is not fun. */}
            <p
              className={`modal-meme-text modal-text-bottom ${
                this.state.inputFontSize
              }`}
            >
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
              maxlength="100"
            />
            <label htmlFor="inputBottom">Bottom text:</label>
            <input
              className="modal-inputBottom"
              type="text"
              id="inputBottom"
              onChange={this.handleInputTwoChange}
              value={this.state.inputTwo}
              maxlength="100"
            />
            <input
              type="text"
              className="modal-inputTag"
              placeholder="Tags here"
              onChange={this.handleInputTag}
              value={this.state.tags}
            />
            <div className="modal-button-container">
              <p>{this.state.error ? this.state.error : ""}</p>
              <button type="submit" className="modal-button">
                Save
              </button>
              <button
                type="button"
                className="modal-button"
                onClick={this.props.handleToggleModal}
              >
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
