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
import { faMobileScreenButton } from '@fortawesome/free-solid-svg-icons';

import logoImage from '../assets/images/logo.png';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ErrorModal from "../Data/ErrorModal.js";
import SuccessModal from "../Data/SuccessModal.js";






const Complaints = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [complainType, setComplainType] = useState('');
  const [complain, setComplain] = useState('');
  const [image, setImage] = useState('');
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


  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };
  

    // Create a FormData object to send the form data including the image
    const handleSubmit = async () => {
      // Check if any of the fields are empty
      if (!name || !email || !complainType || !complain) {
        setErrorVisible(true);
        setErrorMessage('Please fill out all fields before submitting your complaint.');
      } else if (!validateEmail(email)) {
        setErrorVisible(true);
        setErrorMessage('Please enter a valid email address.');
      } else {
        // Set loading state to true
        setIsLoading(true);
  
        try {
          // Create a new instance of FormData
          const formData = new FormData();
  
          // Append the image file to the form data
          if (image) {
            const fileExtension = image.split('.').pop();
            formData.append('image', {
              uri: image,
              name: `image.${fileExtension}`,
              type: `image/${fileExtension}`,
            });
          }
  
          // Append the form data fields to the form data object
          formData.append('name', name);
          formData.append('email', email);
          formData.append('complainType', complainType);
          formData.append('complain', complain);
  
          // Send POST request to backend API with form data object
          axios
            .post('http://192.168.8.141:4000/api/data', formData, {
              headers: {
                'Content-Type': 'multipart/form-data',
              },
            })
            .then((response) => {
              console.log(response.data);
              // Show success modal with ID
              const key = response.data.uniqueKey;
              setKey(key);
              setSuccessVisible(true);
            })
            .catch((error) => {
              console.error(error);
              setErrorVisible(true);
              setErrorMessage(
                'An error occurred while submitting your complaint. Please try again later.'
              );
            });
  
          // Clear all input fields
          setName('');
          setEmail('');
          setComplainType('');
          setComplain('');
          setImage('');
        } catch (error) {
          setErrorVisible(true);
          setErrorMessage('An error occurred while submitting your complaint. Please try again later.');
        }
  
        // Set loading state back to false
        setIsLoading(false);
      }
    };
  
    const handleImagePick = () => {
      // Implement image picking logic here
    };
 

    const handleModalClose = () => {
      setSuccessVisible(false);
      setKey('');
    };



      return (
        <>
        


     

     
      <div className="complain-container">
      
     


      <div className="modal">
  <ErrorModal
    visible={errorVisible}
    setVisible={setErrorVisible}
    onClose={() => setErrorMessage('')}
    animationType="slide"
    backgroundColor="white"
    iconColor="red"
    iconName="close"
    iconAnimationType="shake"
    title="Error !!!"
    message={errorMessage}
  />
  <SuccessModal
    visible={successVisible}
    setVisible={setSuccessVisible}
    onClose={handleModalClose}
    animationType="slide"
    backgroundColor="rgba(255, 255, 255, 0.2)"
    iconColor="green"
    iconName="check-circle"
    key={key}
    iconAnimationType="pulse"
    title="Complaint Successfully !!!"
    message={
      <>
        <p style={{ marginBottom: 10 }}>
          We apologize for the need to submit a complaint. Your concerns have been addressed to the Authority in the Transport.
          Please be assured that we will review your concerns and take the necessary action to resolve the problem. Your complaint No is: 
        </p>
        <button
          style={{ fontWeight: 'bold', fontSize: 34, fontStyle: 'italic', color: 'red' }}
        >
          {key}
        </button>
      </>
    }
  />
</div>






     
      <div className={`ProfileDrawer ${isProfileDrawerOpen ? 'open' : 'close'}`}>
  <ul>
    <li>Account</li>
    <li>Profile</li>
    <li>Sign In</li>
    <li>Sign Up</li>
  </ul>
</div>

<div className={`drawer-menu ${isDrawerOpen ? 'open' : 'close'}`}>
  <ul>
    <li>Instruction</li>
    <li>Contact Numbers</li>
    <li>Details of Operators</li>
    <li>Events</li>
  </ul>
</div>


        <div className='complaint-left' >

        <h2>Complaint page</h2>
        <p>This is Complaint page</p>

        </div>

        <div className="form">
  <div className="complaint-inputContainer">
    <label className="complaint-label">Name</label>
    <input
      className="complaint-input"
      placeholder="Enter your name"
      value={name}
      onChange={(e) => setName(e.target.value)}
    />
  </div>
  <div className="complaint-inputContainer">
    <label className="complaint-label">Email Address</label>
    <input
      className="complaint-input"
      placeholder="Enter your email address"
      value={email}
      onChange={(e) => setEmail(e.target.value)}
      type="email"
      autoComplete="off"
    />
  </div>
  <div className="complaint-inputContainer">
    <label className="complaint-label">Complain Type</label>
    <select
      className="complaint-dropdown"
      value={complainType}
      onChange={(e) => setComplainType(e.target.value)}
    >
      <option value="">Complain list (please select)</option>
      <option value="Incorrect fare charge">Incorrect fare charge</option>
      <option value="Attitude or behavior of staff">Attitude or behavior of staff</option>
      <option value="Personal security">Personal security</option>
      <option value="Reliability and punctuality">Reliability and punctuality</option>
      <option value="Other...">Other...</option>
    </select>
  </div>
  <div className="complaint-inputContainer">
    <label className="complaint-label">Complain</label>
    <div className="complaint-textareaContainer">
      <textarea
        className="complaint-textarea"
        placeholder="Enter your complaint here"
        rows={6}
        value={complain}
        onChange={(e) => setComplain(e.target.value)}
      />
      <div className="complaint-attachmentContainer">
        {image && (
          <div className="complaint-attachment">
            <img src={image} className="complaint-attachmentImage" alt="Attached Image" />
            <button onClick={() => setImage(null)}>
              <span className="complaint-minus-circle" style={{ color: 'red' }}></span>
            </button>
          </div>
        )}
        <button onClick={handleImagePick} style={{ backgroundColor: '#283593' }}>
          <span className="complaint-paperclip"></span>
        </button>
      </div>
    </div>
  </div>

  <button
  className="complaint-submitButton"
  onClick={handleSubmit}
  disabled={isLoading}
  style={{
    backgroundColor: '#283593',
    transition: 'background-color 0.3s ease-in-out',
  }}
  onMouseEnter={(e) => e.target.style.backgroundColor = '#1e2469'}
  onMouseLeave={(e) => e.target.style.backgroundColor = '#283593'}
>
  {isLoading ? 'Submitting...' : 'Submit'}
</button>
</div>



     
    </div>

    <div className=".complaint-ViewButtonContainer">
        <span className=".complaint-eye" style={{ color: 'darkblue' }}></span>
       
    
     

           
         
          <Link to="/ViewComplain">
            <button className="complaint-home-button">Click Me ViewComplain</button>
          </Link>
          <Link to="/">
            <button className="complaint-home-button">Click Me home</button>
          </Link>

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

export default Complaints;
