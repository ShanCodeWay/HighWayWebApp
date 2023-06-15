import React, { useState } from 'react';
import { CSSTransition } from 'react-transition-group';
import errorAnimationData from '../assets/animation/error.json';
import './ErrorModal.css';

const ErrorModal = ({
  visible,
  setVisible,
  onClose,
  animationType,
  backgroundColor,
  iconColor,
  iconName,
  iconAnimationType,
  title,
  message,
}) => {
  const closeModal = () => {
    setVisible(false);
    onClose();
  };

  return (
    <CSSTransition
      in={visible}
      timeout={300}
      classNames="modal"
      unmountOnExit
      onExited={() => setVisible(false)}
    >
      <div className="modal-container">
        <div className="modal-content" style={{ backgroundColor }}>
          <h2 className="error-modal-title">{title}</h2>
          <p className="modal-message">{message}</p>
          <button className="modal-close" onClick={closeModal}>
            Close
          </button>
        </div>
      </div>
    </CSSTransition>
  );
};

export default ErrorModal;
