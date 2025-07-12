import React, { useState, useEffect } from 'react';
import chatbotpng from './images/chatbot.png';
import WebcamComponent from './WebcamComponent';
import './App.css';
import './Chat.css';

const ChatPage = () => {
  const [userMessage, setUserMessage] = useState('');
  const [botReply, setBotReply] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [messages, setMessages] = useState([]);

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  useEffect(() => {
    fetch('http://localhost:3001/')
      .then(response => response.text())
      .then(data => {
        setUserMessage(data);
      })
      .catch(error => {
        console.error('Error fetching data from server:', error);
      });
  }, []);

  const addMessage = (text, isBot = false) => {
    setMessages(prevMessages => [...prevMessages, { text, isBot }]);
  };

  const handleAsk = async () => {
    if (!inputValue.trim()) {
      return;
    }
    setIsLoading(true);
    addMessage(inputValue, false);
    try {
      const response = await fetch('http://localhost:3001/ask', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: inputValue })
      });
      const data = await response.json();
      addMessage(data.reply || 'No reply.', true);
      setBotReply(data.reply || 'No reply.');
    } catch (err) {
      console.error('Error:', err);
      addMessage('Error communicating with server.', true);
      setBotReply('Error communicating with server.');
    }
    setInputValue('');
    setIsLoading(false);
  };

  return (
    <div className="App">
      <header className="App-header">
        <img src={chatbotpng} className="App-logo" alt="logo" />
        <p>Gemini React Node.js Chatbot - AleksGPT.</p>
        <div className="box">
          <div className="chat-history-container">
            <div className="chat-history">
              <p>Chat</p>
              <p>Chat</p>
              <p>Chat</p>
              <p>Chat</p>
              <p>Chat</p>
              <p>Chat</p>
              <p>Chat</p>
              <p>Chat</p>
              <p>Chat</p>
              <p>Chat</p>
              <p>Chat</p>
            </div>
          </div>
          <div className="chat-main">
            {messages.map((message, index) => (
              <div
                key={index}
                className={message.isBot ? 'bot' : 'user'}
              >
                {message.isBot ? (
                  <>
                    <div className="bot-icon"></div>
                    <div className="bot message">{message.text}</div>
                  </>
                ) : (
                  <div className="user message">{message.text}</div>
                )}
              </div>
            ))}
            <br />
            <div className="input-container">
              <input
                className="App-input"
                type="text"
                value={inputValue}
                onChange={handleInputChange}
                placeholder="Ask something..."
              />
              <button
                onClick={handleAsk}
                className="App-button"
                disabled={isLoading}
              >
                {isLoading ? 'Thinking...' : 'Ask'}
              </button>
            </div>
          </div>
        </div>
        <WebcamComponent />
      </header>
    </div>
  );
};

export default ChatPage;
