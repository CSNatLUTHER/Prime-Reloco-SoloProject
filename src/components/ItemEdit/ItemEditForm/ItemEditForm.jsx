import React, { useState, useEffect } from 'react';
import {useSelector, useDispatch} from 'react-redux';
import QRCodeScan from '../../SharedComponents/QRCodeScan/QRCodeScan';
import PhotoCapture from '../../SharedComponents/PhotoCapture/PhotoCapture';
import { useHistory } from "react-router-dom";
import './ItemEditForm.css';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import Button from '@mui/material/Button';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';
import TextField from '@mui/material/TextField';
import QrCodeScannerIcon from '@mui/icons-material/QrCodeScanner';
import IconButton from '@mui/material/IconButton';
import MenuItem from '@mui/material/MenuItem';
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera';
import EditIcon from '@mui/icons-material/Edit';
import Swal from 'sweetalert2';
import InputAdornment from '@mui/material/InputAdornment';

// Basic functional component structure for React with default state
// value setup. When making a new component be sure to replace the
// component name TemplateFunction with the name for the new component.
function itemEditForm(props) {
  const dispatch = useDispatch();
  // Using hooks we're creating local state for a "heading" variable with
  // a default value of 'Functional Component'
  const store = useSelector((store) => store);
  const [heading, setHeading] = useState('EDIT ITEM');
  const [goingInBox, setGoingInBox] = useState(false);
  const [imageToDisplay, setImageToDisplay] = useState('/images/image.png')
  const [capturePhoto, setCapturePhoto] = useState(false);
  const [scanning, setScanning] = useState(false);
  const [newItem, setNewItem] = useState({ 
                                  qr: store.active_item.qr_id, 
                                  item_name: store.active_item.name, 
                                  put_in_box: store.active_item.put_in_box, 
                                  value:store.active_item.value, 
                                  destination: store.active_item.destination_id, 
                                  creator_user_id:store.active_item.creator_user_id,
                                  event:store.active_item.event_id,
                                  last_modified_user_id: store.user.id,
                                  image_url:store.active_item.image_path,
                                  id: store.active_item.id
                                });

useEffect( () => {
  const myTimeout = setTimeout(getImage, 500)
}, []);

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
      })
    }
  }

  const getImage = () =>{
    const url = store.active_item.image_path
    if (store.active_item.image_path != '/images/image.png'){
      fetch(url)
      .then(response => response.body)
      .then(rb => {
        const reader = rb.getReader();

        return new ReadableStream({
          start(controller) {
            // The following function handles each data chunk
            function push() {
              // "done" is a Boolean and value a "Uint8Array"
              reader.read().then( ({done, value}) => {
                // If there is no more data to read
                if (done) {
                  // console.log('done', done);
                  controller.close();
                  return;
                }
                // Get the data and send it to the browser via the controller
                controller.enqueue(value);
                // Check chunks by logging to the console
                // console.log(done, value);
                push();
              })
            }

          push();
        }
      });
      })
      .then(stream => {
      // Respond with our stream
      return new Response(stream, { headers: { "Content-Type": "text/html" } }).text();
      })
      .then(result => {
      // Do things with result
      setImageToDisplay(result)
      // console.log(result);
      });
    }
  }

  const validateData = () => {
    if (newItem.put_in_box === false){
      if(newItem.qr != '' && newItem.item_name != '' && newItem.destination != 0){
        updateItem()
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
        updateItem()
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

  const history = useHistory()

  const updateItem = async () => {
    let url = newItem.image_url
    if (store.photo.url != '/images/image.png') {
      url = store.photo.url.split('?')[0]
    }
    const result = await postImageData();
    console.log(result);
    dispatch({
      type: 'UPDATE_ITEM', 
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
        id: newItem.id,
        done: () => {
          history.push('/item_info');
        }
      }
    }),
      dispatch({ type: 'UNSET_QR_CODE' })
    dispatch({ type: 'UNSET_PHOTO_URL' })
    dispatch({ type: 'UNSET_PHOTO_CAPTURE' })
    // setTimeout(moveToPage, 1000)
  }

  // const moveToPage = () => {
  //   history.push('/item_info')
  // }

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

  const handleAddItemPhoto = () => {
    setNewItem({...newItem, image_url:''})
  }

  return (
    <div className='component'>
      <h2>EDIT '{newItem.item_name}'</h2>
      <FormControlLabel
        sx={{
          display: 'block',
        }}
        control={
          <Switch
            checked={newItem.put_in_box}
            onChange={handleGoingInBoxChange}
            name="loading"
            color="secondary"
          />
        }
        label="Going In Box"
      />
      <br />
      <div className='searchContainer'>
        <div className='itemEditFormQrTextFieldDiv'>
          <TextField
              id="outlined-required"
              label={newItem.put_in_box?
                      <>QR CODE (optional)</>:
                      <>QR CODE (required)</>
                    }
              type="required"
              value={newItem.qr}
              onChange={updateQrCode}
              className='itemEditFormQrTextField'
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
        value={newItem.value}
        onChange={handleValueChange}
        className='generalTextField'
      />
      <br />
      <br />
      {!newItem.put_in_box?
        <>
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
          </TextField>
          <br />
          <br />
        </> :
        <></>
      }
        {newItem.image_url === '/images/image.png'?
          <>
            {capturePhoto?
              <>
                <Button color="secondary" variant="contained" className='captureImageButton' endIcon={<PhotoCameraIcon />} onClick={() => {setCapturePhoto(false)}}>CANCEL PHOTO</Button>
                <br />
                <br />
                <PhotoCapture/>
              </>:
              <Button color="secondary" variant="contained" className='captureImageButton' endIcon={<PhotoCameraIcon />} onClick={() => {setCapturePhoto(true)}}>ADD ITEM PHOTO</Button>
            }
          </>:
          <>
            {capturePhoto?
              <>
              <Button color="secondary" variant="contained" className='captureImageButton' endIcon={<PhotoCameraIcon />} onClick={() => {setCapturePhoto(false)}}>CANCEL PHOTO</Button>
              <br />
              <br />
              <PhotoCapture/>
              </>:
              <>
                <img className='itemEditFormPhoto' src={imageToDisplay} alt="" />
                <br />
                <Button color="secondary" variant="contained" className='captureImageButton' startIcon={<EditIcon />}endIcon={<PhotoCameraIcon />} onClick={() => {setCapturePhoto(true)}}>TAKE NEW PHOTO</Button>
              </>
            }
          </>
        }
        <br />
        <br />
        <br />
        <Button color="secondary" variant="contained" className='itemEditButton' endIcon={<ArrowForwardIosIcon />} onClick={()=>{setTimeout(validateData, 250)}}>UPDATE ITEM</Button>
        <br />
        <br />
        <Button color="error" variant="outlined" className='itemEditButton' endIcon={<CancelOutlinedIcon />} onClick={()=>{setTimeout(props.editItem, 250)}}>CANCEL ITEM UPDATE</Button>
    </div>
  );
}

export default itemEditForm;
