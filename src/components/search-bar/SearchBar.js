import React, { Component } from "react";

class SearchBar extends Component {
  constructor() {
    super();
    this.state = {
      query: "",
      //setting the default to gifs so when page first load, there is something for the api call if the user did not select anything
      type: "gifs"
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

  formSubmit = e => {
    e.preventDefault();
    this.props.getHandleFormSubmit(this.state.query, this.state.type);
    this.setState({ query : ""});
  };
  render() {
    return (
      <React.Fragment>
        <form onSubmit={this.formSubmit}>
          <p>
            Best place to create Memes and share them with your friends! Search
            for gifs, click to create memes, and save it to your list!
          </p>
          <label htmlFor="userInput">
            <p>Please enter a search term for your gifs:</p>
          </label>
          <input
            type="text"
            name="query"
            id="userInput"
            onChange={this.handleSearchChange}
            value={this.state.query}
          />
          <select name="type" id="type" onChange={this.handleSelectChange}>
            <option value="gifs">Gifs</option>
            <option value="memes">Memes</option>
          </select>
          <button type="submit">Get your things!</button>
        </form>
      </React.Fragment>
    );
  }
}

export default SearchBar;
