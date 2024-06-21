import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Navbar from './navbar';

function Join() {
  const { id } = useParams(); 
  const [eventData, setEventData] = useState(null);
  const [participantMSSV, setParticipantMSSV] = useState('');
  const [selectedSlot, setSelectedSlot] = useState('');
  const [note, setNote] = useState('');

  useEffect(() => {
    // Fetch event data from the API
    axios.get(`http://localhost:3000/api/myslots?id=${id}`)
      .then(response => {
        console.log(response);
        setEventData(response.data); // Assuming the API returns an array
      })
      .catch(error => {
        console.error('Error fetching event data:', error);
      });
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Prepare the data to be sent to the API
    const requestData = {
      hostUser: eventData.hostUser,
      studentId: participantMSSV,
      startTime: selectedSlot,
      duration: 30, // Assuming a default duration of 30 minutes
      slotsId: id,
      note: note,
      location: eventData.location,
    };

    console.log(requestData);

    // Send the data to the API
    axios.post('http://localhost:3000/join', requestData)
      .then(response => {
        console.log('API response:', response);
        alert(response.data.message);
        // Handle successful response
      })
      .catch(error => {
        console.error('Error submitting form:', error);
        // Handle error response
      });
  };

  if (!eventData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="full">
    <div className="joinpage">
      <Navbar />
      <div className="container">
        <div className="form">
          <div className="form-header">
            <h1>Join Page</h1>
          </div>
          <div className="form-content">
            <p>Joining event with ID: {id}</p>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <div className="form-label">Host User:</div>
                <input type="text" className="form-control" value={eventData.hostUser} readOnly disabled/>
              </div>
              <div className="form-group">
                <div className="form-label">MSSV của người tham gia:</div>
                <input 
                  type="text" 
                  className="form-control"
                  value={participantMSSV} 
                  onChange={(e) => setParticipantMSSV(e.target.value)} 
                />
              </div>
              <div className="form-group">
                <div className="form-label">Chọn lịch rảnh có sẵn:</div>
                <select 
                  className="form-control"
                  value={selectedSlot} 
                  onChange={(e) => setSelectedSlot(e.target.value)}
                >
                  <option value="">Select a slot</option>
                  {eventData.slots.map((slot, index) => {
                    const slotDate = new Date(slot.dateTime);
                    const formattedDate = `${slotDate.getDate()}-${slotDate.getMonth() + 1}-${slotDate.getFullYear()} ${slotDate.getHours()}:${slotDate.getMinutes()}:${slotDate.getSeconds()}`;
                    return (
                      <option key={index} value={slot.dateTime}>
                        {formattedDate}
                      </option>
                    );
                  })}
                </select>
              </div>
              <div className="form-group">
                <div className="form-label">Mô tả:</div>
                <textarea className="form-control" value={eventData.description} readOnly disabled />
              </div>
              <div className="form-group">
                <div className="form-label">Địa điểm:</div>
                <textarea className="form-control" value={eventData.location} readOnly disabled />
              </div>
              <div className="form-group">
                <div className="form-label">Note:</div>
                <textarea 
                  className="form-control"
                  value={note} 
                  onChange={(e) => setNote(e.target.value)} 
                />
              </div>
              <button type="submit" className="btn btn-primary mt-3">Submit</button>
            </form>
          </div>
        </div>
      </div>
    </div>
    </div>
  );
}

export default Join;
