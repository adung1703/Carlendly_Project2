import React, { useState, useRef, useEffect } from 'react';
import './DraggableButtonModal.css';

function DraggableButtonModal({ onJoin }) {
  const [isOpen, setIsOpen] = useState(false);
  const [joinId, setJoinId] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setIsOpen(false);
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const handleJoinModal = () => {
    if (joinId.trim() === '') {
      setError('Vui lòng nhập ID.');
      return;
    }
    onJoin(joinId);
    setIsOpen(false);
    setJoinId('');
    
  };
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleJoinModal();
    }
  };

  const handleChange = (e) => {
    setJoinId(e.target.value);
    setError('');
  };

  

  return (
    <>
      <div
        className="draggable-button"
        onClick={() => setIsOpen(true)}
      >
        Join
      </div>
      {isOpen && (
        <div
          className="modal"
          role="dialog"
          aria-modal="true"
          onClick={() => setIsOpen(false)}
        >
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="close" onClick={() => setIsOpen(false)} aria-label="Đóng">&times;</button>
            <h2>Tham gia sự kiện</h2>
            <input
              type="text"
              placeholder="Nhập ID"
              value={joinId}
              onChange={handleChange}
              onKeyPress={handleKeyPress}
              aria-label="Nhập ID"
            />
            {error && <p className="error">{error}</p>}
            <div className="button-container">
              <button className="join-button" onClick={handleJoinModal}>Tham gia</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default DraggableButtonModal;
