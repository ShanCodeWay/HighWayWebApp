import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './css/MobileApp.css';

import { FaQuestionCircle, FaAddressBook } from 'react-icons/fa';





const MobileApp = () => {
 
  const [isLoading, setIsLoading] = useState(false);
  const [errorVisible, setErrorVisible] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [successVisible, setSuccessVisible] = useState(false);
  
  const [key, setKey] = useState('');
  
  const [dateTime, setDateTime] = useState(new Date());
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const [isProfileDrawerOpen, setIsProfileDrawerOpen] = useState(false);

 
  const handleProfileDrawerClick = () => {
    setIsProfileDrawerOpen(!isProfileDrawerOpen);
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
        <div className='mobileapp-body'>
     
      <div className="mobileapp-container">
      
        <div className="mobileapp-datetime-container">
          <span className="mobileapp-date-text">{formatDate(dateTime)}</span>
          <span className="mobileapp-time-text">{formatTime(dateTime)}</span>
        </div>
      
       
        <div>
      <Link to="/Editfaq" className="mobileapp-button">
        <FaQuestionCircle className="mobileapp-button" />
        <span>Edit FAQ</span>
      </Link>
      <Link to="/EditContacts" className="mobileapp-button">
        <FaAddressBook className="mobileapp-button" />
        <span>Edit Contacts</span>
      </Link>
    </div>




        </div>


        </div>  
  </>
);
};

export default MobileApp;
