import React, { Component } from 'react';

class Twitter extends Component {
    render() {
        return (
          <a
            class="twitter-share-button"
            href={`https://twitter.com/intent/tweet?text=made+this+meme+with+Meme+in+a+Giffy&hashtags=memeinaGiffy&url=http://localhost:3001/display/${this.props.memeId}`}
            data-size="large"
          >
            <button type='button' className='share-meme'>         
              Share on Twitter!
            </button>
          </a>
        );
    }
}

export default Twitter