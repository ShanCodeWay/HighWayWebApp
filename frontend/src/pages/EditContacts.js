import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './css/EditContacts.css';

import 'react-toastify/dist/ReactToastify.css';
import ErrorModal from "../Data/component/ErrorModal.js";
import SuccessModal from "../Data/component/SuccessModal.js";
import { faMobileScreenButton } from '@fortawesome/free-solid-svg-icons';





const EditContacts = () => {
 
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


 

    const handleModalClose = () => {
      setSuccessVisible(false);
      setKey('');
    };



      return (
        <>
    
<div className="EditContacts-body">

     

     
      <div className="EditContacts-container">
      

       

       
          </div>
       
<div className='complaint-right'>
      
        <div className="complaint-datetime-container">
          <span className="complaint-date-text">{formatDate(dateTime)}</span>
          <span className="complaint-time-text">{formatTime(dateTime)}</span>
        </div>
      
        </div>

 </div>
  </>
);
};

export default EditContacts;
