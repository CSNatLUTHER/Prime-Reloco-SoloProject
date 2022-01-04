import React, { useState } from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { Link } from 'react-router-dom';
import './LeaveMoveEvent.css';
import Button from '@mui/material/Button';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import { useHistory } from 'react-router-dom';
import Swal from 'sweetalert2';

// Basic functional component structure for React with default state
// value setup. When making a new component be sure to replace the
// component name TemplateFunction with the name for the new component.
function LeaveMoveEvent(props) {
  const dispatch = useDispatch()
  // Using hooks we're creating local state for a "heading" variable with
  // a default value of 'Functional Component'
  const store = useSelector((store) => store);
  const [heading, setHeading] = useState('LEAVE MOVE EVENT');
  const [leaveDetails, setLeaveDetails] = useState({
                                            event_id: store.active_event.id, 
                                            user_id: store.user.id
                                            });

  const leaveEventConfirm = () => { 
    Swal.fire({
      title: 'Are you sure you want to leave '+ store.active_event.name + '?',
      text: "To undo this action, you will need to rejoin the move event through the event 'Share Code'.",
      icon: 'question',
      width: '90%',
      iconColor: '#3f51b5',
      showCancelButton: true,
      confirmButtonColor: '#3f51b5',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, Remove me!',
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: 'You have successfully left ' + store.active_event.name + '.',
          icon: 'success',
          width: '90%',
          iconColor: '#3f51b5',
          confirmButtonColor: '#ffc400'
        })
        leaveEvent()
      }
    })
    // if(confirm('Are you sure you want to leave '+ store.active_event.name + '? You will be able to join again with the appropriate event code.')){
    //   leaveEvent()
    // }
  }                                        

  const history = useHistory()

  const leaveEvent = () => {
    console.log('In leaveEvent', leaveDetails);
    dispatch({type:'LEAVE_EVENT', payload: leaveDetails })
    history.push('/user')
  }

  return (
    <div className='component'>
      <Button color="secondary" variant="contained" className='leaveMoveEventButton' endIcon={<ExitToAppIcon />} onClick={() => {setTimeout(leaveEventConfirm, 250)}}>LEAVE EVENT</Button>
    </div>
  );
}

export default LeaveMoveEvent;
