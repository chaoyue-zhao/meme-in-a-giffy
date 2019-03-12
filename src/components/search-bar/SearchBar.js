import React, { Component } from "react";
import searchIcon from "./../../assets/searchIcon.svg";
import { constants } from "crypto";
// import blackDownArrow from "./../../assets/blackDownArrow.svg";

class SearchBar extends Component {
  constructor() {
    super();
    this.state = {
      query: "",
      //setting the default to gifs so when page first load, there is something for the api call if the user did not select anything
      type: "gifs",
      placeholder: "Search GIFs and Memes"
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
    if (window.innerWidth < 600) {
      this.setState({ placeholder: "Search" });
      console.log("what ?", window.innerWidth);
    }
    console.log("what dimension", window.innerWidth);
  };
  componentDidMount() {
    this.updateDimensions();
    console.log("updatedimension", window.innerWidth);
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
              autocomplete="off"
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
            <button type="submit">
              <img src={searchIcon} className="search-bar-icon" alt="search" />
            </button>
          </div>
        </form>
      </React.Fragment>
    );
  }
}

export default SearchBar;
