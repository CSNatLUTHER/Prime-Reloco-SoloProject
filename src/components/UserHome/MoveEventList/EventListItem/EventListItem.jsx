import React, { useState } from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { Link } from 'react-router-dom';

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
    console.log('In setActiveEvent', props);
    dispatch({type: 'SET_ACTIVE_EVENT', payload: props})
  }

  return (
    <div>
      <h2>{heading}</h2>
      <h4>{JSON.stringify(props)}</h4>
      <Link to="/move_event_home">
      <button onClick={setActiveEvent}>Select Event</button>
      </Link>
    </div>
  );
}

export default eventListItem;
