import React, { useState } from 'react';
import {useSelector} from 'react-redux';
import EventListItem from './EventListItem/EventListItem'

// Basic functional component structure for React with default state
// value setup. When making a new component be sure to replace the
// component name TemplateFunction with the name for the new component.
function moveEventList(props) {
  // Using hooks we're creating local state for a "heading" variable with
  // a default value of 'Functional Component'
  const store = useSelector((store) => store);
  const events = useSelector((store) => store.events);
  const [heading, setHeading] = useState('Move Event List');

  return (
    <div className='component'>
      <h2>{heading}</h2>
      <h4>User Events: {JSON.stringify(events)}</h4>
        {events.map(event => (<EventListItem className="eventListItem" event={event} key={event.id} />))}
      {/* <EventListItem /> */}
    </div>
  );
}

export default moveEventList;
