import React, { useState } from 'react';
import {useSelector} from 'react-redux';
import NewMoveEvent from '../CreateMoveEvent/NewMoveEvent/NewMoveEvent';
import JoinMoveEvent from '../CreateMoveEvent/JoinMoveEvent/JoinMoveEvent';

// Basic functional component structure for React with default state
// value setup. When making a new component be sure to replace the
// component name TemplateFunction with the name for the new component.
function CreateMoveEvent(props) {
  // Using hooks we're creating local state for a "heading" variable with
  // a default value of 'Functional Component'
  const store = useSelector((store) => store);
  const [heading, setHeading] = useState('Create Move Event');
  const [newMove, setNewMove] = useState(false);
  const [joinMove, setJoinMove] = useState(false);
  

  return (
    <div className='component'>
      <h2>{heading}</h2>
      {newMove?
        <NewMoveEvent />:
        <button onClick={() => setNewMove(true)}>Create New Move Event</button>
      }
      <br />
      <br />
      { joinMove?
        <JoinMoveEvent />:
        <button onClick={() => setJoinMove(true)}>Join a Move Event</button>
      }
    </div>
  );
}

export default CreateMoveEvent;
