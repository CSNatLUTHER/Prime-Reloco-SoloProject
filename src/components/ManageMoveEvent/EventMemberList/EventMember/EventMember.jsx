import React, { useState } from 'react';
import {useSelector, useDispatch} from 'react-redux';

// Basic functional component structure for React with default state
// value setup. When making a new component be sure to replace the
// component name TemplateFunction with the name for the new component.
function EventMember(props) {
  const dispatch = useDispatch();
  // Using hooks we're creating local state for a "heading" variable with
  // a default value of 'Functional Component'
  const store = useSelector((store) => store);
  const [heading, setHeading] = useState('Event Member');

  let userID = store.user.id;
  let creatorID = props.member.creator_user_id;
  let memberID = props.member.id;

  const [leaveDetails, setLeaveDetails] = useState({
    event_id: store.active_event.id, 
    user_id: props.member.id
    });

  const removeMember = () => {
  console.log('Remove Member', leaveDetails);
  dispatch({type:'LEAVE_EVENT', payload: leaveDetails })
  }

  return (
    <div className='component'>
      <h2>{heading}</h2>
      {( userID === creatorID && userID != memberID )?
              <button onClick={removeMember}>Remove Member</button>:
              <></>       
       }
      <p>User ID:{JSON.stringify(store.user.id)}</p>
      <p>Creator ID:{JSON.stringify(props.member.creator_user_id)}</p>
      <p>{JSON.stringify(props.member)}</p>
    </div>
  );
}

export default EventMember;
