import React, { useRef, useState } from 'react';
import Webcam from 'react-webcam';
import './WebcamComponent.css';

const WebcamComponent = () => {
  const webcamRef = useRef(null);
  const [isCameraOn, setIsCameraOn] = useState(false);
  const [screenshot, setScreenshot] = useState(null);
  const [username, setUsername] = useState('');

  const videoConstraints = {
    width: 300,
    height: 200,
    facingMode: 'user',
  };

  const startCamera = () => setIsCameraOn(true);
  const stopCamera = () => {
    setIsCameraOn(false);
    setScreenshot(null);
  };

  const takeScreenshot = () => {
    if (webcamRef.current) {
      const imageSrc = webcamRef.current.getScreenshot();
      setScreenshot(imageSrc);
      //send screenshot to detection
      sendScreenshotToRecognition(imageSrc);
    }
  };

 //to node.js recognizeFace, then to api flask
  const sendScreenshotToRecognition = (imageSrc) => {
    if (!username) {
      alert('Моля, въведете име на профил!');
      return;
    }
    fetch('http://localhost:3001/api/recognizeFace', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ image: imageSrc, name: username })
    })
    .then(async res => {
      if (!res.ok) {
        const text = await res.text();
        throw new Error(`HTTP ${res.status}: ${text}`);
      }
      return res.json();
    })
    .then(data => {
      alert(`Разпознат профил: ${data.identity}`);
      //tuk she se smenq profila v chatbota
    })
    .catch(async (err) => {
      const errorMessage = await err.message;
      console.error('Fetch error:', errorMessage);
      alert('Грешка при разпознаване на лицето!\n' + errorMessage);
    });
  };

  return (
    <div className="cameraContainer">
      <div className="webcam-controls">
        <button className="StartCamera" onClick={startCamera} disabled={isCameraOn}>Включи камера</button>
        <button className="StopCamera" onClick={stopCamera} disabled={!isCameraOn}>Изключи камера</button>
        <button className="TakeScreenshot" onClick={takeScreenshot} disabled={!isCameraOn}>Снимай и изпрати</button>
      </div>
      <input
        type="text"
        value={username}
        placeholder="Име на профил"
        onChange={(e) => setUsername(e.target.value)}
        disabled={!isCameraOn}
        className="profile-name-input"
      />
      <div className="webcam-flex-row">
        {isCameraOn && (
          <div className="webcam-box">
            <Webcam
              className="webcam-video"
              audio={false}
              ref={webcamRef}
              screenshotFormat="image/png"
              width={640}
              height={480}
              videoConstraints={videoConstraints}
            />
            <div className="webcam-label">Камера</div>
          </div>
        )}
        {screenshot && (
          <div className="webcam-box">
            <img src={screenshot} alt="Скрийншот" className="webcam-screenshot" />
            <div className="webcam-label">Скрийншот</div>
          </div>
        )}
      </div>
    </div>
  );
};

export default WebcamComponent;
