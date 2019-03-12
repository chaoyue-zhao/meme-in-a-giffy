import React from 'react';
class ConfirmSavedModal extends React.Component {
  constructor(){
      super();

      this.button = React.createRef();
  }

  componentDidMount() {
    this.button.current.focus();
  }

  handleButtonClick = () => {
    this.props.handleToggleSaveModal();
  }
  render(){
      return (
        <section className="modal-background modal" onClick={this.props.handleToggleSaveModal}>
            <div className="confirm-save" onClick={(e) => e.stopPropagation()}>
                <div className="confirm-save-content">
                    <p className="confirm-save-text">Meme saved!</p>
                    <button 
                      onClick={this.handleButtonClick} 
                      ref={this.button}
                      className="confirm-save-button"
                    >
                      Ok
                    </button>
                </div> 
            </div>
        </section>
    )
  }
}

export default ConfirmSavedModal;

