import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

function Home() {
  return (
   
    <div className="container">
    <div className="content">
      <div className="about-container">
        <h1 className="about-title">Welcome ryururuyto the About Page</h1>
        <p className="about-content">This is the content ryryryurof the about page.</p>
        <Link to="/">
          <button className="home-button">Click Me</button>
        </Link>
      </div>
    </div>
    <div className="footer"></div>
  </div>

   

    
  );
}

export default Home;
