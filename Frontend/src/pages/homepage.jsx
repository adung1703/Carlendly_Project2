import React from 'react';
import Navbar from './navbar';

function Homepage() {

  return (
    <div className="homepage">
      <Navbar></Navbar>
      <div className="container">
        <div className="background">
          <img src="../public/images/background.jpg" alt="" />
        </div>
        <div className="index_1">
          Easy scheduling with Calendly
        </div>
        <div className="index_2">
          Calendly is your scheduling automation platform for eliminating the back-and-forth emails to find the perfect time — and so much more.
        </div>
      </div>
    </div>
  );
}

export default Homepage;
