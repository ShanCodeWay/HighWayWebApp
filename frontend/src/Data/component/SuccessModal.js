import React, { useState } from 'react';
import { CSSTransition } from 'react-transition-group';
import 'bootstrap/dist/css/bootstrap.min.css';
import './SuccessModal.css';

const SuccessModal = ({
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
  const [modalVisible, setModalVisible]   = useState(visible);

  const closeModal = () => {
    setModalVisible(false);
    onClose();
  };

  return (
    <CSSTransition
      in                                  = {modalVisible}
      timeout                             = {300}
      classNames                          = "modal"
      unmountOnExit
      onExited                            = {() => setVisible(false)}
    >
      <div className                      = "Sucess-modal-container"style={{ display: visible ? 'block' : 'none' }}>
        <div className                    = "modal-dialog modal-dialog-centered">
          <div className                  = "Sucess-modal-content">
            <div className                = "modal-header">
              <h2 className               = "modal-title">{title}</h2>
              <button
                type                      = "button"
                className                 = "btn-close"
                onClick                   = {closeModal}
                aria-label                = "Close"
              ></button>
            </div>
            <div className                = "modal-body">
              <p className                = "modal-message">{message}</p>
            </div>
            <div className                = "modal-footer">
              <button className           = "btn btn-secondary" onClick={closeModal}>
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </CSSTransition>
  );
};

export default SuccessModal;
