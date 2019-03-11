import React, { Component } from "react";
import database from "../firebase/firebase.js";
import SuperNiceButton from '../button/Button';

class GifModal extends Component {
  constructor() {
    super();
    this.state = {
      showModal: true,
      inputOne: "",
      inputTwo: "",
      inputOneFontSize: "font-big",
      inputTwoFontSize: "font-big",
      tags: "",
      error: null
    };

    this.inputText = React.createRef();
  }

  componentDidMount(){
      this.inputText.current.focus();
  }

  // these one liner setState are very sweet. they help us get the value from da inputs.
  handleInputOneChange = e => {
    if (e.target.value.length >= 22) {
      this.setState ({ inputOneFontSize: "font-small" })
    } else {
      this.setState({ inputOneFontSize: "font-big" })
    }
    this.setState({ inputOne: e.target.value });
  };

  handleInputTwoChange = e => {
    if (e.target.value.length >= 22) {
      this.setState({ inputTwoFontSize: "font-small" })
    } else {
      this.setState({ inputTwoFontSize: "font-big" })
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
                this.state.inputOneFontSize
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
                this.state.inputTwoFontSize
              }`}
            >
              {this.state.inputTwo && this.state.inputTwo}
            </p>
          </div>
          <form action="#" onSubmit={this.handleSubmit} className="modal-form clearfix">     
            <div className="modal-input-container">
              <input
                className="modal-input"
                type="text"
                id="inputTop"
                onChange={this.handleInputOneChange}
                value={this.state.inputOne}
                maxlength="90"
                ref={this.inputText}
                placeholder="Top Text:"
              />
              <label htmlFor="inputTop" className="modal-label">Top text:</label>
            </div>
              
            <div className="modal-input-container">
              <input
                className="modal-input"
                type="text"
                id="inputBottom"
                onChange={this.handleInputTwoChange}
                value={this.state.inputTwo}
                maxlength="90"
                placeholder="Bottom Text:"
              />
              <label htmlFor="inputBottom" className="modal-label">Bottom text:</label>
            </div>

            <div className="modal-input-container">
              <input
                type="text"
                className="modal-input"
                placeholder="Tags here"
                onChange={this.handleInputTag}
                value={this.state.tags}
              />
              <label htmlFor="inputTag" className="modal-label">Tags:</label>
            </div>
            
            <div className="modal-button-container">
              <p>{this.state.error ? this.state.error : ""}</p>

              <SuperNiceButton
                text="Save"
                type="submit"
                fontColor="black"
              />

              <SuperNiceButton
                text="Back"
                type="button"
                fontColor="black"
                click={this.props.handleToggleModal}
              />
            </div>
          </form>
        </div>
      </section>
    );
  }
}

export default GifModal;
