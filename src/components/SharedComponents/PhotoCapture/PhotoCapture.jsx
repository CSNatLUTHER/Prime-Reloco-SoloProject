import React, { useState } from 'react';
import {useSelector} from 'react-redux';
import Webcam from "react-webcam";
import './PhotoCapture.css'

// Basic functional component structure for React with default state
// value setup. When making a new component be sure to replace the
// component name TemplateFunction with the name for the new component.
function PhotoCapture(props) {
  // Using hooks we're creating local state for a "heading" variable with
  // a default value of 'Functional Component'
  const store = useSelector((store) => store);
  const [heading, setHeading] = useState('Photo Capture Component');
  
  const webcamRef = React.useRef(null);
  const [imgSrc, setImgSrc] = React.useState(null);

  const [showCamera, setShowCamera] = useState(true);
  
  const videoConstraints = {
    facingMode: "environment"
  };

  const capture = React.useCallback(() => {
    const imageSrc = webcamRef.current.getScreenshot();
    setImgSrc(imageSrc);
    setShowCamera(false)
  }, [webcamRef, setImgSrc]);

  return (
    <div>
      <h2>{heading}</h2>
      {showCamera?
        <>
          <Webcam
            audio={false}
            ref={webcamRef}
            screenshotFormat="image/jpeg"
            videoConstraints={videoConstraints}
          />
          <br />
          <button onClick={capture}>Capture photo</button>
        </>:
          <img
            className = 'screenShot'
            src={imgSrc}
          />
      } 
    </div>
  );
}

export default PhotoCapture;
