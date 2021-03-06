import React, { useState } from 'react';
import {useSelector} from 'react-redux';
import EventMember from './EventMember/EventMember'
import './EventMemberList.css'

// Basic functional component structure for React with default state
// value setup. When making a new component be sure to replace the
// component name TemplateFunction with the name for the new component.
function EventMemberList(props) {
  // Using hooks we're creating local state for a "heading" variable with
  // a default value of 'Functional Component'
  const store = useSelector((store) => store);
  const memberList = useSelector((store) => store.active_event_users);
  const [heading, setHeading] = useState('MOVE EVENT MEMBERS');

  return (
    <div className='component'>
      <h2 className='eventMemberListHeader'>{heading}</h2>
      {/* <h4>Member List: {JSON.stringify(memberList)}</h4> */}
      {memberList.map(member => (<EventMember className="eventMember" member={member} key={member.id} />))}
      {/* <EventMember /> */}
    </div>
  );
}

export default EventMemberList;
