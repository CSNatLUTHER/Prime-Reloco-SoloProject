import React, { useState } from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { Link } from 'react-router-dom';

// Basic functional component structure for React with default state
// value setup. When making a new component be sure to replace the
// component name TemplateFunction with the name for the new component.
function JoinMoveEvent(props) {
  //define dispatch
  const dispatch = useDispatch();
  // Using hooks we're creating local state for a "heading" variable with
  // a default value of 'Functional Component'
  const store = useSelector((store) => store);
  const [heading, setHeading] = useState('Join Move Event');
  const [joinCode, setJoinCode] = useState({
                                            user: store.user.id,
                                            eventCode: ''
                                           });

  const handleCodeChange = (event) => {
    setJoinCode({...joinCode, eventCode:event.target.value})
  }

  const joinEvent = () => {
    console.log('In setActiveEvent', props);
    dispatch({type: 'JOIN_EVENT', payload: joinCode })
  }

  return (
    <div className='component'>
      <h2>{heading}</h2>
      <p>Enter Move Event Code:</p>
      <input onChange={handleCodeChange} type="text" placeholder='ex. QUTYRPEBE'/>
      <br />
      <Link to="/move_event_home">
      <button onClick={joinEvent}>Join Move Event</button>
      </Link>
      <p>{JSON.stringify(joinCode)}</p>
    </div>
  );
}

export default JoinMoveEvent;
