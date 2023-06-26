import React, { useState } from 'react';
import { CSSTransition } from 'react-transition-group';
import errorAnimationData from '../../assets/animation/error.json';
import 'bootstrap/dist/css/bootstrap.min.css';
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
      in                    = {visible}
      timeout               = {300}
      classNames            = "modal"
      unmountOnExit
      onExited              = {() => setVisible(false)}
    >
      <div className        = "modal fade show" style={{ display: visible ? 'block' : 'none' }}>
        <div className      = "modal-dialog modal-dialog-centered">
          <div className    = "modal-content" style={{ backgroundColor }}>
            <div className  = "modal-header">
              <h5 className = "modal-title">{title}</h5>
              <button type  = "button" className="close" onClick={closeModal}>
                <span>&times;</span>
              </button>
            </div>
            <div className  = "modal-body">
              <p className  = "modal-message">{message}</p>
            </div>
            <div className  = "modal-footer">
              <button type  = "button" className="btn btn-secondary" onClick={closeModal}>
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </CSSTransition>
  );
};

export default ErrorModal;
