import React, { useState } from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { Link } from 'react-router-dom';
import './EventListItem.css'

// Basic functional component structure for React with default state
// value setup. When making a new component be sure to replace the
// component name TemplateFunction with the name for the new component.
function eventListItem(props) {
  //define dispatch
  const dispatch = useDispatch();
  // Using hooks we're creating local state for a "heading" variable with
  // a default value of 'Functional Component'
  const store = useSelector((store) => store);
  const [heading, setHeading] = useState('Event List Item');

  const setActiveEvent = () => {
    console.log('In setActiveEvent', props.event);
    dispatch({type: 'SET_ACTIVE_EVENT', payload: props.event})
  }

  return (
    <div className='component'>
      <h2>{heading}</h2>
      <img className='moveEventImage' src="/images/move_event.png" alt="" />
      <h4>{JSON.stringify(props.event)}</h4>
      <Link to="/move_event_home">
      <button onClick={setActiveEvent}>Select Event</button>
      </Link>
    </div>
  );
}

export default eventListItem;
