import React, {useEffect, useState } from 'react';
import Navbar from './navbar';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

function Create() {
  const navigate = useNavigate();

  const [date, setDate] = useState(new Date());
  const [currYear, setCurrYear] = useState(date.getFullYear());
  const [currMonth, setCurrMonth] = useState(date.getMonth());
  const [selectedDay, setSelectedDay] = useState(null);
  const [selectedParticipants, setSelectedParticipants] = useState([]);
  const [slots, setSlots] = useState([]);
  const [startTime, setStartTime] = useState({ hour: '', minute: '' });
  const [duration, setDuration] = useState({ hour: '', minute: '' });
  const [location, setLocation] = useState('');
  const [description, setDescription] = useState('');
  var username;

  const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

  const [participants, setParticipants] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
    } else {
      const fetchData = async () => {
        try {
          const response = await axios.get('http://localhost:3000/api/mystudents', {
            headers: {
              'Auth-Token': token 
            }
          });
          const data = response.data;
          if (Array.isArray(data) && data.length > 0) {
            const students = data[0].students; 
            setParticipants(students); 
          }
        } catch (error) {
          console.error('Error fetching participants:', error);
        }
      };
    
      fetchData();
    }
  }, [navigate]);

  const renderCalendar = () => {
    const firstDateofMonth = new Date(currYear, currMonth, 1).getDay();
    const lastDateofMonth = new Date(currYear, currMonth + 1, 0).getDate();
    const lastDayofMonth = new Date(currYear, currMonth, lastDateofMonth).getDay();
    const lastDateofPrevMonth = new Date(currYear, currMonth, 0).getDate();
    let liTag = [];

    for (let i = firstDateofMonth; i > 0; i--) {
      liTag.push(<li className="inactive" key={`prev-${i}`}>{lastDateofPrevMonth - i + 1}</li>);
    }

    for (let i = 1; i <= lastDateofMonth; i++) {
      let isToday = i === date.getDate() && currMonth === new Date().getMonth()
                    && currYear === new Date().getFullYear() ? "today" : "";
      let isFuture = date.getDate() < i && currMonth === new Date().getMonth()
                    && currYear === new Date().getFullYear() ? "selectable" : "";
      liTag.push(
          <li className={`${isToday} ${isFuture}`} onClick={() => selectDate(i)}>{i}</li>
      );
  }  

    for (let i = lastDayofMonth; i < 6; i++) {
      liTag.push(<li className="inactive" key={`next-${i}`}>{i - lastDayofMonth + 1}</li>);
    }
    return liTag;
  };

  function selectDate(day) {
    const element = document.querySelector(`.days li:nth-child(${day+6})`);
    if (element && element.classList.contains("selectable")) {
        const allDays = document.querySelectorAll(".days li");
        allDays.forEach(day => {
          day.classList.remove("active");
        });
        element.classList.add("active");
        setSelectedDay(day);
    }
}

  const handlePrevNext = (direction) => {
    if (direction === 'prev') {
      setCurrMonth(currMonth - 1);
      if (currMonth < 0) {
        setCurrYear(currYear - 1);
        setCurrMonth(11);
      }
    } else {
      setCurrMonth(currMonth + 1);
      if (currMonth > 11) {
        setCurrYear(currYear + 1);
        setCurrMonth(0);
      }
    }
  };

  const handleParticipantSelect = (participant) => {
    if (selectedParticipants.includes(participant)) {
      setSelectedParticipants(selectedParticipants.filter(p => p !== participant));
    } else {
      setSelectedParticipants([...selectedParticipants, participant]);
    }
  };
  const handleAddSlot = () => {

    const slot = {
      date: new Date(currYear, currMonth, selectedDay),
      time: `${startTime.hour}:${startTime.minute}`,
      duration: `${duration.hour}h${duration.minute}m`
    };
    setSlots([...slots, slot]);
  };  

  const handleStartChange = (event) => {
    const { name, value } = event.target;
    setStartTime({
      ...startTime,
      [name]: value
    });
  };

  const handleDurationChange = (event) => {
    const { name, value } = event.target;
    setDuration({
      ...duration,
      [name]: value
    });
  };

  const handleCreateSchedule = async () => {
    try {
      const token = localStorage.getItem('token');
      const userResponse = await axios.get('http://localhost:3000/api/users/me', {
        headers: {
          "Auth-Token": token,
        }
      });

      if (userResponse.data && userResponse.data.user) {
        username = userResponse.data.user.username;
      } else {
        console.error('Invalid response structure:', userResponse.data);
        navigate('/login');
        return;
      }

      const formattedSlots = slots.map(slot => ({
        dateTime: new Date(slot.date.setHours(slot.time.split(':')[0], slot.time.split(':')[1])),
        duration: parseInt(slot.duration.split('h')[0]) * 60 + parseInt(slot.duration.split('h')[1].split('m')[0])
      }));
      const response = await axios.post('http://localhost:3000/create', {
        hostUser: username,
        description: description,
        participant: selectedParticipants,
        slots: formattedSlots,
        location: location
      });

      alert(response.data.message)
    } catch (error) {
      console.error('Error creating schedule:', error);
      // Handle the error here, for example: show an error message to the user
    }
  };

  const handleLocationChange = (event) => {
    setLocation(event.target.value);
  };
  
  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };

  return (
    <div className="create_page">
      <Navbar />
      <div className="title">
        <h1>Create new event schedule</h1>
        <span><Link to="/">x</Link></span>
      </div>
      <div className="content">
        <div className="content_left">
          <div className="wrapper">
            <p className="schedule_inf">Please choose a day to schedule your event :</p>
            <div className="calendar">
              <div className="calendar_heading">
                <p className="month_year">{`${months[currMonth]} ${currYear}`}</p>
                <div className="icons">
                  <span id="prev" className="prev" onClick={() => handlePrevNext('prev')}>
                    <img src="../../public/images/arrow.png" alt="Previous" width="35px" height="35px" />
                  </span>
                  <span id="next" className="next" onClick={() => handlePrevNext('next')}>
                    <img src="../../public/images/arrow.png" alt="Next" width="35px" height="35px" />
                  </span>
                </div>
              </div>
              <div className="calendar_content">
                <ul className="weekdays">
                  <li>Sun</li>
                  <li>Mon</li>
                  <li>Tue</li>
                  <li>Wed</li>
                  <li>Thu</li>
                  <li>Fri</li>
                  <li>Sat</li>
                </ul>
                <ul className="days">
                  {renderCalendar()}
                </ul>
              </div>
            </div>
            <button className="button" onClick={handleAddSlot}>Add</button>
            <p class="schedule_inf">Please choose event starting time :</p>
            <div class="start_time">
              <span><img src="../../public/images/clock.webp" alt="" width="50px" height="50px"></img></span>
              <input type="number" 
                name="hour"
                value={startTime.hour}
                onChange={handleStartChange}></input>
              <span class="space">:</span>
              <input type="number" 
                name="minute"
                value={startTime.minute}
                onChange={handleStartChange}></input>
    
            </div>
            <p class="schedule_inf">Please choose event duration :</p>
            <div class="duration">
              <span><img src="../../public/images/time.jpg" alt="" width="50px" height="50px"></img></span>
              <input type="number" 
                name="hour"
                value={duration.hour}
                onChange={handleDurationChange}></input>
              <span class="duration_element">Hour</span>
              <input type="number" 
                name="minute"
                value={duration.minute}
                onChange={handleDurationChange}></input>
              <span class="duration_element">Minute</span>
            </div>
            {/* <div className="slots">
              {slots.map((slot, index) => (
                <div key={index} className="slot">
                  <p>Date: {slot.date.toDateString()}</p>
                  <p>Time: {slot.time}</p>
                  <p>Duration: {slot.duration}</p>
                </div>
              ))}
            </div> */}
          </div>
        </div>
        <div className="content_right">
          <div className="wrapper">
            <div class="slot-list">
              <h1>Scheduled slot :</h1>
              <table>
                <thead>
                  <tr>
                    <th>Date</th>
                    <th>Time</th>
                    <th>Duration</th>
                  </tr>
                </thead>
                <tbody>
                  {slots.map((slot, index) => (
                    <tr key={index}>
                      <td>{slot.date.toDateString()}</td>
                      <td>{slot.time}</td>
                      <td>{slot.duration}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              </div>
            <p className="schedule_inf">Please enter event location :</p>
            <div className="location">
              <span><img src="../../public/images/location.png" alt="Location" width="50px" height="50px" /></span>
              <input type="text"
                  value={location}
                  onChange={handleLocationChange}
                />
            </div>
            <p className="schedule_inf">Enter event short description :</p>
            <div className="description">
              <textarea cols="30"
                  rows="10"
                  value={description}
                  onChange={handleDescriptionChange}></textarea>
            </div>
            <div className="participants_section">
              <p className="schedule_inf">Add event participant</p>
              <div className="selected_participants">
                {selectedParticipants.map((participant, index) => (
                  <span key={index} className="participant_name selected">{participant}</span>
                ))}
              </div>
              <div className="participant_list" style={{ maxHeight: '200px', overflow: 'auto' }}>
                {participants.map((participant, index) => (
                  <div 
                    key={index} 
                    className={`participant_option ${selectedParticipants.includes(participant) ? 'selected' : ''}`} 
                    onClick={() => handleParticipantSelect(participant)}
                  >
                    {participant}
                  </div>
                ))}
              </div>
            </div>
            <div className="submit">
              <button className="button" onClick={handleCreateSchedule}>Create schedule</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Create;
