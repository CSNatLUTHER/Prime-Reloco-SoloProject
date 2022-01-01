import React, { useEffect, useState } from 'react';
import {useDispatch, useSelector} from 'react-redux';
import ItemSearch from './ItemSearch/ItemSearch';
import BoxSearch from './BoxSearch/BoxSearch';
import { Link } from 'react-router-dom';
import './MoveEventHome.css'
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { useHistory } from 'react-router-dom';


// Basic functional component structure for React with default state
// value setup. When making a new component be sure to replace the
// component name TemplateFunction with the name for the new component.
function MoveEventHome(props) {
  //define dispatch
  const dispatch = useDispatch()

  // Using hooks we're creating local state for a "heading" variable with
  // a default value of 'Functional Component'
  const store = useSelector((store) => store);
  const event = useSelector((store) => store.active_event);
  const [heading, setHeading] = useState('Move Event Home');

  // useEffect to call sagas and reducers and set Event Items and Boxes
  useEffect( () => {
    dispatch({ type: 'FETCH_EVENT_USERS', payload: store.active_event.id })
    window.scrollTo(0, 0);
  }, []);

  const history = useHistory()

  const handleManageEvent = () => {
  history.push('/manage_event')
  }

  let moveDate = new Date(event.move_date).toLocaleDateString( 'en-US',{
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    // hour: '2-digit',
    // minute: '2-digit'
});

  return (
    <div className='component'>
      <img className='moveEventHomeLogo' src="/images/brand.png" alt="" />
      <h1 className ='moveEventHomeHeader'>{event.name}</h1>
      <p><b>MOVE OWNER:</b> {event.owner_first_name} {event.owner_last_name}</p>
      <p><b>MOVE DATE:</b> {moveDate}</p>
      <Button color="secondary" variant="contained" className='newMoveButton' endIcon={<ArrowForwardIosIcon />} onClick={() => {setTimeout(handleManageEvent, 250)}}>MANAGE EVENT</Button>
      <ItemSearch />
      <BoxSearch />
    </div>
  );
}

export default MoveEventHome;
