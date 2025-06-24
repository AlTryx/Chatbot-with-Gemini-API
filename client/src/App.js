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
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
