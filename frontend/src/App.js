import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import logo from './logo.svg';
import './App.css';
import ViewComplain from './pages/ViewComplain';
import Complain from './pages/Complain';
import Log from './pages/LogCompalin'; // Corrected import
import MobileApp from './pages/MobileApp';
import Contacts from './pages/Contacts';
import FAQ from './pages/FAQ';
import EditContacts from './pages/EditContacts';
import Navbar from './Data/component/Navbar';
import Header from './Data/component/Header';
import Footer from './Data/component/Footer';
import Editfaq from './pages/Editfaq';
// Rest of the code...


// Rest of the code...


function Home() {
  return (
    <div className="home-container">
      <h1 className="home-title">Welcome to the Home Page</h1>
      <p className="home-content">This is the content of the home page.</p>
      <Link to="/Complain">
        <button className="home-button">Click Me</button>
      </Link>
      <div className="middle"></div>
    </div>
    
  );
}

function RibbonMessageProvider() {
  const location = useLocation(); // Get the current location

  // Determine the ribbon message based on the current location
  let ribbonMessage = 'Welcome to the Home Page';
  if (location.pathname === '/Complain') {
    ribbonMessage = 'Complain Page';
  } else if (location.pathname === '/Log') {
    ribbonMessage = 'Log Page';
  } else if (location.pathname === '/MobileApp') {
    ribbonMessage = 'MobileApp Edit Page';
    
  } else if (location.pathname === '/ViewComplain') {
    ribbonMessage = 'ViewComplain Page';
  } else if (location.pathname === '/Contacts') {
    ribbonMessage = 'Contacts Page';
  } else if (location.pathname === '/EditContacts') {
    ribbonMessage = 'Edit Contacts Page';
  }
  else if (location.pathname === '/FAQ') {
    ribbonMessage = 'FAQ Page';
  }
  else if (location.pathname === '/Editfaq') {
    ribbonMessage = 'Edit FAQ page';
  }


  return <Header ribbonMessage={ribbonMessage} />;
}

function App() {
  // State and handler functions for profile drawer and mobile drawer
  const [isProfileDrawerOpen, setIsProfileDrawerOpen] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const handleProfileDrawerClick = () => {
    setIsProfileDrawerOpen(!isProfileDrawerOpen);
  };

  return (
    <>
      <Navbar
        isProfileDrawerOpen={isProfileDrawerOpen}
        handleProfileDrawerClick={handleProfileDrawerClick}
        isDrawerOpen={isDrawerOpen}
        setIsDrawerOpen={setIsDrawerOpen}
      />

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

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/ViewComplain" element={<ViewComplain />} />
        <Route path="/Complain" element={<Complain />} />
        <Route path="/Log" element={<Log />} />
        <Route path="/MobileApp" element={<MobileApp />} />
        <Route path="/Contacts" element={<Contacts />} />
        <Route path="/FAQ" element={<FAQ />} />
        <Route path="/EditContacts" element={<EditContacts />} />
        <Route path="/Editfaq" element={<Editfaq />} />
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
