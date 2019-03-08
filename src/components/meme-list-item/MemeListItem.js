import React, { Component } from "react";
import Twitter from "../twitter/Twitter";
import database, {auth, provider} from '../firebase/firebase';

class MemeListItem extends Component {

  handleLikes = () => {
    this.props.item.likes = this.props.item.likes + 1
    database.ref(`memes/${this.props.item.id}`).update(this.props.item)
  }

  handleDislikes = () => {
    this.props.item.dislikes = this.props.item.dislikes + 1
    database.ref(`memes/${this.props.item.id}`).update(this.props.item)
  }
  onSaveClick = () => {
    if(this.props.authId) {
      database.ref(`users/${this.props.authId}/memes`).push(this.props.item);
    } else {
      auth.signInWithPopup(provider);
    }
  }

  onDeleteClick = () => {
      console.log('delete, damnit!')
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
    console.log(this.props)
    const { images, title, inputOne, inputTwo } = this.props.item;
    return (
      <li>
        <div>
            <p>{inputOne}</p>
            <img src={images.original.url} alt={title} />
            <p>{inputTwo}</p>
        </div>
        <div className='meme-list-item-bar'>
            <div>
                <button type='button' className='up-arrow' onClick={this.handleLikes}>Like</button>
                <span>{this.props.item.likes}</span>
                <button type='button' className='down-arrow' onClick={this.handleDislikes}>Dislike</button>
                <span>{this.props.item.dislikes}</span>
            </div>
            <div>
            {this.renderButtons()}
            </div>
            <div>
              <Twitter memeId={this.props.item.id}/>
            </div>
        </div>
      </li>
    );
  }
}
export default MemeListItem;
