import React, { Component } from 'react';
import TwitterLogo from '../../assets/twitter-icon.png';

class Twitter extends Component {
    render() {
        return (
          <a
            className="twitter-share-button"
            href={`https://twitter.com/intent/tweet?text=Come+and+made+your+meme+with+Meme+in+a+Giffy&hashtags=memeinaGiffy&url=https://meme-in-a-giffy.firebaseapp.com/`}
            data-size="large"
          >
            <img
              src={TwitterLogo}
              alt="Twitter logo"
              className="twitter-share-image"
            />
          </a>
        );
    }
}

export default Twitter