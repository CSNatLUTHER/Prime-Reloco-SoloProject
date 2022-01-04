import React, { useState } from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { Link } from 'react-router-dom';
import './JoinMoveEvent.css';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { useHistory } from 'react-router-dom';
import Swal from 'sweetalert2';

// Basic functional component structure for React with default state
// value setup. When making a new component be sure to replace the
// component name TemplateFunction with the name for the new component.
function JoinMoveEvent(props) {
  //define dispatch
  const dispatch = useDispatch();
  // Using hooks we're creating local state for a "heading" variable with
  // a default value of 'Functional Component'
  const store = useSelector((store) => store);
  const [heading, setHeading] = useState('JOIN MOVE EVENT');
  const [joinCode, setJoinCode] = useState({
                                            user: store.user.id,
                                            eventCode: '',
                                            done: () => {
                                              history.push('/move_event_home')
                                            }
                                           });

  const handleCodeChange = (event) => {
    let code = event.target.value.toUpperCase()
    setJoinCode({...joinCode, eventCode:code})
  }

  function isAlphaOnly(str) {
    return /^[A-Z]+$/.test(str);
  }

  const validateData = () => {
    if(joinCode.eventCode.length===8 && isAlphaOnly(joinCode.eventCode)===true){
      joinEvent()
    }
    else{

      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Entry does not appear to be a valid code.',
        width: '90%',
        iconColor: '#3f51b5',
        confirmButtonColor:'#ffc400'
      })
    }
  }
  
  const history = useHistory()

  const joinEvent = () => {
    dispatch({type: 'JOIN_EVENT', payload: joinCode })
  }


  return (
    <div className='component'>
      <h2 className='joinEventSubHeader'>{heading}</h2>
      <TextField
      id="moveEventCode"
      label='MOVE EVENT CODE'
      type="required"
      value={joinCode.eventCode}
      onChange={handleCodeChange}
      className='joinEventGeneralTextField'
      />
      <br />
      <br />
      <Button color="secondary" variant="contained" className='joinEventButton' endIcon={<ArrowForwardIosIcon />} onClick={validateData}>JOIN MOVE EVENT</Button>
    </div>
  );
}

export default JoinMoveEvent;
