import React, { Component } from 'react';
import './App.css';
import axios from 'axios';
import SearchBar from './components/search-bar/SearchBar';

class App extends Component {
  constructor(){
    super();
    this.state = {
      memes: [],
      gifs: [],
      type: ''
    }
  }

  getDataFromApi = async (query) => {
    try {
      const proxyUrl = "https://cors-anywhere.herokuapp.com/";
      const apiUrl = "http://api.giphy.com//v1/gifs/search";

      const response = await axios.get(proxyUrl + apiUrl, {
        params: {
          api_key: "3nzTnsDMtCQPXuoNQS6repIsBh6Jy3dY",
          q: query
        }
      });

      this.setState({
        gifs: response.data.data
      });

      console.log(response.data.data);
    } catch (error) {
      throw error
    }
  } 

  handleFormSubmit = (query) => {
    this.getDataFromApi(query);
  }

  render() {
    return (
      <div className="App">
        <SearchBar gatherUserInput={this.handleFormSubmit}/>
      </div>
    );
  }
}

export default App;


