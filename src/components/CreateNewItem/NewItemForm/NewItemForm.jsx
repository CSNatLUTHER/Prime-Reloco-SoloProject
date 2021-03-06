import React, { useState } from 'react';
import {useDispatch, useSelector} from 'react-redux';
import QRCodeScan from '../../SharedComponents/QRCodeScan/QRCodeScan';
import { Link } from 'react-router-dom';
import { user } from 'pg/lib/defaults';
import '../NewItemForm/NewItemForm.css'
import PhotoCapture from '../../SharedComponents/PhotoCapture/PhotoCapture';
import DelayLink from 'react-delay-link';
import { useHistory } from "react-router-dom";
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import Button from '@mui/material/Button';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import TextField from '@mui/material/TextField';
import QrCodeScannerIcon from '@mui/icons-material/QrCodeScanner';
import IconButton from '@mui/material/IconButton';
import MenuItem from '@mui/material/MenuItem';
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera';
import Swal from 'sweetalert2';
import InputAdornment from '@mui/material/InputAdornment';

// Basic functional component structure for React with default state
// value setup. When making a new component be sure to replace the
// component name TemplateFunction with the name for the new component.
function newItemForm(props) {
  // define dispatch
  const dispatch = useDispatch();
  // Using hooks we're creating local state for a "heading" variable with
  // a default value of 'Functional Component'
  const store = useSelector((store) => store);
  const [heading, setHeading] = useState('New Item Form');
  const [goingInBox, setGoingInBox] = useState(false);
  const [capturePhoto, setCapturePhoto] = useState(false);
  const [scanning, setScanning] = useState(false);
  const [newItem, setNewItem] = useState({ 
                                  qr: '', 
                                  item_name: '', 
                                  put_in_box: false, 
                                  value: 0, 
                                  destination: 0, 
                                  creator_user_id:store.user.id,
                                  event:store.active_event.id,
                                  last_modified_user_id: store.user.id,
                                  image_url: '/images/image.png'});


  const handleNameChange = (event) => {
      setNewItem({ ...newItem, item_name: event.target.value })
  }
  
  const handleValueChange = (event) => {
      setNewItem({ ...newItem, value: event.target.value })
  }

  const handleDestinationChange = (event) => {
      setNewItem({ ...newItem, destination: event.target.value })
  }

  const handleQrChange = (event) => {
    setNewItem({ ...newItem, qr: event })
    setScanning(false)
  }

  const updateQrCode = (event) => {
    setNewItem({ ...newItem, qr: event.target.value })
  }
  
  const handleGoingInBoxChange = (event) => {
    if(newItem.put_in_box === false){
      setNewItem({ ...newItem, put_in_box: true, destination: 6 })
    }
    else{
      setNewItem({ ...newItem, put_in_box: false, destination: 0 })
    }
  }
  
  const postImageData = async () => {
    if(store.photo.url != '/images/image.png'){
      // console.log('store.photo.url was not default', store.photo.url);
      const url = store.photo.url;
      // setNewItem({ ...newItem, image_url: url.split('?')[0] })
      return await fetch(url,{
        method: 'PUT',
        headers: {
          'Content-Type' : 'jpeg'
        },
        body: store.photo_capture.data
      });
    }
  }
  

  const validateData = () => {
    if (newItem.put_in_box === false){
      if(newItem.qr != '' && newItem.item_name != '' && newItem.destination != 0){
        addNewItem()
      }
      else{
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Must complete all required fields',
          width: '90%',
          iconColor: '#3f51b5',
          confirmButtonColor:'#ffc400'
        })
      }
    }
    else{
      if(newItem.item_name != '' && newItem.destination != 0){
        addNewItem()

      }
      else{
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Must complete all required fields',
          width: '90%',
          iconColor: '#3f51b5',
          confirmButtonColor:'#ffc400'
        })
      }
    }
  }

  const history = useHistory();

  const addNewItem =  async () => {
    try{
      const url = store.photo.url.split('?')[0];        
      const result = await postImageData();
      console.log(result);
      dispatch({
        type: 'ADD_ITEM',
        payload: {
          qr: newItem.qr,
          item_name: newItem.item_name,
          put_in_box: newItem.put_in_box,
          value: newItem.value,
          destination: newItem.destination,
          creator_user_id: store.user.id,
          event: store.active_event.id,
          last_modified_user_id: store.user.id,
          image_url: url,
          done: () => {
            history.push('/item_info');
          }
        }
      });         
      dispatch({ type: 'UNSET_QR_CODE' });
      dispatch({ type: 'UNSET_PHOTO_URL'});
      dispatch({ type: 'UNSET_PHOTO_CAPTURE'});
      // setTimeout(()=>{history.push('/item_info')}, 1000);
    } catch (err) {
      console.error('addNewItem Error:', err);
    }
  }

  const scanClick = () => {
    setScanning(!scanning)
  }

  const destination = [
    {
      value: 0,
      label: 'CHOOSE DESTINATION',
    },
    {
      value: 1,
      label: 'MOVE',
    },
    {
      value: 2,
      label: 'STORE',
    },
    {
      value: 3,
      label: 'SELL',
    },
    {
      value: 4,
      label: 'DONATE',
    },
    {
      value: 5,
      label: 'PURGE',
    },
    {
      value: 6,
      label: 'GOING IN BOX',
    },
  ];
  

  return (
    <div className='component'>
      <FormControlLabel
        sx={{
          display: 'block',
        }}
        control={
          <Switch
            // checked={}
            onChange={handleGoingInBoxChange}
            name="loading"
            color="secondary"
          />
        }
        label="Going In Box"
      />
      <br />
      <div className='searchContainer'>
        <div className='qrTextFieldDiv'>
          <TextField
              id="outlined-required"
              label={newItem.put_in_box?
                      <>QR CODE (optional)</>:
                      <>QR CODE (required)</>
                    }
              type="required"
              value={newItem.qr}
              onChange={updateQrCode}
              className='qrTextField'
            />
        </div>
        <div className='qrIconButtonDiv'>
          <IconButton onClick={scanClick} size="large" color="primary">
            <QrCodeScannerIcon className='qrIconButton'/>
          </IconButton>
        </div>
      </div>
      {scanning==true?
      <QRCodeScan qr={handleQrChange} />:
      <></>}
      <br />
      <TextField
          id="outlined-required"
          label='ITEM NAME'
          type="required"
          value={newItem.item_name}
          onChange={handleNameChange}
          className='generalTextField'
        />
        <br />
        <br />
      <TextField
        id="outlined-number"
        label="ITEM VALUE (Whole Dollars)"
        InputProps={{
          startAdornment: <InputAdornment position="start">$</InputAdornment>,
        }}
        type="number"
        onChange={handleValueChange}
        className='generalTextField'
      />
      <br />
      <br />
      {!newItem.put_in_box?
        <TextField
          id="outlined-select-currency"
          select
          label="DESTINATION"
          value={newItem.destination}
          onChange={handleDestinationChange}
          className='generalTextField'
        >
          {destination.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>:
        <></>
      }
        <br />
        <br />
        {capturePhoto?
          <>
          <Button color="secondary" variant="contained" className='captureImageButton' endIcon={<PhotoCameraIcon />} onClick={() => {setCapturePhoto(!capturePhoto)}}>CANCEL PHOTO</Button>
          <br />
          <br />
          <PhotoCapture/>
          </>:
          <Button color="secondary" variant="contained" className='captureImageButton' endIcon={<PhotoCameraIcon />} onClick={() => {setCapturePhoto(!capturePhoto)}}>ADD ITEM PHOTO</Button>
        }
        <br />
        <br />
        <br />
        <Button color="secondary" variant="contained" className='createItemButton' endIcon={<ArrowForwardIosIcon />} onClick={validateData}>CREATE ITEM</Button>
    </div>
  );
}

export default newItemForm;
