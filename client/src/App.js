import React, { useState, useEffect } from 'react';
import './App.css';
import chatbotpng from './chatbotpng.png';

function App() {
  const [serverMessage, setServerMessage] = useState('');

  const [inputValue, setInputValue] = useState('');
  const handleChange = (event) => {
    setInputValue(event.target.value);
  };


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
        <img src = {chatbotpng} className="App-logo" alt="logo" />
        <p>
          Gemini React Node.js chatbot.
        </p>
        <p>
          Server says: {serverMessage}
        </p>
        <p>
          Ask something!
        </p>

        <input className ="App-input"
      type="text"
      value={inputValue}
      onChange={handleChange}
      placeholder="Ask something..."
      />

      </header>
      
      <p style={{ marginTop: "12px", color: "#555" }}>
        You typed: <strong>{inputValue}</strong>
      </p>
    </div>
    
  );
}

export default App;
