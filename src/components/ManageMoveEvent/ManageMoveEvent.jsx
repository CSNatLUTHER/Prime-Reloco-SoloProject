import React, { useEffect, useState } from 'react';
import {useDispatch, useSelector} from 'react-redux';
import EventMemberList from './EventMemberList/EventMemberList';
import LeaveMoveEvent from './LeaveMoveEvent/LeaveMoveEvent';
import ShareMoveEvent from './ShareMoveEvent/ShareMoveEvent';

// Basic functional component structure for React with default state
// value setup. When making a new component be sure to replace the
// component name TemplateFunction with the name for the new component.
function ManageMoveEvent(props) {
  //define dispatch
  const dispatch = useDispatch()
  // Using hooks we're creating local state for a "heading" variable with
  // a default value of 'Functional Component'
  const store = useSelector((store) => store);
  const [heading, setHeading] = useState('Manage Move Event');

  return (
    <div className='component'>
      <h2>{heading}</h2>
      <p>{JSON.stringify(store.active_event)}</p>
      <EventMemberList />

      {/* If event.owner.id === user.id, show ShareMoveEvent, otherwise show LeaveMoveEvent Write ternary operator below*/}
      {(store.user.id === store.active_event.creator_user_id)?
            <ShareMoveEvent />:
            <LeaveMoveEvent />}
      <p>User ID:{JSON.stringify(store.user.id)}</p>
      <p>Creator ID:{JSON.stringify(store.active_event.creator_user_id)}</p>
    </div>
  );
}

export default ManageMoveEvent;
