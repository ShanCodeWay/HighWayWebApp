import React from 'react';
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







const Navbar = ({ isProfileDrawerOpen, handleProfileDrawerClick, isDrawerOpen, setIsDrawerOpen }) => {
  return (
    <nav className="navbar">
      <ul>
        <li>
          <div className="icon" onClick={() => setIsDrawerOpen(!isDrawerOpen)}>
            <FontAwesomeIcon icon={faBars} />
          </div>
        </li>

        <Link to="/">
          <li>
            <a href="#">
              <FontAwesomeIcon icon={faHome} className="icon" beat /> Home
            </a>
          </li>
        </Link>

        <Link to="/Contacts">
          <li>
            <a href="#">
              <FontAwesomeIcon icon={faAddressBook} className="icon" beat /> Contacts
            </a>
          </li>
        </Link>
        <Link to="/FAQ">
          <li>
            <a href="#">
              <FontAwesomeIcon icon={faComments} className="icon" beat /> FAQ
            </a>
          </li>
        </Link>

        <Link to="/Complain">
          <li>
            <a href="#">
              <FontAwesomeIcon icon={faBookOpenReader} className="icon" beat /> Complaints
            </a>
          </li>
        </Link>

        <Link to="/Log">
          <li>
            <a href="#">
              <FontAwesomeIcon icon={faList} className="icon" beat /> Log
            </a>
          </li>
        </Link>

        <Link to="/ViewComplain">
          <li>
            <a href="#">
              <FontAwesomeIcon icon={faExclamationTriangle} className="icon" beat /> View Complain
            </a>
          </li>
        </Link>

        <Link to="/MobileApp">
          <li>
            <a href="#">
              <FontAwesomeIcon icon={faMobileScreenButton} className="icon" beat /> MobileApp edit
            </a>
          </li>
        </Link>
      </ul>

      <div className="profile-icon" onClick={handleProfileDrawerClick}>
        <FontAwesomeIcon icon={isProfileDrawerOpen ? faTimes : faUser} beat />
      </div>
    </nav>
  );
};

export default Navbar;
