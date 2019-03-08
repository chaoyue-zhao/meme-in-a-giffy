import React, { Component } from "react";
import "./App.css";
import SearchPage from './components/search-page/SearchPage';
import Header from './components/header/Header';
import SavedMemes from "./components/saved-memes/SavedMemes";
import MemeDetails from "./components/meme-details/MemeDetails";
import {BrowserRouter, Route} from 'react-router-dom';
import {provider, auth} from './components/firebase/firebase';

class App extends Component {
	constructor() {
        super();
        this.state = {
            auth: null
        }
    }

	componentDidMount () {
		auth.onAuthStateChanged((user => {
			if (user) {
				this.setState({ auth: user.uid })
				console.log('loggedIn')
			} else {
				this.setState ({ auth: null })
				console.log('loggedOut')
			}
		}
		))
	}

	handleLogInClick = () => {
		auth.signInWithPopup(provider) 
	}

	handleLogOutClick = () => {
		auth.signOut() 
	}

	render() {
    return (
      <BrowserRouter>
        <React.Fragment>
          <Header 
				isAuth={this.state.auth}
				handleLogInClick={this.handleLogInClick}
				handleLogOutClick={this.handleLogOutClick}
				/>
          <Route path="/" render={(props) => <SearchPage authId={this.state.auth} {...props} exact />} />
          <Route path="/saved"
          render={
            (props) => <SavedMemes authId={this.state.auth} {...props} /> 
          }
           />         
          <Route path="/display/:memeId" component= {MemeDetails}/>
        </React.Fragment>
      </BrowserRouter>
    );
  }
}

export default App;
