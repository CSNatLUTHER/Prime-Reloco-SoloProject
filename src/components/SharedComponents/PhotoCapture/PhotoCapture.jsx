import React, { useState } from 'react';
import {useDispatch, useSelector} from 'react-redux';
import Webcam from "react-webcam";
import './PhotoCapture.css'
import CameraIcon from '@mui/icons-material/Camera';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';

// Basic functional component structure for React with default state
// value setup. When making a new component be sure to replace the
// component name TemplateFunction with the name for the new component.
function PhotoCapture(props) {
  //define dispatch
  const dispatch = useDispatch();
  // Using hooks we're creating local state for a "heading" variable with
  // a default value of 'Functional Component'
  const store = useSelector((store) => store);
  const [heading, setHeading] = useState('Photo Capture Component');
  
  const webcamRef = React.useRef(null);
  const [imgSrc, setImgSrc] = React.useState(null);

  const [showCamera, setShowCamera] = useState(true);
  
  const videoConstraints = {
    facingMode: "environment",
    // width: { min: 640, ideal: 1920, max: 1920 },
    // height: { min: 400, ideal: 1080 },
    aspectRatio: 1.777777778,
    frameRate: { max: 30 }
  };

  const capture = React.useCallback(() => {
    const imageSrc = webcamRef.current.getScreenshot();
    setImgSrc(imageSrc);
    setShowCamera(false);
    dispatch({type: 'SET_PHOTO_CAPTURE', payload:{data:imageSrc}})
    dispatch({type:'FETCH_PHOTO_URL'})
  }, [webcamRef, setImgSrc]);

  return (
    <div className='cameraDiv'>
      {showCamera?
        <>
        <div className = 'screenShotDiv'>
            <Webcam
              audio={false}
              ref={webcamRef}
              className = 'screenShot'
              screenshotFormat="image/jpeg"
              videoConstraints={videoConstraints}
            />
          </div>
          {/* <br /> */}
          {/* <button onClick={capture}>Capture photo</button> */}
          <IconButton onClick={capture} color="primary" aria-label="add to shopping cart">
            <CameraIcon className='photoCaptureButton'/>
          </IconButton>
        </>:
          <>
            <img
              className = 'screenShot'
              src={imgSrc}
            />
            {/* <p className='imageData'>Image Data:{JSON.stringify(imgSrc)}</p> */}
            {/* <button onClick={() => {setShowCamera(true)}}>Retake Image</button> */}
            <Button color="secondary" variant="contained" className='retakeImageButton' onClick={() => {setShowCamera(true)}}>RETAKE PHOTO</Button>

          </>
      } 
    </div>
  );
}

export default PhotoCapture;
