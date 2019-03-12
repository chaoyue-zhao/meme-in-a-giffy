import React, { Component } from "react";
import axios from "axios";
import SearchBar from "./../search-bar/SearchBar";
import GalleryList from "./../gallery-list/GalleryList";
import database from "./../firebase/firebase";
import LoadingImage from './../../assets/loading-image-green.svg';


class SearchPage extends Component {
    constructor() {
        super();
        this.state = {
            displayedItems: [],
            type: "gifs",
            loading: true
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
    
  async componentDidMount() {
    await this.getDataFromApi("trending");
    await this.setState({loading : false})
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
    
      await this.setState({
        displayedItems: response.data.data
      });
      await this.setState({ loading: false})
    } catch (error) {
      alert(error);
    }
  };

    handleFormSubmit = async (query, type) => {
        await this.setState({ loading: true});
        await this.setState({ type });
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
                this.setState({ loading : false})
            });
        }
    };

    // tell the firebase to stop listen for changes so we can avoid potential async memory leaks
    componentWillUnmount() {
        database.ref().off();
    }

  render() {
    if (this.state.loading) {
      return(
        <div className="loading-container">
          <img src={LoadingImage} alt="rotating hamster wheel" className="rotate-center" />
          <p className="loading-text">Please wait! We're running in circles trying to find you the best gifs.</p>
        </div>
      )
    }
    return (
      <div className="App">
        <div className="wrapper">
          <SearchBar getHandleFormSubmit={this.handleFormSubmit} />
          <GalleryList
            displayedItems={this.state.displayedItems}
            type={this.state.type}
            authId={this.props.authId}
            history={this.props.history}
          />
        </div>
      </div>
    );
  }
};

export default SearchPage;
