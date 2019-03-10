import React from 'react';
const ConfirmSavedModal = ({handleToggleSaveModal}) => {

  const handleButtonClick = () => {
    handleToggleSaveModal();
  }

  return (
    <section className="modal-background modal" onClick={handleToggleSaveModal}>
      <div className="modal-body confirm-save" onClick={(e) => e.stopPropagation()}>
        <div className="confirm-save-content">
          <p>Meme saved!</p>
          <button onClick={handleButtonClick}>Ok</button>
        </div> 
      </div>
    </section>
  )
}

export default ConfirmSavedModal;

