import React, {Component} from 'react';
import database from './../firebase/firebase.js'
import GalleryList from './../gallery-list/GalleryList.js'
class SavedMemes extends Component {
    constructor(){
        super();
        this.state={
            savedMemes: []
        }
    }

    componentDidMount(){
        database.ref(`users/${this.props.authId}/memes`).on('value', (response)=>{
          const arrayNewState = []
          response.forEach(meme =>{
              arrayNewState.push({
                  ...meme.val(),
                  savedMemeId: meme.key
              })
          })
          this.setState({savedMemes:arrayNewState})
        })
    }
    
    componentDidUpdate = (prevProps, prevState) => {
      if(this.props.authId !== prevProps.authId) {
        database.ref(`users/${this.props.authId}/memes`).on('value', (response)=>{
          const arrayNewState = []
          response.forEach(meme =>{
              arrayNewState.push({
                  ...meme.val(),
                  savedMemeId: meme.key
              })
          })
          this.setState({savedMemes:arrayNewState})
        })
      }  
    }
    
    componentWillUnmount(){
        database.ref().off();
    }  

    render() {
        if (this.state.savedMemes.length === 0) return <div className="gallery-error"><h2 className="heading-tertiary">No Saved Memes</h2></div>
        return(
          <GalleryList 
            displayedItems={this.state.savedMemes} 
            type="memes" 
            authId={this.props.authId} 
            savedMeme={true} 
          />
        )
    }
}

export default SavedMemes; 