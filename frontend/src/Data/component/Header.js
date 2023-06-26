import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faBars,
  faHome,
  faAddressBook,
  faComments,
  faList,
  faExclamationTriangle,
  faMobileScreenButton,
  faUser,
  faTimes,
  faCommentsquestion,
  faBookOpen,
  faBookOpenReader,
} from '@fortawesome/free-solid-svg-icons';
import './header.css';
import logoImage from '../../assets/images/logo2.png';

const Header = ({ ribbonMessage }) => {
  const [isDrawerOpen, setIsDrawerOpen]   = useState(false);

  const handleDrawerClick = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  return (
    <div className                        = "header-container">
      <header className                   = "header">
        <div className                    = "logo">
          <img src                        = {logoImage} alt="Logo" />
        </div>
        <div className                    = "header-title">
        <h1>Highway Bus Management System</h1>
        </div>
        <div className                    = "ribbon">
          <span>{ribbonMessage}</span>
        </div>
      </header>

      <nav className                      = {`navbar ${isDrawerOpen ? 'open' : ''}`}>
        <ul>
          <li>
            <div className                = "icon" onClick={handleDrawerClick}>
              <FontAwesomeIcon icon       = {faBars} />
            </div>
          </li>

          <Link to                        = "/">
            <li>
              <a href                     = "#">
                <FontAwesomeIcon icon     = {faHome} className="icon" beat /> Home
              </a>
            </li>
          </Link>

          <Link to                        = "/Contacts">
            <li>
              <a href                     = "#">
                <FontAwesomeIcon icon     = {faAddressBook} className="icon" beat /> Contacts
              </a>
            </li>
          </Link>
          <Link to                        = "/FAQ">
            <li>
              <a href                     = "#">
                <FontAwesomeIcon icon     = {faComments} className="icon" beat /> FAQ
              </a>
            </li>
          </Link>

          <Link to                        = "/Complain">
            <li>
              <a href                     = "#">
                <FontAwesomeIcon icon     = {faBookOpenReader} className="icon" beat /> Complaints
              </a>
            </li>
          </Link>

          <Link to                        = "/Log">
            <li>
              <a href                     = "#">
                <FontAwesomeIcon icon     = {faList} className="icon" beat /> Log
              </a>
            </li>
          </Link>

          <Link to                        = "/ViewComplain">
            <li>
              <a href                     = "#">
                <FontAwesomeIcon icon     = {faExclamationTriangle} className="icon" beat /> View Complain
              </a>
            </li>
          </Link>

          <Link to                        = "/MobileApp">
            <li>
              <a href                     = "#">
                <FontAwesomeIcon icon     = {faMobileScreenButton} className="icon" beat /> MobileApp edit
              </a>
            </li>
          </Link>
        </ul>

        <div className                    = "profile-icon">
          <FontAwesomeIcon icon           = {faUser} beat />
        </div>
      </nav>
    </div>
  );
};

export default Header;
