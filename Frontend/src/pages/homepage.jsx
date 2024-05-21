// pages/homepage.jsx
import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';

function Homepage() {
  const location = useLocation();
  const navigate = useNavigate();
  const [displayName, setDisplayName] = useState('');
  const [notifications, setNotifications] = useState([
    { id: 1, message: "You have a new meeting request." },
    { id: 2, message: "Your event has been rescheduled." },
    { id: 3, message: "New comment on your event." },
  ]);
  const [isNotificationListVisible, setIsNotificationListVisible] = useState(false);
  const toggleNotificationList = () => {
    setIsNotificationListVisible(!isNotificationListVisible);
  };

  const handleNotificationClick = (id) => {
    navigate(`/booking/${id}`);
  };

  useEffect(() => {
    const token = localStorage.getItem('token');
    console.log(token);
    if (!token) {
      navigate('/login');
    } else {
      axios.get('http://localhost:3000/api/users/me', {
        headers: {
          "Auth-Token": token,
        }
      })
      .then(response => {
        if (response.data && response.data.user) {
          const { fullname, username } = response.data.user;
          setDisplayName(`${fullname} (${username})`);
        } else {
          console.error('Invalid response structure:', response.data);
          navigate('/login');
        }
      })
      .catch(error => {
        console.error('Error fetching user info:', error);
        navigate('/login');
      });
    }
  }, [location, navigate]);

  return (
    <div className="homepage">
      <div className="header">
        <div className="logo">
          <img src="../public/images/logo.png" alt="" />
        </div>
        <div className="create_n_join">
          <div className="create">
            <button className="button"><Link to="/create">Create</Link></button>
          </div>
          <div className="join">
            <button className="button"><a href="">Join</a></button>
          </div>
        </div>
        <div className="option">
          <div className="My_schedule">
            <a href="">My scheduled events</a>
          </div>
          <div className="about">
            <a href="">About</a>
          </div>
        </div>
        <div className="acc_n_notice">
          <div className="acc">
            <div className="avt">
              <img src="../public/images/avt.webp" alt="" width="60px" height="60px" />
            </div>
            <div className="acc_name">
              {displayName}
            </div>
            </div>
        </div>
        <div id="notification-bell-container">
              <div id="notification-bell" onClick={toggleNotificationList} style={{ cursor: 'pointer' }}>
                <span className="bell-icon">
                  <img src="../public/images/bell.webp" alt="" width="44px" height="44px" />
                </span>
                <span id="notification-count" className="count">{notifications.length}</span>
              </div>
              {isNotificationListVisible && (
                <div id="notification-list">
                  {notifications.map(notification => (
                    <div
                      key={notification.id}
                      className="notification-item"
                      onClick={() => handleNotificationClick(notification.id)}
                      style={{ cursor: 'pointer' }}
                    >
                      {notification.message}
                    </div>
                  ))}
                </div>
              )}
        </div>
      </div>
      
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
