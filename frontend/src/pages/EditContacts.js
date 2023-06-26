import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './css/EditContacts.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUpload, faUserEdit, faTrash } from '@fortawesome/free-solid-svg-icons';

const contactsPerPage                             = 4;

const EditContacts = () => {
  const [searchTerm, setSearchTerm]               = useState('');
  const [selectedLanguage, setSelectedLanguage]   = useState('en');
  const [currentPage, setCurrentPage]             = useState(1);
  const [contacts, setContacts]                   = useState([]);
  const [newContact, setNewContact] = useState({
    name                                          : '',
    phone                                         : '',
    latitude                                      : 0,
    longitude                                     : 0,
  });
  const [editingContact, setEditingContact]       = useState(null);
  const [currentContacts, setCurrentContacts]     = useState([]);

  useEffect(() => {
    fetchContacts();
  }, [selectedLanguage]);



  useEffect(() => {
    const indexOfLastContact                      = currentPage * contactsPerPage;
    const indexOfFirstContact                     = indexOfLastContact - contactsPerPage;
    const currentContacts                         = contacts.slice(indexOfFirstContact, indexOfLastContact);
    setCurrentContacts(currentContacts);
  }, [contacts, currentPage]);


  const handleLanguageSelect = (language) => {
    setSelectedLanguage(language);
    setCurrentPage(1); // Reset current page when language is changed
  };
  
  const fetchContacts = async () => {
    try {
      const response                              = await axios.get(`http://192.168.8.141:4000/api/${selectedLanguage === 'en' ? 'encontacts' : selectedLanguage === 'si' ? 'sicontacts' : 'tacontacts'}`);
      setContacts(response.data);
    } catch (error) {
      console.error(error);
    }
  };
  

  const handleNameChange = (event) => {
    setNewContact({ ...newContact, name           : event.target.value });
  };

  const handlePhoneChange = (event) => {
    setNewContact({ ...newContact, phone          : event.target.value });
  };

  const handleLatitudeChange = (event) => {
    setNewContact({ ...newContact, latitude       : parseFloat(event.target.value) });
  };

  const handleLongitudeChange = (event) => {
    setNewContact({ ...newContact, longitude      : parseFloat(event.target.value) });
  };

  const handleAddContact = async () => {
    try {
      const response                              = await axios.post(`http://192.168.8.141:4000/api/${selectedLanguage === 'en' ? 'encontacts' : selectedLanguage === 'si' ? 'sicontacts' : 'tacontacts'}`, newContact);
      console.log(response.data);
      setNewContact({ name                        : '', phone: '', latitude: 0, longitude: 0 });
      fetchContacts();
    } catch (error) {
      console.error(error);
    }
  };
  

  const handleDeleteContact = async (id) => {
    try {
      await axios.delete(`http://192.168.8.141:4000/api/${selectedLanguage === 'en' ? 'encontacts' : selectedLanguage === 'si' ? 'sicontacts' : 'tacontacts'}/${id}`);
      fetchContacts();
    } catch (error) {
      console.error(error);
    }
  };
  

  const handleUpdateContact = async (id) => {
    try {
      const response                              = await axios.put(`http://192.168.8.141:4000/api/${selectedLanguage === 'en' ? 'encontacts' : selectedLanguage === 'si' ? 'sicontacts' : 'tacontacts'}/${id}`, newContact);
      console.log(response.data);
      setNewContact({ name                        : '', phone: '', latitude: 0, longitude: 0 });
      setEditingContact(null);
      fetchContacts();
    } catch (error) {
      console.error(error);
    }
  };
  

  const handleEditContact = (contact) => {
    setEditingContact(contact._id);
    setNewContact({
      name                                        : contact.name,
      phone                                       : contact.phone,
      latitude                                    : contact.latitude,
      longitude                                   : contact.longitude,
    });
  };

  const handleCancelEdit = () => {
    setEditingContact(null);
    setNewContact({ name                          : '', phone: '', latitude: 0, longitude: 0 });
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };
  
  const filteredContacts                          = searchTerm
  ? contacts.filter((contact) => contact.name.toLowerCase().includes(searchTerm.toLowerCase()))
                                                  : currentContacts;

  return (
   
   <div className                                 = 'EditContacts-container'>
     
    

 <div className                                   = 'EditContacts-left-container'>
 <div className                                   = 'EditContacts-language'>
            <button onClick                       = {() => handleLanguageSelect('en')} className={`EditContacts-language-button ${selectedLanguage === 'en' ? 'active' : ''}`}>
              English
            </button>
            <button onClick                       = {() => handleLanguageSelect('si')} className={`EditContacts-language-button ${selectedLanguage === 'si' ? 'active' : ''}`}>
            සිංහල
            </button>
            <button onClick                       = {() => handleLanguageSelect('ta')} className={`EditContacts-language-button ${selectedLanguage === 'ta' ? 'active' : ''}`}>
            தமிழ்
            </button>
    </div>
        <div className                            = 'EditContacts-content'>
          <h1 className                           = 'EditContacts-title'> Add/Edit Contact</h1>
          <h2 className                           = 'EditContacts-section-title'>Contact Details:</h2>
          <div className                          = 'EditContacts-input-container'>
            
          </div>
          <div className                          = 'EditContacts-input-container'>
            <label className                      = 'EditContacts-label' htmlFor="nameInput">Name:</label>
            <input
              id                                  = "nameInput"
              className                           = 'EditContacts-input'
              type                                = 'text'
              value                               = {newContact.name}
              onChange                            = {handleNameChange}
              placeholder                         = 'Enter Checkpoint'
            />
          </div>
          <div className                          = 'EditContacts-input-container'>
            <label className                      = 'EditContacts-label' htmlFor="phoneInput">Phone:</label>
            <input
              id                                  = "phoneInput"
              className                           = 'EditContacts-input'
              type                                = 'text'
              value                               = {newContact.phone}
              onChange                            = {handlePhoneChange}
              placeholder                         = 'Enter Phone Number'
            />
          </div>
          <div className                          = 'EditContacts-input-container'>
            <label className                      = 'EditContacts-label' htmlFor="latitudeInput">Latitude:</label>
            <input
              id                                  = "latitudeInput"
              className                           = 'EditContacts-input'
              type                                = 'number'
              value                               = {newContact.latitude}
              onChange                            = {handleLatitudeChange}
              placeholder                         = 'Enter Latitude'
            />
          </div>
          <div className                          = 'EditContacts-input-container'>
            <label className                      = 'EditContacts-label' htmlFor="longitudeInput">Longitude:</label>
            <input
              id                                  = "longitudeInput"
              className                           = 'EditContacts-input'
              type                                = 'number'
              value                               = {newContact.longitude}
              onChange                            = {handleLongitudeChange}
              placeholder                         = 'Enter Longitude'
            />
          </div>
         

          {editingContact ? (
            <>
              <button className                   = 'EditContacts-update-button' onClick={() => handleUpdateContact(editingContact)}>
                <FontAwesomeIcon icon             = {faUserEdit} className='EditContacts-icon' beat/> Update
              </button>
              <button className                   = 'EditContacts-cancel-button' onClick={handleCancelEdit}>
                <FontAwesomeIcon icon             = {faTrash} className='EditContacts-icon' beat/> Cancel
              </button>
            </>
          )                                       : (
            <button className                     = 'EditContacts-add-button'  onClick={handleAddContact}>
              <FontAwesomeIcon icon               = {faUserEdit} className='EditContacts-icon' beat/> Add Contact
            </button>
          )}
        </div>
      </div>


      <div className                              = 'EditContacts-right-container'>

        {/* Display existing contacts */}
       
        <div className                            = 'EditContacts-search-bar'>
          <input
            type                                  = 'text'
            placeholder                           = 'Existing Contacts Search by name...'
            value                                 = {searchTerm}
            onChange                              = {handleSearchChange}
            className                             = 'EditContacts-search-input'
            style                                 = {{ width: '400px' }}
          />
        </div>
        <div className                            = 'EditContacts-contacts-container'>
        {filteredContacts.map((contact) => ( 
            <div className                        = 'EditContacts-contact' key={contact._id}>
              <div className                      = 'EditContacts-contact-details'>
                
                <p>Name                           : {contact.name}</p>
                <p>Phone                          : {contact.phone}</p>
                <p>Latitude                       : {contact.latitude}</p>
                <p>Longitude                      : {contact.longitude}</p>
              </div>
              <div className                      = 'EditContacts-contact-buttons' >
                <button className                 = 'EditContacts-edit-button' onClick={() => handleEditContact(contact)}>
                  <FontAwesomeIcon icon           = {faUserEdit} className='EditContacts-icon' beat /> Edit
                </button>
                <button className                 = 'EditContacts-delete-button' onClick={() => handleDeleteContact(contact._id)}>
                  <FontAwesomeIcon icon           = {faTrash} className='EditContacts-icon' flip/> Delete
                </button>
              </div>
            </div>
            
            
           ))}
             {/* Pagination */}
             <div className                       = 'EditContacts-pagination'>
             <button
               className                          = 'EditContacts-pagination-button'
               disabled                           = {currentPage === 1}
               onClick                            = {() => handlePageChange(currentPage - 1)}
             >
               Previous
             </button>
             <div className                       = 'EditContacts-pagination-numbers'>
               {Array(Math.ceil(contacts.length / contactsPerPage))
                 .fill()
                 .map((_, index) => (
                   <button
                     key                          = {index}
                     className                    = {`EditContacts-pagination-number ${currentPage === index + 1 ? 'active' : ''}`}
                     onClick                      = {() => handlePageChange(index + 1)}
                   >
                     {index + 1}
                   </button>
                 ))}
             </div>
             <button
               className                          = 'EditContacts-pagination-button'
               disabled                           = {currentPage === Math.ceil(contacts.length / contactsPerPage)}
               onClick                            = {() => handlePageChange(currentPage + 1)}
             >
               Next
             </button>
           </div>
           </div>
     
         
      </div>
    </div>
  );
};

export default EditContacts;
