import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaPlus, FaMinus, FaSearch } from 'react-icons/fa';
import './css/Contacts.css';
import ContactModal from '../Data/component/ContactModal.js';

const Contacts = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedContact, setSelectedContact] = useState(null);
  const [dateTime, setDateTime] = useState(new Date());
  const [filteredContacts, setFilteredContacts] = useState([]);
  const [allContacts, setAllContacts] = useState([]);

  useEffect(() => {
    const fetchContacts = async () => {
      try {
        const response = await axios.get('http://192.168.8.141:4000/api/encontacts');
        setFilteredContacts(response.data);
        setAllContacts(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchContacts();
  }, []);

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

  useEffect(() => {
    const refreshContacts = async () => {
      try {
        const response = await axios.get('http://192.168.8.141:4000/api/encontacts');
        setFilteredContacts(response.data);
        setAllContacts(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    const refreshInterval = setInterval(() => {
      refreshContacts();
    }, 5000); // Refresh every 5 seconds

    return () => {
      clearInterval(refreshInterval);
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

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
    const searchTerm = e.target.value.toLowerCase();

    if (searchTerm === '') {
      setFilteredContacts(allContacts);
    } else {
      const filteredData = allContacts.filter(
        (contact) =>
          contact.name.toLowerCase().includes(searchTerm) ||
          contact.phone.includes(searchTerm)
      );
      setFilteredContacts(filteredData);
    }
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

        <div className="complaint-right">
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
            onChange={handleSearch}
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
