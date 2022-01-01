import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import {useSelector} from 'react-redux';
import { Link } from 'react-router-dom';
import './ResultsBox.css'
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
function resultsBox(props) {
  const dispatch = useDispatch()
  // Using hooks we're creating local state for a "heading" variable with
  // a default value of 'Functional Component'
  const store = useSelector((store) => store);
  const [heading, setHeading] = useState('Results Box');

  const history = useHistory()
  const setActiveBox = () => {
    dispatch({type: 'SET_ACTIVE_BOX', payload:props.box})
    history.push('/box_info')

  }

  return (
    <div className='component'>
      {/* <h2>{heading}</h2>
      <img className='boxImage' src="/images/transparent_box.png" />
      <br />
      <Link to='/box_info'>
      <button onClick={setActiveBox}>See Box Details</button>
      </Link>
      <p>{JSON.stringify(props.box)}</p> */}
      <Card sx={{ maxWidth: 500 }}
        className='searchResultsBoxCard'
        style={{backgroundColor: "#88899111"}}
      >
        <img className='boxResultsIconImage' src='/images/transparent_box.png'/>
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {props.box.name}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            <b>QR CODE:</b> {props.box.qr_id===''? 'None Identified':props.box.qr_id} <br/>
            <b>SIZE:</b> {props.box.size} <br/>
            <b>WEIGHT:</b> {props.box.weight} <br/>
            <b>DESTINATION:</b> {props.box.destination}
          </Typography>
        </CardContent>
        <Button color="secondary" variant="contained" className='selectBoxButton' endIcon={<ArrowForwardIosIcon />} onClick={() => {setTimeout(setActiveBox, 250)}}>SELECT BOX</Button>
      </Card>
    </div>
  );
}

export default resultsBox;
