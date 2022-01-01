import React, { useState } from 'react';
import {useSelector} from 'react-redux';
import EventListItem from './EventListItem/EventListItem'
import './MoveEventList.css';


// Basic functional component structure for React with default state
// value setup. When making a new component be sure to replace the
// component name TemplateFunction with the name for the new component.
function moveEventList(props) {
  // Using hooks we're creating local state for a "heading" variable with
  // a default value of 'Functional Component'
  const store = useSelector((store) => store);
  const events = useSelector((store) => store.events);
  const [heading, setHeading] = useState('MOVE EVENTS');

  return (
    <div className='component'>
      <h2 className='moveEventListHeader'>{heading}</h2>
      <div className='moveEventListFlexBox'>
        {events.map(event => (<EventListItem className="eventListItem" event={event} key={event.id} />))}
      </div>
    </div>
  );
}

export default moveEventList;
