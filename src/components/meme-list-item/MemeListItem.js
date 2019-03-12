import React, { Component } from "react";
import Twitter from "../twitter/Twitter";
import database, {auth, provider} from '../firebase/firebase';
import './_meme-list-item.scss';
import upArrow from '../../assets/thick-up-arrow.svg';
import downArrow from '../../assets/thick-down-arrow.svg';


class MemeListItem extends Component {
  constructor() {
    super();

    this.state = {
      error : ''
    };
  }

  checkForSavedMeme = async () => {
    const response = await database.ref(`users/${this.props.authId}/memes`).once('value');
    const savedMemeIds = [];
    response.forEach(meme => {
      savedMemeIds.push(meme.val().id);
    })
    return savedMemeIds.includes(this.props.item.id)
  }

  handleLikes = () => {
    this.props.item.likes = this.props.item.likes + 1;
    database.ref(`memes/${this.props.item.id}`).update(this.props.item);
    database.ref(`users/${this.props.authId}/memes/${this.props.item.savedMemeId}`).update(this.props.item);
  };

  handleDislikes = () => {
    this.props.item.dislikes = this.props.item.dislikes + 1;
    database.ref(`memes/${this.props.item.id}`).update(this.props.item);
    database.ref(`users/${this.props.authId}/memes/${this.props.item.savedMemeId}`).update(this.props.item);
  };

  onSaveClick = async () => {
    const isSaved = await this.checkForSavedMeme();
    if(this.props.authId && !isSaved) {
      database.ref(`users/${this.props.authId}/memes`).push(this.props.item);
      this.props.history.push("/saved");
    } else if(this.props.authId) {
      this.setState({ error : "Meme already saved"});
    } else {
      auth.signInWithPopup(provider);
    }
  }

  onDeleteClick = () => {
    database.ref(`users/${this.props.authId}/memes/${this.props.item.savedMemeId}`).remove();
  }
  

  renderButtons = () =>{
    return this.props.savedMeme ? (
      <button
      type='button'
      className='delete-button'
      onClick={this.onDeleteClick}
      >
      Delete
      </button>
    ):(
    <button 
        type='button' 
        className='save-button'
        onClick={this.onSaveClick}
        >
        Save
    </button>
    )
  }

  render() {
    const { images, title, inputOne, inputTwo } = this.props.item;
    return (
      <li className='meme-list-item'>
        <div className='meme-text-image-container'>
            <p>{inputOne}</p>
            <img src={images.original.url} alt={title} />
            <p>{inputTwo}</p>
        </div>
        <div className='meme-list-item-bar clearfix'>
            <div className='like-dislike-container'>
                <button type='button' className='up-arrow' onClick={this.handleLikes}><img src={upArrow} alt="upvote" /></button>
                <span>{this.props.item.likes}</span>
                <button type='button' className='down-arrow' onClick={this.handleDislikes}><img src={downArrow} alt="downvote"/></button>
                <span>{this.props.item.dislikes}</span>
            </div>
            <div className='tweet-and-delete'>
              <div>
                <Twitter memeId={this.props.item.id} className="clearfix"/> 
              </div>
            <div className='meme-delete-button'>  
              {this.renderButtons()}
              {this.state.error && <p>{this.state.error}</p>}
            </div>
            </div>
        </div>
      </li>
    );
  }
}
export default MemeListItem;
