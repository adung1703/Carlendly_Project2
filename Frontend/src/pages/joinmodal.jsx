import React, { useState } from 'react';

function JoinModal({ isOpen, onClose, onJoin }) {
  const [joinId, setJoinId] = useState('');

  const handleChange = (e) => {
    setJoinId(e.target.value);
  };

  const handleJoin = () => {
    if (joinId) {
      onJoin(joinId);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="modal">
      <div className="modal-content">
        <span className="close" onClick={onClose}>&times;</span>
        <h2>Join Event</h2>
        <input type="text" placeholder="Enter ID" value={joinId} onChange={handleChange} />
        <div className="button-container">
          <button className="join-button" onClick={handleJoin}>Join</button>
        </div>
      </div>
    </div>
  );
}

export default JoinModal;
