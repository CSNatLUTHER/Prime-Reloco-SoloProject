import React, { useState } from 'react';
import {useSelector} from 'react-redux';
import EventMemberList from './EventMemberList/EventMemberList';
import LeaveMoveEvent from './LeaveMoveEvent/LeaveMoveEvent';
import ShareMoveEvent from './ShareMoveEvent/ShareMoveEvent';

// Basic functional component structure for React with default state
// value setup. When making a new component be sure to replace the
// component name TemplateFunction with the name for the new component.
function ManageMoveEvent(props) {
  // Using hooks we're creating local state for a "heading" variable with
  // a default value of 'Functional Component'
  const store = useSelector((store) => store);
  const [heading, setHeading] = useState('Manage Move Event');

  return (
    <div className='component'>
      <h2>{heading}</h2>
      <EventMemberList />

      {/* If event.owner.id === user.id, show ShareMoveEvent, otherwise show LeaveMoveEvent Write ternary operator below*/}
      <LeaveMoveEvent />
      <ShareMoveEvent />
    </div>
  );
}

export default ManageMoveEvent;
