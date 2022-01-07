import React, { useEffect, useState } from 'react';
import {useSelector} from 'react-redux';
import qrCodeReducer from '../../../redux/reducers/qr_code.reducer';
import QRCodeScan from '../../SharedComponents/QRCodeScan/QRCodeScan';
import { Link, useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import Button from '@mui/material/Button';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';
import TextField from '@mui/material/TextField';
import QrCodeScannerIcon from '@mui/icons-material/QrCodeScanner';
import IconButton from '@mui/material/IconButton';
import MenuItem from '@mui/material/MenuItem';
import './BoxEditForm.css';
import Swal from 'sweetalert2';


// Basic functional component structure for React with default state
// value setup. When making a new component be sure to replace the
// component name TemplateFunction with the name for the new component.
function boxEditForm(props) {
  const dispatch = useDispatch();
  // Using hooks we're creating local state for a "heading" variable with
  // a default value of 'Functional Component'
  const store = useSelector((store) => store);
  const [heading, setHeading] = useState('Box Edit Form');
  const [scanning, setScanning] = useState(false);
  const [editBox, setEditBox] = useState({
    id: store.active_box.id,
    qr: store.active_box.qr_id,
    box_name: store.active_box.name,
    box_size: store.active_box.size,
    box_weight: store.active_box.weight,
    destination: store.active_box.destination_id,
    creator_user_id: store.active_box.creator_user_id,
    event: store.active_box.event_id,
    last_modified_user_id: store.user.id,
    done: () => {
      history.push('/box_info')
    }
  });

const handleNameChange = (event) => {
  setEditBox({ ...editBox, box_name: event.target.value })
};

const handleBoxSizeChange = (event) => {
  setEditBox({ ...editBox, box_size: event.target.value })
};

const handleBoxWeightChange = (event) => {
  setEditBox({ ...editBox, box_weight: event.target.value })
};

const handleDestinationChange = (event) => {
  setEditBox({ ...editBox, destination: event.target.value })
};

const handleQrChange = (event) => {
  setEditBox({ ...editBox, qr: event })
  setScanning(false)
};

const updateQrChange = (event) => {
  setEditBox({...editBox, qr: event.target.value})
};

const history = useHistory();

const updateBox = () => {
  props.editBox()
  dispatch({ type: 'UPDATE_BOX', payload: editBox })         
  // dispatch({ type: 'UNSET_QR_CODE' })
};

const scanClick = () => {
  setScanning(!scanning)
};

const cancelUpdateBox = () => {
  props.editBox()
};

const validateData = () => {
  if(editBox.qr != '' && editBox.box_name != '' && editBox.destination != 0 && editBox.box_size != '' && editBox.box_weight != '' ){
    updateBox()
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
};

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
        <div className='editBoxFormQrTextFieldDiv'>
          <TextField
              id="outlined-required"
              label='QR CODE'
              type="required"
              value={editBox.qr}
              onChange={updateQrChange}
              className='editBoxFormQrTextField'
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
          label='BOX NAME'
          type="required"
          value={editBox.box_name}
          onChange={handleNameChange}
          className='editBoxFormGeneralTextField'
        />
      <br />
      <br />
      <TextField
          id="outlined-select-currency"
          select
          label="BOX SIZE"
          value={editBox.box_size}
          onChange={handleBoxSizeChange}
          className='editBoxFormGeneralTextField'
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
          value={editBox.box_weight}
          onChange={handleBoxWeightChange}
          className='editBoxFormGeneralTextField'
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
        value={editBox.destination}
        onChange={handleDestinationChange}
        className='editBoxFormGeneralTextField'
      >
        {destination.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </TextField>
      <br />
      <br />
      <Button color="secondary" variant="contained" className='editBoxFormCreateItemButton' endIcon={<ArrowForwardIosIcon />} onClick={validateData}>UPDATE BOX INFO</Button>
      <br />
      <br />
      <Button color="error" variant="outlined" className='editBoxFormCreateItemButton' endIcon={<CancelOutlinedIcon />} onClick={cancelUpdateBox}>CANCEL BOX UPDATE</Button>
      {/* <p>editBox:{JSON.stringify(editBox)}</p> */}
    </div>
  );
}

export default boxEditForm;
