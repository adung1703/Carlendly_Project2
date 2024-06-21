import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Profile.css';

function Profile() {
  const [user, setUser] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');

    axios.get('http://localhost:3000/api/users/me', {
      headers: {
        "Auth-Token": token,
      },
    })
      .then(response => {
        if (response.data && response.data.user) {
          const { fullname, username, email, studentId, phone } = response.data.user;
          setUser({ fullname, username, email, studentId, phone });
        }
      })
      .catch(error => {
        console.error('Error fetching user info:', error);
      });

    axios.get('http://localhost:3000/api/notifications', {
      headers: {
        "Auth-Token": token,
      },
    })
      .then(response => {
        setNotifications(response.data);
      })
      .catch(error => {
        console.error('Error fetching notifications:', error);
      });
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <div className="profile">
      <h1>Trang Cá Nhân</h1>
      <div>
        <strong>Họ tên:</strong> {user.fullname}
      </div>
      <div>
        <strong>Tên đăng nhập:</strong> {user.username}
      </div>
      <div>
        <strong>Email:</strong> {user.email}
      </div>
      <div>
        <strong>Mã sinh viên:</strong> {user.studentId}
      </div>
      <div>
        <strong>Số điện thoại:</strong> {user.phone}
      </div>
      <button className="logout-button" onClick={handleLogout}>Đăng Xuất</button>
    </div>
  );
}

export default Profile;
