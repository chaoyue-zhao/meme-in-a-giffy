import React, {Component} from 'react';
import database from './../firebase/firebase.js'
import GalleryList from './../gallery-list/GalleryList.js'
class SavedMemes extends Component {
    constructor(){
        super();
        this.state={
            savedMemes: ""
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
    componentDidUpdate(){
        console.log(this.state.savedMemes)
    }

    render() {
        return(
            <GalleryList displayedItems={this.state.savedMemes} type="memes" savedMeme={true} />
        )
    }
}

export default SavedMemes; 