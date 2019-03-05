import React, { Component } from 'react';

class GifModal extends Component {
    constructor() {
        super();
        this.state = {
            showModal: true
        }
    }

    render() {
        const { images, title } = this.props.item

        return(
            <section className="modal-background">
                <div className="modal-body">
                    <div className="modal-meme-container">
                        <p className="modal-textTop"></p>
                        <div className="model-image-container">
                            <img src={images.original.url} alt={title} className="modal-image"/>
                        </div>
                        <p className="modal-textBottom"></p>
                    </div>
                    <label htmlFor="inputTop">Top text:</label>
                    <input className="modal-inputTop" type="text" id="inputTop"/>
                    <input className="modal-inputBottom" type="text" id="inputBottom"/>
                    <label htmlFor="inputBottom">Bottom text:</label>
                    <div className="modal-button-container">
                        <button type="submit" className="modal-button">Save</button>
                        <button type="button" className="modal-button">Back</button>
                    </div>
                </div>
            </section>
        )
    }
}

export default GifModal