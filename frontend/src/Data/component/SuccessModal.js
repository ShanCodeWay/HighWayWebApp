import React from 'react';
import { useState } from 'react';

import { CSSTransition } from 'react-transition-group';

import animationData from '../../assets/animation/trowsome.json';
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
  const [modalVisible, setModalVisible] = useState(visible);

  const closeModal = () => {
    setModalVisible(false);
    onClose();
  };

  return (
    <CSSTransition
      in={modalVisible}
      timeout={300}
      classNames="modal"
      unmountOnExit
      onExited={() => setVisible(false)}
    >
      <div className="modal-container" style={{ backgroundColor }}>
       
        <div className="modal-content">
          <div className="icon-container">
            
          </div>
          <h2 className="modal-title">{title}</h2>
          <p className="modal-message">{message}</p>
          <button className="modal-close" onClick={closeModal}>
            Close
          </button>
        </div>
      </div>
    </CSSTransition>
  );
};

export default SuccessModal;
