import React from 'react';

const ConfirmSavedModal = ({handleToggleSaveModal}) => {

  const handleButtonClick = () => {
    handleToggleSaveModal();
  }

  return (
    <section className="modal-background">
      <div className="modal-body">
        <p>Meme saved!</p>
        <button onClick={handleButtonClick}>Ok</button>
      </div>
    </section>
  )
}

export default ConfirmSavedModal;
