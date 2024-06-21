// App.jsx
import React from 'react';
import { Routes, Route, BrowserRouter } from 'react-router-dom'; 

// Import các component
import Homepage from "./pages/homepage";
import Login from "./pages/login";
import Register from "./pages/register";
import Create from "./pages/create";
import Join from './pages/join';
import MyMeeting from './pages/mymeeting';
import Profile from './pages/Profile';

function App() {
  return (
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/create" element={<Create />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/join/:id" element={<Join />} />
          <Route path="/mymeeting" element={<MyMeeting />} />
          <Route path="/Profile" element={<Profile />} />
        </Routes>
      </BrowserRouter>
  );
}

export default App;
