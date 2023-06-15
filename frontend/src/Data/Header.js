import React from 'react';
import logoImage from '.././assets/images/logo.png';

const Header = ({ ribbonMessage }) => {
  return (
    <header className="header">
      <div className="logo">
        <img src={logoImage} alt="Logo" />
      </div>
      <h1>Highway Bus Management System</h1>
      <div className="ribbon">
        <span>{ribbonMessage}</span>
      </div>
    </header>
  );
};

export default Header;
