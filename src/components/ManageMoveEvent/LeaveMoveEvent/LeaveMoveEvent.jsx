import React, { useState } from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { Link } from 'react-router-dom';

// Basic functional component structure for React with default state
// value setup. When making a new component be sure to replace the
// component name TemplateFunction with the name for the new component.
function LeaveMoveEvent(props) {
  const dispatch = useDispatch()
  // Using hooks we're creating local state for a "heading" variable with
  // a default value of 'Functional Component'
  const store = useSelector((store) => store);
  const [heading, setHeading] = useState('Leave Move Event');
  const [leaveDetails, setLeaveDetails] = useState({
                                            event_id: store.active_event.id, 
                                            user_id: store.user.id
                                            });

  const leaveEvent = () => {
    console.log('In leaveEvent', leaveDetails);
    dispatch({type:'LEAVE_EVENT', payload: leaveDetails })
  }
  return (
    <div className='component'>
      <h2>{heading}</h2>
      <Link to='/user'>
      <button onClick={leaveEvent}>Leave Event</button>
      </Link>
      <p>Leave Details:{JSON.stringify(leaveDetails)}</p>
    </div>
  );
}

export default LeaveMoveEvent;
