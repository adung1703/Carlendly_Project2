// pages/create.jsx

import React from "react";
import { Link } from "react-router-dom";

function create() {  
  return (
    <div class="create_page">
    <div class="header">
      <div class="logo">
        <Link to ="/"> <img src="../public/images/logo.png" alt=""></img></Link>
      </div>
      <div class="create_n_join"> 
       <div class="create">
        <button class="button"><a href="create.html">Create</a></button>
       </div>
       <div class="join">
        <button class="button"><a href="">Join</a></button>
       </div>
      </div>
      <div class="option">  
        <div class="My_schedule">
          <a href="">My scheduled events</a>
        </div>
        <div class="about">
          <a href="">About</a>
        </div>
      </div>  
      <div class="acc_n_notice">
        <div class="acc">
          <div class="avt">
            <img src="img/avt.webp" alt="" width="60px" height="60px"></img>
          </div>
          <div class="acc_name">
            Dao Duc Duong
          </div>
        </div>
        <div class="notice">
          <img src="img/bell.webp" alt="" width="44px" height="44px"></img>
        </div>
      </div>
    </div>
      <div class="title">
        <h1>Create new event schedule</h1>
        <span><a href="homepage.html">X</a></span>
      </div>
      <div class="content">
        <div class="content_left">
          <div class="wrapper">
            <p class="schedule_inf">Please choose a day to schedule your event :</p>
          <div class="calendar">
          <div class="calendar_heading">
            <p class="month_year">April 2024</p>
            <div class="icons">
              <span id="prev" class="prev"><img src="img/arrow.png" alt="" width="35px" height="35px"></img></span>
              <span id="next" class="next"><img src="img/arrow.png" alt="" width="35px" height="35px"></img></span>
            </div>
          </div>
          <div class="calendar_content">
            <ul class="weekdays">
              <li>Sun</li>
              <li>Mon</li>
              <li>Tue</li>
              <li>Wed</li>
              <li>Thu</li>
              <li>Fri</li>
              <li>Sat</li>
            </ul>
            <ul class="days"></ul>
          </div>
        </div>
        <p class="schedule_inf">Please choose event starting time :</p>
        <div class="start_time">
          <span><img src="img/clock.webp" alt="" width="50px" height="50px"></img></span>
          <input type="number" oninput="formatInput1(this)"></input>
          <span class="space">:</span>
          <input type="number" oninput="formatInput2(this)"></input>
          <div class="select_menu">   
            <div class="select_btn">  
              <span class="sbtn_text">AM</span>
              <img src="img/arrow.png" alt=""></img>
            </div>
            <ul class="time_options">
              <li class="time_option">
                <span class="option_text">AM</span>
              </li>
              <li class="time_option">
                <span class="option_text">PM</span>
              </li>
            </ul>
          </div>
        </div>
        <p class="schedule_inf">Please enter event location :</p>
        <div class="location">
          <span><img src="img/location.png" alt="" width="50px" height="50px"></img></span>
          <input type="text"></input>
        </div>
        <p class="schedule_inf">Please choose event duration :</p>
        <div class="duration">
          <span><img src="img/time.jpg" alt="" width="50px" height="50px"></img></span>
          <input type="number" oninput="formatInput1(this)"></input>
          <span class="duration_element">Hour</span>
          <input type="number" oninput="formatInput2(this)"></input>
          <span class="duration_element">Minute</span>
        </div>
        <p class="schedule_inf">Enter event short description :</p>
          <div class="description">
            <textarea name="" id="" cols="30" rows="10"></textarea>
          </div>
          </div>
      </div>
        <div class="content_right">
          <div class="wrapper">
            <span class="label">Add event participant</span>
          <div class="participant">
            <div class="method_1">
              <span class="method_label">Your schedule code</span>
              <div class="code_box">
                <span class="code">#ABC</span>
                <button class="button">Copy</button>
              </div>
              <p>Paste this code in a message to invite people to join your schedule</p>
            </div>
            <div class="method_2">
              <span class="method_label">Or you can add participants from your class list</span>
              <div class="upload_wrapper">
                <div class="upload_header"><p>Upload Your List</p></div>
                    <form action="#">
                      <input type="file" class="file_input" hidden></input>
                      <img src="img/upload.png" alt="" width="100px" height="70px"></img>
                      <p>Browse File to Upload</p>
                    </form>
                    <section class="progress_area">
                      <li class="row">
                        <img src="img/file.png" alt="" width="30px" height="30px"></img>
                        <div class="upload_content">
                          <div class="upload_details">
                            <span class="name">File_01.xlsx - Uploading</span>
                            <span class="percent">50%</span>
                          </div>
                          <div class="progress_bar">
                            <div class="progress"></div>
                          </div>
                        </div>
                      </li>
                    </section>
                 
                    <section class="uploaded_area">
                      <li class="row">
                        <div class="upload_content">
                          <img src="img/file.png" alt="" width="30px" height="30px"></img>
                          <div class="upload_details">
                            <span class="name">File_01.xlsx - Uploaded</span>
                            <span class="size">100KB</span>
                          </div>
                        </div>
                        <img src="img/check.svg" alt="" width="30px" height="30px"></img>
                      </li>
                      <li class="row">
                        <div class="upload_content">
                          <img src="img/file.png" alt="" width="30px" height="30px"></img>
                          <div class="upload_details">
                            <span class="name">File_02.xlsx - Uploaded</span>
                            <span class="size">100KB</span>
                          </div>
                        </div>
                        <img src="img/check.svg" alt="" width="30px" height="30px"></img>
                      </li>
                      <li class="row">
                        <div class="upload_content">
                          <img src="img/file.png" alt="" width="30px" height="30px"></img>
                          <div class="upload_details">
                            <span class="name">File_03.xlsx - Uploaded</span>
                            <span class="size">100KB</span>
                          </div>
                        </div>
                        <img src="img/check.svg" alt="" width="30px" height="30px"></img>
                      </li>
                      <li class="row">
                        <div class="upload_content">
                          <img src="img/file.png" alt="" width="30px" height="30px"></img>
                          <div class="upload_details">
                            <span class="name">File_04.xlsx - Uploaded</span>
                            <span class="size">100KB</span>
                          </div>
                        </div>
                        <img src="img/check.svg" alt="" width="30px" height="30px"></img>
                      </li>
                      <li class="row">
                        <div class="upload_content">
                          <img src="img/file.png" alt="" width="30px" height="30px"></img>
                          <div class="upload_details">
                            <span class="name">File_05.xlsx - Uploaded</span>
                            <span class="size">100KB</span>
                          </div>
                        </div>
                        <img src="img/check.svg" alt="" width="30px" height="30px"></img>
                      </li>
                      <li class="row">
                        <div class="upload_content">
                          <img src="img/file.png" alt="" width="30px" height="30px"></img>
                          <div class="upload_details">
                            <span class="name">File_06.xlsx - Uploaded</span>
                            <span class="size">100KB</span>
                          </div>
                        </div>
                        <img src="img/check.svg" alt="" width="30px" height="30px"></img>
                      </li>
                      
                    </section>
                  
                </div>
                <div class="search_wrapper">
                  <div class="search_input">
                    <input type="text" placeholder="Search in your list.."></input>
                    <div class="auto_com">
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="submit">
                <button class="button">Create schedule</button>
            </div>
          </div>
          
          </div>
        </div>
      </div>
  )
}

export default create;