// Login.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Login() {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3000/login', { username, password });
      const { data } = response;
      if (data.token) {
        localStorage.setItem("token", data.token);
        navigate("/");
      } else {
        openErrorModal("Wrong credentials");
      }
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div class="main">
        <section class="sign-in">
            <div class="container">
                <div class="signin-content">
                    <div class="signin-image">
                        <figure><img src="images/signin-image.jpg" alt="sing up image"></img></figure>
                        <p class="signup-image-link">Chưa có tài khoản? <a data-toggle="tab" href="./register">Đăng ký</a></p>
                    </div>

                    <div class="signin-form">
                        <h2 class="form-title">Đăng nhập</h2>
                        <form method="POST" class="register-form" id="login-form"
                          onSubmit={handleSubmit}>
                            <div class="form-group">
                                <label for="your_name"><i class="zmdi zmdi-account material-icons-name"></i></label>
                                <input 
                                  type="text" 
                                  placeholder="Nhập Username"
                                  value={username}
                                  onChange={(e) => setUsername(e.target.value)}/>
                            </div>
                            <div class="form-group">
                                <label for="your_pass"><i class="zmdi zmdi-lock"></i></label>
                                <input 
                                  type="password" 
                                  placeholder="Nhập Mật Khẩu"
                                  value={password}
                                  onChange={(e) => setPassword(e.target.value)}/>
                            </div>
                            <div class="col">
                                <div class="form-group">
                                    <input type="checkbox" name="remember-me" id="remember-me" class="agree-term" /> 
                                    <label for="remember-me" class="label-agree-term"><span><span></span></span>Ghi nhớ đăng nhập</label>
                                    <a href="#" class="forgot-pass">Quên mật khẩu</a>
                                </div>
                              </div>
                            
                            <div class="form-group form-button">
                                <input type="submit" name="signin" id="signin" class="form-submit" value="Log in"/>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </section>

    </div>
  );
}

export default Login;
