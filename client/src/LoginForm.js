
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
    // TODO: Add real login logic here
    if (email && password) {
      onLogin && onLogin();
    }
  };

  return (
    <div className="login-container" style={{ backgroundImage: `url(${backgroundLogin})`, backgroundSize: 'cover', minHeight: '100vh' }}>
      <img id="user" src={userIcon} alt="User Icon" style={{ width: 80, height: 80, margin: '20px auto', display: 'block' }} />
      <h1>Sign in</h1>
      <form onSubmit={handleSubmit}>
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: 10 }}>
          <img src={emailIcon} alt="email" style={{ width: 24, marginRight: 8 }} />
          <input
            id="in-em"
            type="email"
            placeholder="Enter email"
            required
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
        </div>
        <div className="line"></div>
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: 10 }}>
          <img src={passwIcon} alt="password" style={{ width: 24, marginRight: 8 }} />
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
