import React, {Component} from 'react';
import database from './../firebase/firebase.js'
import GalleryList from './../gallery-list/GalleryList.js'
class SavedMemes extends Component {
    constructor(){
        super();
        this.state={
            savedMemes: null
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

    componentWillUnmount(){
        database.ref().off();
    }  

    render() {
        console.log(this.props)
        if(!this.state.savedMemes) return <div />
        return(
            <GalleryList displayedItems={this.state.savedMemes} type="memes" authId={this.props.authId} savedMeme={true} />
        )
    }
}

export default SavedMemes; 