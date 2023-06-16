import React, { useState } from 'react';

const ContactModal = ({ contact, closeModal }) => {
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  return (
    <div className="contact-modal">
      <div className="contact-modal-content">
        <span className="contact-close-button" onClick={closeModal}>
          &times;
        </span>
        <h2>{contact.name}</h2>
        <p>Phone: {contact.phone}</p>
        <img
          className="contact-image-modal"
          src={isHovered ? contact.HoverImage : contact.Image}
          alt={contact.name}
          onMouseEnter={contact.HoverImage ? handleMouseEnter : null}
          onMouseLeave={handleMouseLeave}
        />
        {/* Add more contact details here */}
      </div>
    </div>
  );
};

export default ContactModal;
