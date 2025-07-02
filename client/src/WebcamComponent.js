import React, { useRef, useState } from 'react';

const WebcamComponent = () => {
  const videoRef = useRef(null);
  const [isCameraOn, setIsCameraOn] = useState(false);
  let stream = null;

  const startCamera = async () => {
    if (!isCameraOn) {
      try {
        stream = await navigator.mediaDevices.getUserMedia({ video: true });
        videoRef.current.srcObject = stream;
        setIsCameraOn(true);
      } catch (err) {
        alert('Неуспешно стартиране на камерата!');
      }
    }
  };

  const stopCamera = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      const tracks = videoRef.current.srcObject.getTracks();
      tracks.forEach(track => track.stop());
      videoRef.current.srcObject = null;
      setIsCameraOn(false);
    }
  };

  return (
    <div className = "cameraContainer">
      <div>
        <button onClick={startCamera} disabled={isCameraOn} style={{ marginRight: '10px' }}>Включи камера</button>
        <button onClick={stopCamera} disabled={!isCameraOn}>Изключи камера</button>
      </div>
      <div className = "videoContainer">
        <video ref={videoRef} width="400" height="300" autoPlay style={{ border: '2px solid #333', background: '#000' }} />
      </div>
    </div>
  );
};

export default WebcamComponent;
