import React, { Component } from "react";
import createHistory from 'history/createBrowserHistory';
import "./App.css";
import SearchPage from "./components/search-page/SearchPage";
import Header from "./components/header/Header";
import SavedMemes from "./components/saved-memes/SavedMemes";
import MemeDetails from "./components/meme-details/MemeDetails";
import {Router, Route, Switch} from 'react-router-dom';
import {provider, auth} from './components/firebase/firebase';
import PrivateRoute from './routes/PrivateRoute';
import Footer from "./components/footer/Footer";

const history = createHistory();

class App extends Component {
  constructor() {
    super();
    this.state = {
      auth: null
    };
  }

	componentDidMount  () {
		auth.onAuthStateChanged(( async user => {
			if (user) {
        await this.setState({ auth: user.uid })
				console.log('loggedIn')
			} else {
        await this.setState ({ auth: null })
        if(history.location.pathname==="/saved"){
          history.push("/");
        }
				console.log('loggedOut')
			}
		}
		))
  }

  handleLogInClick = () => {
    auth.signInWithPopup(provider);
  };

  handleLogOutClick = () => {
    auth.signOut();
  };

  render() {
    return (
      <Router history={history}>
        <React.Fragment>
            <Header 
              isAuth={this.state.auth}
              handleLogInClick={this.handleLogInClick}
              handleLogOutClick={this.handleLogOutClick}
            />
            <Switch>
              <Route path="/" render={(props) => <SearchPage authId={this.state.auth} {...props} />} exact={true} />
              {/* <Route path="/saved"
              render={
                (props) => <SavedMemes authId={this.state.auth} {...props} /> 
              }
              />          */}
              <PrivateRoute path="/saved" component={SavedMemes} authId={this.state.auth}/>
              <Route path="/display/:memeId" component= {MemeDetails}/>
            </Switch> 
          <Footer />
        </React.Fragment>
      </Router>
    );
  }
}

export default App;
