import React, { useState } from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { Link } from 'react-router-dom';

// Basic functional component structure for React with default state
// value setup. When making a new component be sure to replace the
// component name TemplateFunction with the name for the new component.
function NewMoveEvent(props) {
  //define dispatch 
  const dispatch = useDispatch()
  // Using hooks we're creating local state for a "heading" variable with
  // a default value of 'Functional Component'
  const store = useSelector((store) => store);
  const [heading, setHeading] = useState('New Move Event Form');
  const [newEvent, setNewEvent] = useState({ 
                                      event_name: '', 
                                      move_date: '',
                                      user_id: store.user.id, 
                                      share_code: codeCreate(8)
                                  });

  const handleNameChange = (event) => {
    setNewEvent({ ...newEvent, event_name: event.target.value })
  }

  const handleDateChange = (event) => {
    setNewEvent({ ...newEvent, move_date: event.target.value })
  }

  const addNewEvent = () => {
    dispatch({ type: 'CREATE_EVENT', payload: newEvent });
  }

  function codeCreate(length) {
    var result           = '';
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }

  return (
    <div className='component'>
      <h2>{heading}</h2>
      <p>Move Event Title:</p><input type="text" placeholder='ex. NYC MOVE' onChange={handleNameChange}/>
      <p>Move Date:</p><input type="date" onChange={handleDateChange}/>
      <br />
      <Link to="/move_event_home">
      <button onClick={addNewEvent}>Create Move Event</button>
      </Link>
      <br />
      <p>{JSON.stringify(newEvent)}</p>
    </div>
  );
}

export default NewMoveEvent;
