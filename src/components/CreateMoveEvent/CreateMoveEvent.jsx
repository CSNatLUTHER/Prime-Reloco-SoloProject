import React, { useState } from 'react';
import {useSelector} from 'react-redux';
import NewMoveEvent from '../CreateMoveEvent/NewMoveEvent/NewMoveEvent';
import JoinMoveEvent from '../CreateMoveEvent/JoinMoveEvent/JoinMoveEvent';
import Button from '@mui/material/Button';
import './CreateMoveEvent.css';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';


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
    <div>
      {newMove?
        <>
          <NewMoveEvent />
          <JoinMoveEvent />
        </>:
        <Button color="secondary" variant="contained" className='newMoveButton' endIcon={<ArrowForwardIosIcon />} onClick={() => setNewMove(true)}>Create or Join New Event</Button>
      }
    </div>
  );
}

export default CreateMoveEvent;
