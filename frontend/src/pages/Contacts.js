import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './css/Contacts.css';
import ContactModal from '../Data/component/ContactModal.js';
import contactsData from '../Data/details/en_contact_details';
import { FaPlus, FaMinus, FaSearch } from 'react-icons/fa';


const Contacts= () => {
 
 
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedContact, setSelectedContact] = useState(null);
  const [dateTime, setDateTime] = useState(new Date());



  const filteredContacts = contactsData.filter((contact) => {
    const { name, phone } = contact;
    const searchTerm = searchQuery.toLowerCase();
    return name.toLowerCase().includes(searchTerm) || phone.includes(searchTerm);
  });

  // Open modal to view contact details
  const openModal = (contact) => {
    setSelectedContact(contact);
  };

  // Close modal
  const closeModal = () => {
    setSelectedContact(null);
  };
 
  useEffect(() => {
    const interval = setInterval(() => {
      setDateTime(new Date());
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  const formatDate = (date) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return date.toLocaleDateString(undefined, options);
  };

  const formatTime = (date) => {
    const options = { hour: 'numeric', minute: 'numeric', second: 'numeric' };
    return date.toLocaleTimeString(undefined, options);
  };


 

   


      return (
        <>
       

        <div className="contacts-container">
     

      <div className="contacts-grid">
        {filteredContacts.map((contact) => (
          <div className="contact-card" key={contact.id} onClick={() => openModal(contact)}>
            
            <div className="contact-details">
              <h3>{contact.name}</h3>
              <p>{contact.phone}</p>
            </div>
          </div>
        ))}
      </div>

      {selectedContact && <ContactModal contact={selectedContact} closeModal={closeModal} />}
    
  
       
<div className='complaint-right'>
      
        <div className="contacts-datetime-container">
          <span className="complaint-date-text">{formatDate(dateTime)}</span>
          <span className="complaint-time-text">{formatTime(dateTime)}</span>
        </div>
     
        </div>

        <div className="contacts-search-container">
      
      <input
        className="contacts-search-input"
        type="text"
        placeholder="Search contacts..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      <div className="contacts-search-icon">
  <FaSearch />
</div>
    </div>
        </div>
        </>
);
};

export default Contacts;
