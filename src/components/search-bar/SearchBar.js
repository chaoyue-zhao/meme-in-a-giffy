import React, { Component } from "react";
import searchIcon from "./../../assets/searchIcon.svg";
import Granim from "granim";

class SearchBar extends Component {
  constructor() {
    super();
    this.state = {
      query: "",
      //setting the default to gifs so when page first load, there is something for the api call if the user did not select anything
      type: "gifs",
      placeholder: "",
      width: null
    };
  }

  handleSearchChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  handleSelectChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  updateDimensions = () => {
    this.setState({ width: window.innerWidth });
    if (this.state.width < 600) {
      this.setState({ placeholder: "Search" });
    } else {
      this.setState({ placeholder: "Search GIFs and Memes" });
    }
  };

  componentDidMount() {
    this.updateDimensions();
    window.addEventListener("resize", this.updateDimensions.bind(this));
    // eslint-disable-next-line 
    const granimInstance = new Granim({
      element: "#canvas-complex",
      direction: "diagonal",
      isPausedWhenNotInView: true,
      states: {
        "default-state": {
          gradients: [
            ["#589b69", "#dad706"],
            ["#f8fb90", "#ff9966"],
            ["#e1eec3", "#f05053"]
          ]
        }
      }
    });
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.updateDimensions.bind(this));
  }

  formSubmit = e => {
    e.preventDefault();
    this.props.getHandleFormSubmit(this.state.query, this.state.type);
    this.setState({ query: "" });
  };
  render() {
    return (
      <React.Fragment>
        <form onSubmit={this.formSubmit} className="search-bar">
          <div className="form-description">
            <p className="heading heading-secondary">
              Search for gifs, click to create memes, and save it to your list!
            </p>
          </div>
          <div className="modal-input-container clearfix">
            <input
              type="text"
              name="query"
              className="modal-input"
              autoComplete="off"
              id="userInput"
              onChange={this.handleSearchChange}
              value={this.state.query}
              placeholder={this.state.placeholder}
            />

            <label htmlFor="userInput" className="modal-label">
              Search all the GIFs and Memes
            </label>
            <select
              className="select-menu"
              name="type"
              id="type"
              onChange={this.handleSelectChange}
            >
              <option value="gifs">Gifs</option>
              <option value="memes">Memes</option>
            </select>
            <div className="button-canvas">
              <button type="submit">
                <canvas id="canvas-complex" />
                <img
                  src={searchIcon}
                  className="search-bar-icon"
                  alt="search"
                />
              </button>
            </div>
          </div>
        </form>
      </React.Fragment>
    );
  }
}
export default SearchBar;
