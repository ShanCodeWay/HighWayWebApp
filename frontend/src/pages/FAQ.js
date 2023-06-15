import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './css/Complain.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { faCheckSquare } from '@fortawesome/free-solid-svg-icons';
import { faStickyNote } from '@fortawesome/free-solid-svg-icons';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { faAddressBook,faHome, faComments, faList, faBars, faTimes, faAngleDown, faAngleUp, faTrashAlt, faExclamationTriangle, faSync  } from '@fortawesome/free-solid-svg-icons';
import logoImage from '../assets/images/logo.png';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ErrorModal from "../Data/ErrorModal.js";
import SuccessModal from "../Data/SuccessModal.js";
import { faMobileScreenButton } from '@fortawesome/free-solid-svg-icons';





const FAQ = () => {
 
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
      


     

     
      <div className="complain-container">
      
     


      





     
    

        <div className='complaint-left' >

        <h2>MobileApp page</h2>
        <p>This is MobileApp page</p>

        </div>

       

       
          </div>
       
<div className='complaint-right'>
      
        <div className="complaint-datetime-container">
          <span className="complaint-date-text">{formatDate(dateTime)}</span>
          <span className="complaint-time-text">{formatTime(dateTime)}</span>
        </div>
      
        </div>

    <footer className="footer">
      <p>&copy; 2023 Highway Bus Management System Web App. All rights reserved.</p>
    </footer>
  </>
);
};

export default FAQ;
