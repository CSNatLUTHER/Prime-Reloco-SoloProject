import React, { useState } from 'react';
import {useDispatch, useSelector} from 'react-redux';
import QRCodeScan from '../../SharedComponents/QRCodeScan/QRCodeScan';
import { Link } from 'react-router-dom';
import DelayLink from 'react-delay-link';
import './AddItemToBox.css'
import TextField from '@mui/material/TextField';
import QrCodeScannerIcon from '@mui/icons-material/QrCodeScanner';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { useHistory } from 'react-router-dom';
import Swal from 'sweetalert2';

function addItemToBox(props) {
  const dispatch = useDispatch()
  // Using hooks we're creating local state for a "heading" variable with
  // a default value of 'Functional Component'
  const store = useSelector((store) => store);
  const [heading, setHeading] = useState('ADD ITEM TO BOX');
  const [scanning, setScanning] = useState(false);
  const [box, setBox] = useState({
                          item_id:store.active_item.id,
                          boxQr:'',
                          user: store.user.id,
                          event: store.active_event.id,
                          done: () => {
                            history.push('/box_info')
                          }
                        });

  const handleQrChange = (event) => {
    setBox({ ...box, boxQr: event.target.value })
  }

  const receiveQrCode = (event) => {
    setBox({...box, boxQr: event})
    setScanning(false)
  }

  const history = useHistory()

  const validateData = () => {
    if(box.boxQr != ''){
      putItemInBox()
    }
    else{
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'QR code appears invalid',
        width: '90%',
        iconColor: '#3f51b5',
        confirmButtonColor:'#ffc400'
      })
    }
  }

  const putItemInBox = async () => {
      dispatch({ type: 'PUT_ITEM_IN_BOX', payload: box })
      dispatch({ type: 'UPDATE_ITEM_DESTINATION', payload: box });
  } 
  const scanClick = () => {
    setScanning(!scanning)
  }

  return (
    <div className='component'>
      <h2 className='addItemToBoxHeader'>{heading}</h2>
      <div className='addItemToBoxContainer'>
        <div>
          <TextField
              id="addItemQrScanOutlined-search"
              label="SCAN BOX QR CODE"
              type="search"
              value={box.boxQr}
              onChange={handleQrChange}
              className='addItemToBoxTextField'
            />
        </div>
        <div>
          <IconButton onClick={scanClick} size="large" color="primary">
            <QrCodeScannerIcon className='addItemtoBoxQrIconButton'/>
          </IconButton>
        </div>
      </div>
      {scanning==true?
      <QRCodeScan qr={receiveQrCode} />:
      <></>}
      <br />
      <Button color="secondary" variant="contained" className='addItemToBoxButton' endIcon={<ArrowForwardIosIcon />} onClick={() => {setTimeout(validateData, 250)}}>ADD ITEM TO BOX</Button>
    </div>
  );
}

export default addItemToBox;
