

import React, { useState, useEffect } from 'react';
import './App.css';

import LoginForm from './LoginForm';
import ChatPage from './ChatPage';


function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  if (!isLoggedIn) {
    return <LoginForm onLogin={() => setIsLoggedIn(true)} />;
  }
  return <ChatPage />;
}

export default App;
