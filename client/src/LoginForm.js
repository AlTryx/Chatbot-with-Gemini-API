
import React, { useState } from 'react';
import './styles.css';
import userIcon from './images/user-icon.webp';
import emailIcon from './images/email.png';
import passwIcon from './images/passw-icon.png';
import backgroundLogin from './images/backgroundLogin.png';

const LoginForm = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [remember, setRemember] = useState(true);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    


    if (email && password) {
      onLogin && onLogin();
    }
  };

  return (
    <div className="login-container login-bg">
      <img id="user" className="login-user-icon" src={userIcon} alt="User Icon" />
      <h1>Sign in</h1>
      <form onSubmit={handleSubmit}>
        <div className="login-input-row">
          <img src={emailIcon} alt="email" className="login-input-icon" />
          <input
            id="in-em"
            type="email"
            placeholder="Enter email"
            required
            value={email}
            onChange = {e => setEmail(e.target.value)}
          />
        </div>
        <div className="line"></div>
        <div className="login-input-row">
          <img src={passwIcon} alt="password" className="login-input-icon" />
          <input
            id="in-pass"
            type="password"
            placeholder="Enter password"
            required
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
        </div>
        <div className="line1"></div>
        <div className="line2"></div>
        <button className="btn-login" type="submit">Login</button>
        <div className="forg-pass-container">
          <label>
            <input
              id="in-check"
              type="checkbox"
              checked={remember}
              onChange={e => setRemember(e.target.checked)}
              name="remember"
            /> Remember me
          </label>
          <div className="line3"></div>
          <div className="psw">Forgotten <a href="#">password?</a></div>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
