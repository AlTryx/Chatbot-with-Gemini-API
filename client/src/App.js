import React, { useState, useEffect } from 'react';
import './App.css';
import chatbotpng from './chatbotpng.png';

function App() {
  const [serverMessage, setServerMessage] = useState('');
  const [botReply, setBotReply] = useState('');
  const [isLoading, setIsLoading] = useState(false);
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

  const handleAsk = async () => {
    if(!inputValue.trim()){
      return;
    }
    setIsLoading(true);
    try {
      const response = await fetch('http://localhost:3001/ask', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ message: inputValue })
      });

      const data = await response.json();
      setBotReply(data.reply || 'No reply.');
    } catch (err) {
      console.error('Error:', err);
      const errorText = await err?.response?.text?.();
      console.log('Error body:', errorText);
      setBotReply('Error communicating with server.');
    }
    setIsLoading(false);
  };

  return (
    <div className="App">
      <header className="App-header">
        <img src = {chatbotpng} className="App-logo" alt="logo" />
        <p>
          Gemini React Node.js chatbot - AleksGPT.
        </p>
        <p>
          Server says: {serverMessage}
        </p>
        <p>
          Ask something!
        </p>
        <div className = "input-container">
          <input className ="App-input"
            type="text"
            value={inputValue}
            onChange={handleChange}
            placeholder="Ask something..."
          />
        
          <button onClick={handleAsk} className = "App-button">
            {isLoading ? 'Thinking...' : 'Ask'}
          </button>
        </div>
        {botReply && (
          <div className="App-bot-reply">
            <p>Bot says: {botReply}</p>
          </div>
        )}
      </header>
    </div>
    
  );
}
export default App;
