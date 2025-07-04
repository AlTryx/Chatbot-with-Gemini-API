import React, { useState } from 'react';
import './styles.css';

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [remember, setRemember] = useState(true);

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: Add login logic here
    alert(`Email: ${email}\nPassword: ${password}\nRemember me: ${remember}`);
  };

  return (
    <div className="login-container">
      <img id="user" src="user-icon.webp" alt="User Icon" />
      <h1>Sign in</h1>
      <form onSubmit={handleSubmit}>
        <label className="label-email" htmlFor="email"><b></b></label>
        <input
          id="in-em"
          type="email"
          placeholder="Enter email"
          required
          value={email}
          onChange={e => setEmail(e.target.value)}
        />
        <div className="line"></div>
        <label className="label-pass" htmlFor="psw"><b></b></label>
        <input
          id="in-pass"
          type="password"
          placeholder="Enter password"
          required
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
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
