import React from 'react';

const ConfirmSavedModal = ({handleToggleSaveModal}) => {

  const handleButtonClick = () => {
    handleToggleSaveModal();
  }

  return (
    <section className="modal-background" onClick={handleToggleSaveModal}>
      <div className="modal-body" onClick={(e) => e.stopPropagation()}>
        <p>Meme saved!</p>
        <button onClick={handleButtonClick}>Ok</button>
      </div>
    </section>
  )
}

export default ConfirmSavedModal;

