import React, { useRef, useState } from 'react';
import Webcam from 'react-webcam';
import './WebcamComponent.css';

const WebcamComponent = () => {
  const webcamRef = useRef(null);
  const [isCameraOn, setIsCameraOn] = useState(false);
  const [screenshot, setScreenshot] = useState(null);

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

      //backendsend the ss
     
      alert('Скрийншотът е направен и е готов за изпращане към DeepFace!');
    }
  };

  return (
    <div className="cameraContainer">
      <div className="webcam-controls">
        <button className="StartCamera" onClick={startCamera} disabled={isCameraOn}>Включи камера</button>
        <button className="StopCamera" onClick={stopCamera} disabled={!isCameraOn}>Изключи камера</button>
        <button className="TakeScreenshot" onClick={takeScreenshot} disabled={!isCameraOn}>Снимай и изпрати</button>
      </div>
      <div className="webcam-flex-row">
        {isCameraOn && (
          <div className="webcam-box">
            <Webcam
              className="webcam-video"
              audio={false}
              ref={webcamRef}
              screenshotFormat="image/jpeg"
              width={320}
              height={240}
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
