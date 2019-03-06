import React, { Component } from "react";
import "./App.css";
import axios from "axios";
import SearchBar from "./components/search-bar/SearchBar";
import GalleryList from "./components/gallery-list/GalleryList";
import database from './components/firebase/firebase';

class App extends Component {
  constructor() {
    super();
    this.state = {
      displayedItems: [],
      type: "gifs"
    };
  }

  getDataFromApi = async query => {
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

    } catch (error) {
      alert(error);
    }
  };

  handleFormSubmit = async (query, type) => {
    this.setState({ type });
    if (type === "gifs") {
      await this.getDataFromApi(query);
    } else {
      database.ref('memes').on('value', (response) => {
        const newState = [];
        response.forEach((meme) => {
          newState.push({
            ...meme.val(),
            id : meme.key,
          });
        });
        
        const filteredMemes = newState
          .filter(meme => {
            const subjectWords = meme.subject.split('-');

            return meme.title.toLowerCase().includes(query.toLowerCase())
            || meme.tags.toLowerCase().includes(query.toLowerCase())
            || subjectWords.includes(query.toLowerCase());
          }) 
      
        this.setState({ displayedItems : filteredMemes});
      });
    }
  };

  componentWillUnmount() {
    database.ref().off();
  }

  render() {
    if(!this.state.displayedItems) return <div />
    return (
      <div className="App">
        <SearchBar getHandleFormSubmit={this.handleFormSubmit} />
        <GalleryList
          displayedItems={this.state.displayedItems}
          type={this.state.type}
        />
      </div>
    );
  }
}

export default App;
