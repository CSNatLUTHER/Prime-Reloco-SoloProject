import React, { useState } from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { Link } from 'react-router-dom';
import './EventListItem.css'
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { useHistory } from 'react-router-dom';

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

  const history = useHistory();

  const setActiveEvent = () => {
    console.log('In setActiveEvent', props.event);
    dispatch({type: 'SET_ACTIVE_EVENT', payload: props.event})
    history.push('/move_event_home')
  }

  let readableTime = new Date(props.event.move_date).toLocaleDateString( 'en-US',{
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    // hour: '2-digit',
    // minute: '2-digit'
});

  return (
    <div className='eventListItem'>
      {/* <h2>{heading}</h2>
      <img className='moveEventImage' src="/images/move_event.png" alt="" />
      <h4>{JSON.stringify(props.event)}</h4>
      <Link to="/move_event_home">
      <button onClick={setActiveEvent}>Select Event</button>
      </Link> */}
      <Card 
        sx={{ maxWidth: 345 }}
        style={{backgroundColor: "#6573c32a"}}
        className='EventListItemCard'
      >
      {/* <img src="/images/move_event.png" className='moveEventImage'/> */}
      <CardContent>
        <img src="/images/move_event.png" className='moveEventImage'/>
        <Typography gutterBottom variant="h5" component="div">
          {props.event.name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          <b>MOVE DATE:</b> {readableTime}
        </Typography>
      </CardContent>
      <Button color="secondary" variant="contained" className='newMoveButton' endIcon={<ArrowForwardIosIcon />} onClick={setActiveEvent}>SELECT EVENT</Button>
    </Card>
    </div>
  );
}

export default eventListItem;
