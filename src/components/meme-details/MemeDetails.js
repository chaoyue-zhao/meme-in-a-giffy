import React, { Component } from 'react';
import database from '../firebase/firebase';
class MemeDetails extends Component {
    constructor(){
        super();
        this.state={
            memes:null
        }
    }
    componentDidMount(){
        database.ref(`memes/${this.props.match.params.memeId}`).once('value',(response)=>{ 
            this.setState({memes: response.val()})
         })
    }
    componentDidUpdate(){
        console.log('meme',this.state.meme)
    }
    render() {
        if(!this.state.memes)return (<div></div>)
        return (
            <div>
             <p>{this.state.memes.inputOne}</p>
            <img src={this.state.memes.images.original.url} alt={this.state.memes.title} />
             <p>{this.state.memes.inputTwo}</p>
            </div>
        )
    }
}

export default MemeDetails; 