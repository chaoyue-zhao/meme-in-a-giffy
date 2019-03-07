import React, { Component } from "react";
import database from '../firebase/firebase';

class MemeListItem extends Component {

  handleLikes = () => {
    this.props.item.likes = this.props.item.likes + 1
    database.ref(`memes/${this.props.item.id}`).update(this.props.item)
  }

  handleDislikes = () => {
    this.props.item.dislikes = this.props.item.dislikes + 1
    database.ref(`memes/${this.props.item.id}`).update(this.props.item)
  }

  render() {
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
                <button type='button' className='save-button'>Save</button>
            </div>
            <div>
                <button type='button' className='share-meme'>Share</button>
            </div>
        </div>
      </li>
    );
  }
}
export default MemeListItem;
