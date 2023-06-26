import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Routes, Route, Link,  } from 'react-router-dom';
import './css/MobileApp.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { faQuestionCircle, faAddressBook } from '@fortawesome/free-solid-svg-icons';
import faqphoto from '../assets/images/pagevector/faq.jpg';
import contactphoto from '../assets/images/pagevector/complain.jpg'; 
import ImageSlider from '../Data/component/ImageSlider';




const MobileApp = () => {
 
  const [isLoading, setIsLoading]                       = useState(false);
  const [errorVisible, setErrorVisible]                 = useState(false);
  const [errorMessage, setErrorMessage]                 = useState('');
  const [successVisible, setSuccessVisible]             = useState(false);
  
  const [key, setKey]                                   = useState('');
  
  const [dateTime, setDateTime]                         = useState(new Date());
  const [isDrawerOpen, setIsDrawerOpen]                 = useState(false);

  const [isProfileDrawerOpen, setIsProfileDrawerOpen]   = useState(false);

 
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
    const options                                       = { year: 'numeric', month: 'long', day: 'numeric' };
    return date.toLocaleDateString(undefined, options);
  };

  const formatTime = (date) => {
    const options                                       = { hour: 'numeric', minute: 'numeric', second: 'numeric' };
    return date.toLocaleTimeString(undefined, options);
  };


  const faqimages = [
    require('../assets/images/FAQphoto/highwaybus.jpg'),
    require('../assets/images/FAQphoto/highway bus.jpg'),
    require('../assets/images/FAQphoto/highwaybus1.JPG'),
    require('../assets/images/FAQphoto/highwaybusctb.JPG'),
    require('../assets/images/FAQphoto/images.jfif'),
    require('../assets/images/FAQphoto/makumbura.jpg'),
    require('../assets/images/FAQphoto/slider2.jpg'),
    require('../assets/images/FAQphoto/z_p06-Road-05.jpg'),
    require('../assets/images/FAQphoto/bus-on-map-with-location-pins.png'),
    require('../assets/images/FAQphoto/bus-stations-map-with-red-push-pin-in-front-of-big-white-coach-tour-bus-on-a-white-background-3d-rendering-2C4YFPM.jpg'),
   
  ];

 


      return (
        <>
        <div className                                  = 'mobileapp-body'>
     <div className                                     = 'mobileapp-container'>



   

      <div className                                    = "mobileapp-button-container">
      
      <img src                                          = {faqphoto} alt="Image" className="mobileapp-image" />
      <Link to                                          = "/Editfaq" className="mobileapp-button">

      <FontAwesomeIcon icon                             = { faQuestionCircle} className="mobileapp-faq-button" beat />
        <span>Edit FAQ</span>
      </Link>

      </div>

      <div className                                    = "mobileapp-button-container">
      <img src                                          = {contactphoto} alt="Image" className="mobileapp-image" />
      <Link to                                          = "/EditContacts" className="mobileapp-button">
        <FontAwesomeIcon icon                           = {faAddressBook} className="mobileapp-contact-button" beat />
        <span>Edit Contacts</span>
      </Link>
        </div>

        <div className                                  = "mobileapp-right-container">
        <div className                                  = "mobileapp-datetime-container">
          <span className                               = "mobileapp-date-text">{formatDate(dateTime)}</span>
          <span className                               = "mobileapp-time-text">{formatTime(dateTime)}</span>
        </div>
        <div className                                  = "faq-image">
                  <ImageSlider images                   = {faqimages} width="100%" height="100%" border-radius="50px" />
                
                  </div>
        </div>

        </div>
        </div>  
  </>
);
};

export default MobileApp;
