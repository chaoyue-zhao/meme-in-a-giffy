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
      //sweet proxy everyone love.
      const proxyUrl = "https://cors-anywhere.herokuapp.com/";
      const apiUrl = "http://api.giphy.com//v1/gifs/search";

      const response = await axios.get(proxyUrl + apiUrl, {
        params: {
          //still working on hiding this key
          api_key:`${process.env.REACT_APP_API_KEY}`,
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
      //getting the snapshoot of our api data. store it in the newState, along with the api Key
      database.ref('memes').on('value', (response) => {
        const newState = [];
        response.forEach((meme) => {
          //.push() is a firebase method to add things to the data. .key in a firebase method to get the firebase generated id
          newState.push({
            ...meme.val(),
            id : meme.key,
          });
        });
        
        //chao is going to try to say that this is helping the user to filter from the data saved in the database. 
        const filteredMemes = newState
          .filter(meme => {
            {/*spliting the string into lil strings and seperate them whenever there is a "-"*/} 
            const subjectWords = meme.subject.split('-');

            // return this if any of the following has the search query 1)title 2)tags 3)keywords
            return meme.title.toLowerCase().includes(query.toLowerCase())
            || meme.tags.toLowerCase().includes(query.toLowerCase())
            || subjectWords.includes(query.toLowerCase());
          }) 
        
        this.setState({ displayedItems : filteredMemes});
      });
    }
  };

  //chao also doesn't know what exactly this do?
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
