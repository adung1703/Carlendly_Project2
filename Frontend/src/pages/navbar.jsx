import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import UploadModal from './uploadmodal';
import JoinModal from './joinmodal'; // Import JoinModal

function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();
  const [displayName, setDisplayName] = useState('');
  const [username, setUsername] = useState('');
  const [notifications, setNotifications] = useState([]);
  const [isNotificationListVisible, setIsNotificationListVisible] = useState(false);
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [isJoinModalOpen, setIsJoinModalOpen] = useState(false); // State for JoinModal

  const toggleNotificationList = () => {
    setIsNotificationListVisible(!isNotificationListVisible);
  };

  const handleNotificationClick = (id) => {
    navigate(`/join/${id}`);
  };

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
    } else {
      console.log(token);
      axios.get('http://localhost:3000/api/users/me', {
        headers: {
          "Auth-Token": token,
        }
      })
      .then(response => {
        if (response.data && response.data.user) {
          const { fullname, username } = response.data.user;
          setDisplayName(`${fullname} (${username})`);
          setUsername(username);
        } else {
          console.error('Invalid response structure:', response.data);
          navigate('/login');
        }
      })
      .catch(error => {
        console.error('Error fetching user info:', error);
        navigate('/login');
      });

      axios.get('http://localhost:3000/api/notifications', {
        headers: {
          "Auth-Token": token,
        }
      })
      .then(response => {
        setNotifications(response.data);
      })
      .catch(error => {
        console.error('Error fetching notifications:', error);
      });
    }
  }, [location, navigate]);

  const handleImportClick = () => {
    setIsUploadModalOpen(true);
  };

  const handleCloseUploadModal = () => {
    setIsUploadModalOpen(false);
  };

  const handleJoinClick = () => {
    setIsJoinModalOpen(true);
  };

  const handleCloseJoinModal = () => {
    setIsJoinModalOpen(false);
  };

  const handleJoin = (id) => {
    setIsJoinModalOpen(false);
    navigate(`/join/${id}`);
  };

  return (
    <div className="header">
      <div className="logo">
        <Link to="/"><img src="../public/images/logo.png" alt="Logo" /></Link>
      </div>
      <div className="create_n_join">
        <div className="create">
          <button className="button"><Link to="/create">Create</Link></button>
        </div>
        <div className="join">
          <button className="button" onClick={handleJoinClick}>Join</button>
        </div>
        <div className="import">
          <button className="import_button" onClick={handleImportClick}>
            <a>Import</a>
          </button>
        </div>
        <UploadModal isOpen={isUploadModalOpen} onClose={handleCloseUploadModal} hostUser={username} />
        <JoinModal isOpen={isJoinModalOpen} onClose={handleCloseJoinModal} onJoin={handleJoin} />
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
            <img src="../public/images/avt.webp" alt="Avatar" width="60px" height="60px" />
          </div>
          <div className="acc_name">
            {displayName}
          </div>
        </div>
      </div>
      <div id="notification-bell-container">
        <div id="notification-bell" onClick={toggleNotificationList} style={{ cursor: 'pointer' }}>
          <span className="bell-icon">
            <img src="../public/images/bell.webp" alt="Notification Bell" width="44px" height="44px" />
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
              >
                <div>Bạn có cuộc hẹn cần đặt lịch từ: <span className="notification-message">{notification.message}</span> </div>
                <div>Mô tả: <span className="notification-description">{notification.description}</span></div>
                <div className="notification-time">{new Date(notification.currentTime).toLocaleString()}</div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default Navbar;
