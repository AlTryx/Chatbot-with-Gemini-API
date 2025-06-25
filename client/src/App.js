import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [serverMessage, setServerMessage] = useState('');

  useEffect(() => {
    fetch('http://localhost:3001/')
      .then(response => response.text())
      .then(data => {
        setServerMessage(data);
      })
      .catch(error => {
        console.error('Error fetching data from server:', error);
      });
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <p>
          Gemini + Node.js + React chatbot
        </p>
        <p>
          Server says: {serverMessage}
        </p>
      </header>
    </div>
  );
}

export default App;
