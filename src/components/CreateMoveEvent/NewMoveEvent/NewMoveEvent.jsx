import React, { useState } from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import './NewMoveEvent.css';
import TextField from '@mui/material/TextField';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DatePicker from '@mui/lab/DatePicker';
import Button from '@mui/material/Button';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import Swal from 'sweetalert2';

// Basic functional component structure for React with default state
// value setup. When making a new component be sure to replace the
// component name TemplateFunction with the name for the new component.
function NewMoveEvent(props) {
  //define dispatch 
  const dispatch = useDispatch()
  // Using hooks we're creating local state for a "heading" variable with
  // a default value of 'Functional Component'
  const store = useSelector((store) => store);
  const [heading, setHeading] = useState('NEW MOVE EVENT');
  const [dateValue, setDateValue] = React.useState(new Date());
  const [newEvent, setNewEvent] = useState({ 
                                      event_name: '', 
                                      move_date: dateValue,
                                      user_id: store.user.id, 
                                      share_code: codeCreate(8)
                                  });

  const handleNameChange = (event) => {
    setNewEvent({ ...newEvent, event_name: event.target.value })
  }


  const validateData = () => {
    if(newEvent.move_date>new Date() ){
        if(newEvent.event_name != ''){
          addNewEvent()
        }
        else{
          // alert('"MOVE EVENT NAME" required to proceed.');
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: '"MOVE EVENT NAME" required to proceed.',
            width: '90%',
            iconColor: '#3f51b5',
            confirmButtonColor:'#ffc400'
          })
        }
    }
    else{
      // alert('"MOVE DATE" must be in the future');
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: '"MOVE DATE" must be in the future',
        width: '90%',
        iconColor: '#3f51b5',
        confirmButtonColor:'#ffc400'
      })
    }
  }

  const history = useHistory();

  const addNewEvent = () => {
    dispatch({ type: 'CREATE_EVENT', payload: newEvent });
    setTimeout(moveToEvent, 750)
  }

  const moveToEvent = () => {
    history.push('/move_event_home')
  }

  function codeCreate(length) {
    var result           = '';
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }

  return (
    <div className='component'>
      <h2 className='createEventSubHeader'>{heading}</h2>
      <TextField
      id="eventName"
      label='MOVE EVENT NAME'
      type="required"
      value={newEvent.event_name}
      onChange={handleNameChange}
      className='createEventGeneralTextField'
      />
      <br />
      <br />
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <DatePicker
          disablePast
          label="MOVE DATE"
          openTo="year"
          views={['year', 'month', 'day']}
          value={dateValue}
          onChange={(newValue) => {
            setDateValue(newValue);
            setNewEvent({...newEvent, move_date:newValue})
          }}
          renderInput={(params) => <TextField className="createEventGeneralTextField" {...params} />}
        />
      </LocalizationProvider>
      <br />
      <br />
      <Button color="secondary" variant="contained" className='createEventButton' endIcon={<ArrowForwardIosIcon />} onClick={ () => { setTimeout(validateData, 250) } }>CREATE MOVE EVENT</Button>
    </div>
  );
}

export default NewMoveEvent;
