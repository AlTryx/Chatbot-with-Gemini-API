import React, { useState, useEffect } from 'react';
import chatbotpng from './images/chatbot.png';
import WebcamComponent from './WebcamComponent';
import './App.css';
import './Chat.css';

const ChatPage = () => {
  const [serverMessage, setServerMessage] = useState('');
  const [botReply, setBotReply] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [messages, setMessages] = useState([]);

  {messages.map((message, index) => (
    <div key = {index} className = {message.isBot ? 'bot-message' : 'user-message'}>
      <div className = "message-content">
        {message.text}
      </div>
    </div>
  ))}

  const handleInputChange = (event) => {
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
      setBotReply('Error communicating with server.');
    }
    setIsLoading(false);
  };

  return (
    <div className="App">
      <header className="App-header">
        <img src={chatbotpng} className="App-logo" alt="logo" />
        <p>Gemini React Node.js Chatbot - AleksGPT.</p>
        <div className = "box">    
          <div className = "bot">
            {botReply && (
              <>
                <div className = "bot-icon"></div>
                <div className="bot message">
                  {botReply}
                </div>
              </>
            )}
          </div>  
          <br />
          <div className="input-container">
            <input className="App-input"
              type="text"
              value={inputValue}
              onChange={handleInputChange}
              placeholder="Ask something..."
            />
            <button onClick={handleAsk} className="App-button">
              {isLoading ? 'Thinking...' : 'Ask'}
            </button>
          </div>   
        </div>   
        <WebcamComponent />
      </header>
    </div>
  );
};

export default ChatPage;
