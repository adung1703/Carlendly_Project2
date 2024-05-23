import React, { useState, useEffect } from 'react';
import Navbar from './navbar';
import { Link } from 'react-router-dom';

function Create() {
  const [date, setDate] = useState(new Date());
  const [currYear, setCurrYear] = useState(date.getFullYear());
  const [currMonth, setCurrMonth] = useState(date.getMonth());
  const [selectedDay, setSelectedDay] = useState(null);
  const [selectedParticipants, setSelectedParticipants] = useState([]);
  const [amPm, setAmPm] = useState('AM');

  const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  const participants = ['John Doe', 'Jane Smith', 'Alice Johnson', 'Bob Brown']; // Danh sách người tham gia
  
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
      const isToday = i === date.getDate() && currMonth === new Date().getMonth() && currYear === new Date().getFullYear() ? "today" : "";
      const isFuture = date.getDate() < i && currMonth === new Date().getMonth() && currYear === new Date().getFullYear() ? "selectable" : "";
      liTag.push(
        <li 
          className={`${isToday} ${isFuture}`} 
          key={`current-${i}`} 
          onClick={() => isFuture && setSelectedDay(i)}
        >
          {i}
        </li>
      );
    }

    for (let i = lastDayofMonth; i < 6; i++) {
      liTag.push(<li className="inactive" key={`next-${i}`}>{i - lastDayofMonth + 1}</li>);
    }
    return liTag;
  };

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
      // Nếu người được chọn đã tồn tại trong danh sách, loại bỏ nó
      setSelectedParticipants(selectedParticipants.filter(p => p !== participant));
    } else {
      // Ngược lại, thêm người được chọn vào danh sách
      setSelectedParticipants([...selectedParticipants, participant]);
    }
  };

  return (
    <div className="create_page">
      <Navbar></Navbar>
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
                    <img src="img/arrow.png" alt="Previous" width="35px" height="35px" />
                  </span>
                  <span id="next" className="next" onClick={() => handlePrevNext('next')}>
                    <img src="img/arrow.png" alt="Next" width="35px" height="35px" />
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
            <p className="schedule_inf">Please choose event starting time :</p>
            <div className="start_time">
              <span><img src="img/clock.webp" alt="Clock" width="50px" height="50px" /></span>
              <input type="number" onInput={(e) => formatInput1(e.target)} />
              <span className="space">:</span>
              <input type="number" onInput={(e) => formatInput2(e.target)} />
              <div className="select_menu">
                <div className="select_btn" onClick={() => setAmPm(amPm === 'AM' ? 'PM' : 'AM')}>
                  <span className="sbtn_text">{amPm}</span>
                  <img src="img/arrow.png" alt="Arrow" />
                </div>
              </div>
            </div>
            
            <p className="schedule_inf">Please choose event duration :</p>
            <div className="duration">
              <span><img src="img/time.jpg" alt="Time" width="50px" height="50px" /></span>
              <input type="number" onInput={(e) => formatInput1(e.target)} />
              <span className="duration_element">Hour</span>
              <input type="number" onInput={(e) => formatInput2(e.target)} />
              <span className="duration_element">Minute</span>
            </div>
          </div>
        </div>
        <div className="content_right">
          <div className="wrapper">

            <p className="schedule_inf">Please enter event location :</p>
            <div className="location">
              <span><img src="img/location.png" alt="Location" width="50px" height="50px" /></span>
              <input type="text" />
            </div>

            <p className="schedule_inf">Enter event short description :</p>
            <div className="description">
              <textarea name="" id="" cols="30" rows="10"></textarea>
            </div>

            <div className="participants_section">
              <p className="schedule_inf">Add event participant</p>
              <div className="selected_participants">
                {selectedParticipants.map((participant, index) => (
                  <span key={index} className="participant_name selected">{participant}</span>
                ))}
              </div>
              <div className="participant_list">
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
              <button className="button">Create schedule</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function formatInput1(input) {
  // Ensure that the input is always in the range 0-23
  let value = parseInt(input.value);
  if (value < 0 || isNaN(value)) input.value = 0;
  if (value > 23) input.value = 23;
}

function formatInput2(input) {
  // Ensure that the input is always in the range 0-59
  let value = parseInt(input.value);
  if (value < 0 || isNaN(value)) input.value = 0;
  if (value > 59) input.value = 59;
}

export default Create;
