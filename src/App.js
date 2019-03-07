import React, { Component } from "react";
import "./App.css";
import SearchPage from './components/search-page/SearchPage';
import Header from './components/header/Header';
import SavedMemes from "./components/saved-memes/SavedMemes";
import MemeDetails from "./components/meme-details/MemeDetails";
import {BrowserRouter, Route} from 'react-router-dom';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <React.Fragment>
          <Header />
          <Route path="/" component= {SearchPage} exact/>
          <Route path="/saved" component= {SavedMemes}/>
          <Route path="/display/:memeId" component= {MemeDetails}/>
        </React.Fragment>
      </BrowserRouter>
    );
  }
}

export default App;
