import React, { Component } from "react";
import axios from "axios";
import SearchBar from "./../search-bar/SearchBar";
import GalleryList from "./../gallery-list/GalleryList";
import database from "./../firebase/firebase";

class SearchPage extends Component {
    constructor() {
        super();
        this.state = {
            displayedItems: [],
            type: "gifs",
        };
    }

    apiCall = (endpoint, query) => {
        //sweet proxy everyone love.
        const proxyUrl = "https://cors-anywhere.herokuapp.com/";
        const apiUrl = `http://api.giphy.com//v1/gifs/${endpoint}`;

        return axios.get(proxyUrl + apiUrl, {
            params: {
                //still working on hiding this key
                api_key: `${process.env.REACT_APP_API_KEY}`,
                q: query
            }
        });
    }
    
  componentDidMount() {
    this.getDataFromApi("trending");
  }

  apiCall = (endpoint, query) => {
    //sweet proxy everyone love.
    const proxyUrl = "https://cors-anywhere.herokuapp.com/";
    const apiUrl = `http://api.giphy.com//v1/gifs/${endpoint}`;

    return axios.get(proxyUrl + apiUrl, {
      params: {
        //still working on hiding this key
        api_key: `${process.env.REACT_APP_API_KEY}`,
        q: query
      }
    });
  };

  getDataFromApi = async query => {
    try {
      const response = await this.apiCall("search", query);
      
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
            //getting the snapshot of our api data. store it in the newState, along with the api Key
            database.ref('memes').on('value', (response) => {
                const newState = [];
                response.forEach((meme) => {
                    //.push() is a firebase method to add things to the data. .key in a firebase method to get the firebase generated id
                    newState.push({
                        ...meme.val(),
                        id: meme.key,
                    });
                });
                //this is filtering our meme data from firebase based on the user query 
                const filteredMemes = newState
                    .filter(meme => {
                        //splitting the string into lil strings and separate them whenever there is a "-"
                        const subjectWords = meme.subject.split('-');

                        // return this if any of the following has the search query 1)title 2)tags 3)keywords
                        return meme.title.toLowerCase().includes(query.toLowerCase())
                            || meme.tags.toLowerCase().includes(query.toLowerCase())
                            || subjectWords.includes(query.toLowerCase());
                    })    
                this.setState({ displayedItems: filteredMemes });
            });
        }
    };

   
    

    // tell the firebase to stop listen for changes so we can avoid potential async memory leaks
    componentWillUnmount() {
        database.ref().off();
    }
  };

  render() {
    console.log("state at SearchPage", this.state.displayedItems);
    if (!this.state.displayedItems) return <div />;
    return (
      <div className="App">
        <div className="wrapper">
          <SearchBar getHandleFormSubmit={this.handleFormSubmit} />
          <GalleryList
            displayedItems={this.state.displayedItems}
            type={this.state.type}
            authId={this.props.authId}
          />
        </div>
      </div>
    );
  }
}

export default SearchPage;
