import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import QRCodeScan from '../../SharedComponents/QRCodeScan/QRCodeScan';
import { useDispatch } from 'react-redux';
import { useHistory } from "react-router-dom";
import Button from '@mui/material/Button';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import TextField from '@mui/material/TextField';
import QrCodeScannerIcon from '@mui/icons-material/QrCodeScanner';
import IconButton from '@mui/material/IconButton';
import MenuItem from '@mui/material/MenuItem';
import './NewBoxForm.css';
import Swal from 'sweetalert2';

function newBoxForm(props) {
  const dispatch = useDispatch()
  // Using hooks we're creating local state for a "heading" variable with
  // a default value of 'Functional Component'
  const store = useSelector((store) => store);
  const [heading, setHeading] = useState('New Box Form');
  const [scanning, setScanning] = useState(false);
  const [newBox, setNewBox] = useState({
    qr: '',
    box_name: '',
    box_size: '',
    box_weight: '',
    destination: '',
    creator_user_id: store.user.id,
    event: store.active_event.id,
    last_modified_user_id: store.user.id,
    done: () => {
      history.push('/box_info')
    }
  });

  const handleNameChange = (event) => {
    setNewBox({ ...newBox, box_name: event.target.value })
  }

  const handleBoxSizeChange = (event) => {
    setNewBox({ ...newBox, box_size: event.target.value })
  }

  const handleBoxWeightChange = (event) => {
    setNewBox({ ...newBox, box_weight: event.target.value })
  }

  const handleDestinationChange = (event) => {
    setNewBox({ ...newBox, destination: event.target.value })
  }

  const handleQrChange = (event) => {
    setNewBox({ ...newBox, qr: event })
    setScanning(false)
  }

  const updateQrCode = (event) => {
    setNewBox({ ...newBox, qr: event.target.value })
  }


  const validateData = () => {
    if (newBox.qr != '' && newBox.box_name != '' && newBox.destination != 0 && newBox.box_size != '' && newBox.box_weight != '') {
      addNewBox()
    }
    else {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Must complete all required fields',
        width: '90%',
        iconColor: '#3f51b5',
        confirmButtonColor: '#ffc400'
      })
    }
  }

  const scanClick = () => {
    setScanning(!scanning)
  }


  const history = useHistory()
  const addNewBox = () => {
    dispatch({ type: 'CREATE_BOX', payload: newBox })
    dispatch({ type: 'UNSET_QR_CODE'});
    // history.push('/new_box_confirmation')

    // if(store.qr_code.id != ''){
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
  ];

  const size = [
    {
      value: 'SMALL',
      label: 'SMALL',
    },
    {
      value: 'MEDIUM',
      label: 'MEDIUM',
    },
    {
      value: 'LARGE',
      label: 'LARGE',
    },
    {
      value: 'WARDROBE',
      label: 'WARDROBE',
    },
    {
      value: 'CRATE',
      label: 'CRATE',
    },
  ];

  const weight = [
    {
      value: 'LIGHT',
      label: 'LIGHT',
    },
    {
      value: 'MEDIUM',
      label: 'MEDIUM',
    },
    {
      value: 'HEAVY',
      label: 'HEAVY',
    },
    {
      value: 'VERY HEAVY',
      label: 'VERY HEAVY',
    },
    {
      value: 'TEAM LIFT',
      label: 'TEAM LIFT',
    },
  ];


  return (
    <div className='component'>
      {/* <h2>{heading}</h2> */}
      <div className='searchContainer'>
        <div className='newBoxFormQrTextFieldDiv'>
          <TextField
            id="outlined-required"
            label='QR CODE'
            type="required"
            value={newBox.qr}
            onChange={updateQrCode}
            className='newBoxFormQrTextField'
          />
        </div>
        <div className='qrIconButtonDiv'>
          <IconButton onClick={scanClick} size="large" color="primary">
            <QrCodeScannerIcon className='qrIconButton' />
          </IconButton>
        </div>
      </div>
      {scanning == true ?
        <QRCodeScan qr={handleQrChange} /> :
        <></>}
      <br />
      <TextField
        id="outlined-required"
        label='BOX NAME'
        type="required"
        value={newBox.box_name}
        onChange={handleNameChange}
        className='newBoxFormGeneralTextField'
      />
      <br />
      <br />
      <TextField
        id="outlined-select-currency"
        select
        label="BOX SIZE"
        value={newBox.box_size}
        onChange={handleBoxSizeChange}
        className='newBoxFormGeneralTextField'
      >
        {size.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </TextField>
      <br />
      <br />
      <TextField
        id="outlined-select-currency"
        select
        label="BOX WEIGHT"
        value={newBox.box_weight}
        onChange={handleBoxWeightChange}
        className='newBoxFormGeneralTextField'
      >
        {weight.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </TextField>
      <br />
      <br />
      <TextField
        id="outlined-select-currency"
        select
        label="DESTINATION"
        value={newBox.destination}
        onChange={handleDestinationChange}
        className='newBoxFormGeneralTextField'
      >
        {destination.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </TextField>
      <br />
      <br />
      <Button color="secondary" variant="contained" className='newBoxFormCreateItemButton' endIcon={<ArrowForwardIosIcon />} onClick={validateData}>CREATE NEW BOX</Button>

    </div>
  );
}

export default newBoxForm;
