import Navbar from './navbar';
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const MeetingCard = ({ meeting, onEditNote }) => (
  <div className="meeting-card">
    <h3>Cuộc họp: {meeting.description}</h3>
    <p>Người tổ chức: {meeting.hostUser}</p>
    <p>Thời gian bắt đầu: {new Date(meeting.startTime).toLocaleString()}</p>
    <p>Thời lượng: {meeting.duration} phút</p>
    <p>Địa điểm: {meeting.location}</p>
    <p>Ghi chú: {meeting.note}</p>
    <button className='editbutton' onClick={() => onEditNote(meeting)}>Chỉnh sửa ghi chú</button>
  </div>
);

const MeetingTabContent = ({ meetings, title, onEditNote }) => (
  <div>
    <h3>{title}</h3>
    <div className="meeting-grid">
      {meetings.map((meeting) => (
        <MeetingCard key={meeting._id} meeting={meeting} onEditNote={onEditNote} />
      ))}
    </div>
  </div>
);

const MeetingTabs = () => {
  const [activeTab, setActiveTab] = useState('host');
  const [meetings, setMeetings] = useState({
    upcomingHostMeetings: [],
    happeningHostMeetings: [],
    pastHostMeetings: [],
    upcomingParticipationMeetings: [],
    happeningParticipationMeetings: [],
    pastParticipationMeetings: []
  });
  const [showModal, setShowModal] = useState(false);
  const [currentNote, setCurrentNote] = useState('');
  const [currentMeetingId, setCurrentMeetingId] = useState('');

  const handleEditNote = (meeting) => {
    setCurrentNote(meeting.note);
    setCurrentMeetingId(meeting._id);
    setShowModal(true);
  };

  const handleSaveNote = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.post('http://localhost:3000/editNote', {
        note: currentNote
      }, {
        headers: {
          'Auth-Token': token,
          'meetingId': currentMeetingId
        }
      });
      alert(response.data);
      setShowModal(false);
    } catch (error) {
      console.error('Error updating note:', error);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
    } else {
      const fetchMeetings = async () => {
        try {
          const response = await axios.get('http://localhost:3000/api/mymeetings', {
            headers: {
              "Auth-Token": token,
            }
          });
          setMeetings(response.data);
        } catch (error) {
          console.error('Error fetching meetings:', error);
        }
      };

      fetchMeetings();
    }
  }, []);

  console.log(meetings);

  return (
    <div className="meeting">
      <Navbar />
      <div className="container">
        <div className="tabs">
          <button
            className={`tab ${activeTab === 'host' ? 'active' : ''}`}
            onClick={() => setActiveTab('host')}
          >
            Meetings I'm Hosting
          </button>
          <button
            className={`tab ${activeTab === 'participant' ? 'active' : ''}`}
            onClick={() => setActiveTab('participant')}
          >
            Meetings I'm Participating In
          </button>
        </div>
        <div className="tab-content">
          {activeTab === 'host' && (
            <>
              <MeetingTabContent meetings={meetings.upcomingHostMeetings} title="Sắp diễn ra" onEditNote={handleEditNote} />
              <MeetingTabContent meetings={meetings.happeningHostMeetings} title="Đang diễn ra" onEditNote={handleEditNote} />
              <MeetingTabContent meetings={meetings.pastHostMeetings} title="Đã diễn ra" onEditNote={handleEditNote} />
            </>
          )}
          {activeTab === 'participant' && (
            <>
              <MeetingTabContent meetings={meetings.upcomingParticipationMeetings} title="Sắp diễn ra" onEditNote={handleEditNote} />
              <MeetingTabContent meetings={meetings.happeningParticipationMeetings} title="Đang diễn ra" onEditNote={handleEditNote} />
              <MeetingTabContent meetings={meetings.pastParticipationMeetings} title="Đã diễn ra" onEditNote={handleEditNote} />
            </>
          )}
          {showModal && (
            <div className="editmodal">
              <textarea className="edittextarea" value={currentNote} onChange={(e) => setCurrentNote(e.target.value)} />
              <button className='savebutton' onClick={handleSaveNote}>Đồng ý</button>
              <span></span>
              <button className='savebutton' onClick={() => setShowModal(false)}>Hủy</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default MeetingTabs;
