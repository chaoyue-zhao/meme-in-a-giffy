import React, { Component } from 'react';
import './App.css';
import axios from 'axios';
import SearchBar from './components/search-bar/SearchBar';
import GalleryList from './components/gallery-list/GalleryList';


class App extends Component {
  constructor(){
    super();
    this.state = {
      displayedItems: [],
      type: 'gifs'
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
        displayedItems: response.data.data
      });

      console.log(response.data.data);
    } catch (error) {
      throw error
    }
  } 

  handleFormSubmit = (query, type) => {
      this.setState({ type })
      if (type === 'gifs') {
          this.getDataFromApi(query);
      } else {
          // get from firebase -- TO INCLUDE FUNCTION
      }
    // set type as gif vs meme = firebase call
    //If type === 'gifs' Display Gifs = getDataFrommApi
    //else display memes

    // displayedItems = [] = either gifs or memes
  }

  render() {
    return (
      <div className="App">
        <SearchBar getHandleFormSubmit={this.handleFormSubmit}/>
        <GalleryList 
            displayedItems={this.state.displayedItems}
            type={this.state.type}
        />
      </div>
    );
  }
}

export default App;


