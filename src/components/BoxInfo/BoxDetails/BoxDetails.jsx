import React, { useState } from 'react';
import {useSelector} from 'react-redux';
import '../BoxDetails/BoxDetails.css';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import EditIcon from '@mui/icons-material/Edit';

// Basic functional component structure for React with default state
// value setup. When making a new component be sure to replace the
// component name TemplateFunction with the name for the new component.
function boxDetails(props) {
  // Using hooks we're creating local state for a "heading" variable with
  // a default value of 'Functional Component'
  const store = useSelector((store) => store);
  const [heading, setHeading] = useState('Box Details');

  return (
    <div className='component'>
      {/* <img className='boxImage' src="/images/transparent_box.png" />
      <h2>{heading}</h2>
      <button onClick={props.editBox}>Edit Box</button>
      <p>{JSON.stringify(store.active_box)}</p> */}
      <Card sx={{ maxWidth: 500 }}
        className='itemDetailsCard'
        style={{backgroundColor: "#88899111"}}
      >
        <img className='boxInfoIconImage' src="/images/transparent_box.png"/>
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {store.active_box.name}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            <b>QR CODE:</b> {store.active_box.qr_id} <br/>
            <b>SIZE:</b> {store.active_box.size} <br/>
            <b>WEIGHT:</b> {store.active_box.weight} <br/>
            <b>DESTINATION:</b> {store.active_box.destination}
          </Typography>
        </CardContent>
        <Button color="secondary" variant="contained" className='editBoxButton' endIcon={<EditIcon />} onClick={() => {setTimeout(props.editBox, 250)}}>EDIT BOX</Button>
      </Card>
    </div>
  );
}

export default boxDetails;
