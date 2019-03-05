import React, { Component } from 'react';

class GalleryList extends Component {
    // constructor() {
    //     super();
    //     this.state = {
 
    //     }
    // }
    render(){
    return(
        <div>
            <h2>
                {this.props.type === 'gifs' ? 'Gifs List' : 'Memes List'}
            </h2>
        {this.props.displayedItems}

        </div>
    )
    }
}

export default GalleryList;