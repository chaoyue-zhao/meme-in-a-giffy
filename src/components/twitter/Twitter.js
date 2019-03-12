import React, { Component } from 'react';
import TwitterLogo from '../../assets/twitter-icon.png';

class Twitter extends Component {
    render() {
        return (
          <a
            className="twitter-share-button"
            href={`https://twitter.com/intent/tweet?text=made+this+meme+with+Meme+in+a+Giffy&hashtags=memeinaGiffy&url=http://localhost:3001/display/${this.props.memeId}`}
            data-size="large"
          >
            <button type='button' className='twitter-share-button'>         
              <img src={TwitterLogo} alt="Twitter logo" className="twitter-share-image"/>
            </button>
          </a>
        );
    }
}

export default Twitter