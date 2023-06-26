import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClose } from '@fortawesome/free-solid-svg-icons';
const ContactModal = ({ contact, closeModal }) => {
  const [isHovered, setIsHovered]   = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  return (
    <div className                  = "contacts-modal">
      <div className                = "contacts-modal-content">
        <span className             = "contacts-close-button" onClick={closeModal}>
         <FontAwesomeIcon icon      = {faClose} className="contacts-icon" beat />
        </span>
        <h2>{contact.name}</h2>
        <p>Phone                    : {contact.phone}</p>
        <img
          className                 = "contacts-image-modal"
          src                       = {isHovered ? contact.HoverImage : contact.Image}
          
          onMouseEnter              = {contact.HoverImage ? handleMouseEnter : null}
          onMouseLeave              = {handleMouseLeave}
        />
        
      </div>
    </div>
  );
};

export default ContactModal;
