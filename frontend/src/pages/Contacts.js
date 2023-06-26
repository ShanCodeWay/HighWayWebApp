import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaPlus, FaMinus, FaSearch } from 'react-icons/fa';
import './css/Contacts.css';
import ImageSlider from '../Data/component/ImageSlider';
import ContactModal from '../Data/component/ContactModal.js';

const Contacts = () => {
  const [searchQuery, setSearchQuery]               = useState('');
  const [selectedContact, setSelectedContact]       = useState(null);
  const [dateTime, setDateTime]                     = useState(new Date());
  const [filteredContacts, setFilteredContacts]     = useState([]);
  const [allContacts, setAllContacts]               = useState([]);

  const [selectedLanguage, setSelectedLanguage]     = useState('en'); // Default language is English ('en')

  const contactsimages = [
    require('../assets/images/Highwayphoto/Kadawatha1.png'),
    require('../assets/images/Highwayphoto/Kadawatha2.png'),
    require('../assets/images/Highwayphoto/Kadawatha3.png'),
    require('../assets/images/Highwayphoto/Kaduwela1.png'),
    require('../assets/images/Highwayphoto/Kaduwela2.png'),
  ];

  const fetchContacts = async () => {
    try {
      const response                                = await axios.get(`http://192.168.8.141:4000/api/${selectedLanguage}contacts`);
      setFilteredContacts(response.data);
      setAllContacts(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchContacts();
  }, [selectedLanguage]);

  const openModal = (contact) => {
    setSelectedContact(contact);
  };

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
    const options                                   = { year: 'numeric', month: 'long', day: 'numeric' };
    return date.toLocaleDateString(undefined, options);
  };

  const formatTime = (date) => {
    const options                                   = { hour: 'numeric', minute: 'numeric', second: 'numeric' };
    return date.toLocaleTimeString(undefined, options);
  };

  const handleSearch = async (e) => {
    setSearchQuery(e.target.value);
    const searchTerm                                = e.target.value.toLowerCase();

    if (searchTerm === '') {
      setFilteredContacts(allContacts);
    } else {
      const filtered = allContacts.filter((contact) => {
        return (
          contact.name.toLowerCase().includes(searchTerm) ||
          contact.phone.toLowerCase().includes(searchTerm)
        );
      });
      setFilteredContacts(filtered);
    }
  };

  return (
    <>
      <div className                                = "contacts-container">
        <div className                              = "contacts-grid">
          {filteredContacts.map((contact) => (
            <div className                          = "contacts-card" key={contact.id} onClick={() => openModal(contact)}>
              <div className                        = "contacts-details">
                <h3>{contact.name}</h3>
                <p>{contact.phone}</p>
              </div>
            </div>
          ))}
        </div>

        {selectedContact && <ContactModal contact   = {selectedContact} closeModal={closeModal} />}

        <div className                              = "contacts-right">
          
          <div className                            = "contacts-language">
          <button
            onClick                                 = {() => setSelectedLanguage('en')}
            className                               = {`contacts-language-button ${selectedLanguage === 'en' ? 'active' : ''}`}
          >
            English
          </button>
          <button
            onClick                                 = {() => setSelectedLanguage('si')}
            className                               = {`contacts-language-button ${selectedLanguage === 'si' ? 'active' : ''}`}
          >
            සිංහල
          </button>
          <button
            onClick                                 = {() => setSelectedLanguage('ta')}
            className                               = {`contacts-language-button ${selectedLanguage === 'ta' ? 'active' : ''}`}
          >
            தமிழ்
          </button>
          </div>

          <div className                            = "contacts-datetime-container">
            <span className                         = "contacts-date-text">{formatDate(dateTime)}</span>
            <span className                         = "contacts-time-text">{formatTime(dateTime)}</span>
          </div>

          <div className                            = "contacts-search-container">
            <input
              className                             = "contacts-search-input"
              type                                  = "text"
              placeholder                           = "Search contacts..."
              value                                 = {searchQuery}
              onChange                              = {handleSearch}
            />
            <FaSearch className                     = "contacts-search-icon" beat />
          </div>

          <div className                            = "contacts-image">
            <ImageSlider images                     = {contactsimages} width="100%" height="100%" border-radius="50px" />
          </div>
        </div>
      </div>
    </>
  );
};

export default Contacts;
