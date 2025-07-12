import React, { useState, useEffect } from 'react';
import './App.css';
import LoginForm from './LoginForm';
import ChatPage from './ChatPage';
import useToken from './useToken';

function App() {
  const {token, setToken} = useToken();
  if (!token){
    return <LoginForm setToken = {setToken} />;
  }
  return <ChatPage />;
}

export default App;
