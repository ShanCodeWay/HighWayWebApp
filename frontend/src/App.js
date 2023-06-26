import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import logo from './logo.svg';
import './App.css';
import ViewComplain from './pages/ViewComplain';
import Complain from './pages/Complain';
import Log from './pages/Log'; 
import MobileApp from './pages/MobileApp';
import Contacts from './pages/Contacts';
import FAQ from './pages/FAQ';
import EditContacts from './pages/EditContacts';

import Header from './Data/component/Header';
import Footer from './Data/component/Footer';
import Editfaq from './pages/Editfaq';
import 'bootstrap/dist/css/bootstrap.css';
import admin from './assets/images/admin.jpg';
import sound from './assets/images/soundwave.png';





function Home() {
  return (
    <div className                                      = "home-container">
      <h1 className                                     = "display-4">Welcome to the HBMS </h1>
      <div className                                    = "home-content">
      <p className                                      = "lead">We provide an efficient and reliable platform for managing and organizing bus
       transportation on highways. Whether you're a bus operator, a traveler, or a 
       transportation authority, our system is designed to streamline operations, enhance passenger 
       experience, and ensure seamless communication..</p>
    </div>
      <div className                                    = "header-admin">
          <img src                                      = {admin} alt="Logo" />
        </div>

        <div className                                  = "header-sound">
          <img src                                      = {sound} alt="Logo" />
        </div>
      <Link to                                          = "/Complain">
        <button className                               = "btn btn-primary">Click Me</button>
      </Link>
      <div className                                    = "middle"></div>
    </div>
  );
}

function RibbonMessageProvider() {
  const location                                        = useLocation();

  
  let ribbonMessage                                     = 'Welcome';
  if (location.pathname === '/Complain') {
    ribbonMessage                                       = 'Complain Page';
  } else if (location.pathname === '/Log') {
    ribbonMessage                                       = 'Log Page';
  } else if (location.pathname === '/MobileApp') {
    ribbonMessage                                       = 'MobileApp Edit Page';
    
  } else if (location.pathname === '/ViewComplain') {
    ribbonMessage                                       = 'ViewComplain Page';
  } else if (location.pathname === '/Contacts') {
    ribbonMessage                                       = 'Contacts Page';
  } else if (location.pathname === '/EditContacts') {
    ribbonMessage                                       = 'Edit Contacts Page';
  }
  else if (location.pathname === '/FAQ') {
    ribbonMessage                                       = 'FAQ Page';
  }
  else if (location.pathname === '/Editfaq') {
    ribbonMessage                                       = 'Edit FAQ page';
  }


  return <Header ribbonMessage                          = {ribbonMessage} />;
}

function App() {
 
  const [isProfileDrawerOpen, setIsProfileDrawerOpen]   = useState(false);
  const [isDrawerOpen, setIsDrawerOpen]                 = useState(false);

  const handleProfileDrawerClick = () => {
    setIsProfileDrawerOpen(!isProfileDrawerOpen);
  };

  return (
    <>
   

     

      <Routes>
        <Route path                                     = "/" element={<Home />} />
        <Route path                                     = "/ViewComplain" element={<ViewComplain />} />
        <Route path                                     = "/Complain" element={<Complain />} />
        <Route path                                     = "/Log" element={<Log />} />
        <Route path                                     = "/MobileApp" element={<MobileApp />} />
        <Route path                                     = "/Contacts" element={<Contacts />} />
        <Route path                                     = "/FAQ" element={<FAQ />} />
        <Route path                                     = "/EditContacts" element={<EditContacts />} />
        <Route path                                     = "/Editfaq" element={<Editfaq />} />
      </Routes>
     
      <Footer />
    </>
  );
}

function AppWithRouter() {
  return (
    <Router>
      <RibbonMessageProvider />
      <App />
    </Router>
  );
}

export default AppWithRouter;
