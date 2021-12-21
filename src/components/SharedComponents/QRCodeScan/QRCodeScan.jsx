import React, { useState } from 'react';
import {useDispatch, useSelector} from 'react-redux';
import QrReader from 'react-qr-reader';


// Basic functional component structure for React with default state
// value setup. When making a new component be sure to replace the
// component name TemplateFunction with the name for the new component.
function QRCodeScan(props) {
  //define dispatch
  const dispatch = useDispatch()
  // Using hooks we're creating local state for a "heading" variable with
  // a default value of 'Functional Component'
  const store = useSelector((store) => store);
  const [heading, setHeading] = useState('QR Code Scan');
  const [scanning, setScanning] = useState(false);
  const [codeFound, setCodeFound] = useState({
                                        id: ''
                                      })


  const handleScan = (data) => {
    if (data) {
      setCodeFound({
        id: data
      })
      setScanning(false)
      dispatch({type:'SET_QR_CODE', payload:{id:data}})
    }
  }
  const handleError = err => {
    console.error(err)
    setScanning(false)
  }

  const scanClick = () => {
    setScanning(true)
  }

  const cancelScan = () => {
    setScanning(false)
  }

  return (
    <div>
        <button onClick={scanClick}>QR</button>
        {scanning==true && codeFound.id ===''?
        <>
        <QrReader
          delay={300}
          onError={handleError}
          onScan={handleScan}
          style={{ width: '100%' }}
          />
          <button onClick={cancelScan}>Cancel</button></>:
          <></>}
        {/* <QRClass /> */}
        <p>Code Found:{JSON.stringify(codeFound)}</p>

    </div>
  );
}

export default QRCodeScan;
