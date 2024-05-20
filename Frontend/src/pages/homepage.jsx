import React, { useEffect, useState } from 'react';
import {Link, useLocation } from 'react-router-dom';

function homepage() {
  const location = useLocation();
  const [username, setUsername] = useState('');

  useEffect(() => {
    // Extract username from token stored in localStorage
    const token = localStorage.getItem('token');
    if (token) {
      console.log(token);
      const decodedToken = JSON.parse(atob(token.split('.')[1]));
      console.log(decodedToken);
      setUsername(decodedToken.username);
    }
  }, [location]);


  return (
    <div class="homepage">
    <div class="header">
      <div class="logo">
        <img src="../public/images/logo.png" alt=""></img>
      </div>
      <div class="create_n_join"> 
       <div class="create">
        <button class="button"> <Link to="/create">Create</Link></button>
       </div>
       <div class="join">
        <button class="button"><a href="">Join</a></button>
       </div>
      </div>
      <div class="option">  
        <div class="My_schedule">
          <a href="">My scheduled events</a>
        </div>
        <div class="about">
          <a href="">About</a>
        </div>
      </div>  
      <div class="acc_n_notice">
        <div class="acc">
          <div class="avt">
            <img src="../public/images/avt.webp" alt="" width="60px" height="60px"></img>
          </div>
          <div class="acc_name">
            {username}
          </div>
        </div>

        <div id="notification-bell-container">
          <div id="notification-bell">
              <span class="bell-icon">
                <img src="../public/images/bell.webp" alt="" width="44px" height="44px"></img>
              </span>
              <span id="notification-count" class="count">0</span>
          </div>
        <div id="notification-list" class="hidden">
            
        </div>
    </div>
      </div>
    </div>
    <div class="container">
      <div class="background">  
        <img src="../public/images/background.jpg" alt=""></img>
      </div>
      <div class="index_1">
        Easy scheduling with Calendly
      </div>
      <div class="index_2">
        Calendly is your scheduling automation platform for eliminating the back-and-forth emails to find the perfect time — and so much more.
      </div>
    </div>
   </div>
  )
}

export default homepage;