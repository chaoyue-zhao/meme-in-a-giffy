import React, { Component } from "react";
import database from "../firebase/firebase.js";
import SuperNiceButton from "../button/Button";

class GifModal extends Component {
  constructor() {
    super();
    this.state = {
      showModal: true,
      inputOne: "",
      inputTwo: "",
      inputOneFontSize: "font-big",
      inputTwoFontSize: "font-big",
      valid: "modal-input-not-valid",
      tags: "",
      error: null
    };

    this.inputText = React.createRef();
  }

  componentDidMount() {
    this.inputText.current.focus();
  }

  // these one liner setState are very sweet. they help us get the value from da inputs.
  handleInputOneChange = e => {

    if (e.target.value.length >= 22) {
      this.setState({ inputOneFontSize: "font-small" });
    } else {
      this.setState({ inputOneFontSize: "font-big" });
    }

    if (e.target.value.length >= 1) {
      this.setState({ valid: "modal-input-valid" });
    } else {
      this.setState({ valid: "modal-input-not-valid" });
    }

    this.setState({ inputOne: e.target.value });
  };

  handleInputTwoChange = e => {
    if (e.target.value.length >= 22) {
      this.setState({ inputTwoFontSize: "font-small" });
    } else {
      this.setState({ inputTwoFontSize: "font-big" });
    }

    if (e.target.value.length >= 1) {
      this.setState({ valid: "modal-input-valid" });
    } else {
      this.setState({ valid: "modal-input-not-valid" });
    }

    this.setState({ inputTwo: e.target.value });
  };

  handleInputTag = e => {
    this.setState({ tags: e.target.value });
  };

  validateInput = async () => {
    if (!this.state.inputOne && !this.state.inputTwo) {
      await this.setState({
        error: "Please enter text to continue"
      });
    } else {
      await this.setState({
        error: null
      });
    }
  };

  handleSubmit = async e => {
    // chao's fav form method. don't forget. please don't forget.
    e.preventDefault();
    // this is very nice also. PUSHING TO FIREBASE with a customized object to the meme ref
    await this.validateInput();

    if (!this.state.error) {
      database.ref("memes").push({
        // with all of our things. all of them.
        likes: 0,
        dislikes: 0,
        images: this.props.item.images,
        title: this.props.item.title,
        tags: this.state.tags,
        inputOne: this.state.inputOne,
        inputTwo: this.state.inputTwo,
        subject: this.props.item.slug
      });

      this.props.handleToggleSaveModal();
      this.props.handleToggleModal();
    }
  };

  render() {
    //very NOICE deconstructing here. Good job taking out those key (on the left) off the object (on the right)
    const { images, title } = this.props.item;
    console.log("item details for Chao", this.props.item);
    return (
      <section
        className="modal-background modal"
        onClick={this.props.handleToggleModal}
      >
        {/* this onClick is linked with the handleToggleModal function, which closes/opens the modal. However, due to event bubbling, we need to add e.stopPropagation to the event object inside. So we stop the function bubbles within the background. */}
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
          <form
            action="#"
            onSubmit={this.handleSubmit}
            className="modal-form clearfix"
          >
            <div className="modal-input-container">
              <input
                className={`modal-input ${this.state.valid}`}
                type="text"
                id="inputTop"
                onChange={this.handleInputOneChange}
                value={this.state.inputOne}
                maxlength="90"
                ref={this.inputText}
                placeholder="Enter top meme text:"
                onInput={this.validateInput}
              />
              <label htmlFor="inputTop" className="modal-label">
                Enter top meme text:
              </label>
              {this.state.error && <p className="error">
                {this.state.error}
              </p>}
              
            </div>

            <div className="modal-input-container">
              <input
                className={`modal-input ${this.state.valid}`}
                type="text"
                id="inputBottom"
                onChange={this.handleInputTwoChange}
                value={this.state.inputTwo}
                maxlength="90"
                placeholder="Enter bottom meme text"
                onInput={this.validateInput}
              />
              <label htmlFor="inputBottom" className="modal-label">
                Enter bottom meme text
              </label>
            </div>

            <div className="modal-input-container">
              <input
                type="text"
                className="modal-input modal-input-valid"
                placeholder="Enter associated search terms. Such as: dogs, funny..."
                onChange={this.handleInputTag}
                value={this.state.tags}
              />
              <label htmlFor="inputTag" className="modal-label">
                Enter associated search terms.
              </label>
            </div>

            <div className="modal-button-container">
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
          <button
            className="close"
            onClick={this.props.handleToggleModal}
          />
        </div>
      </section>
    );
  }
}

export default GifModal;
