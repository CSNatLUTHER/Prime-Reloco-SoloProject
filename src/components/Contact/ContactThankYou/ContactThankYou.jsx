import React, { useState } from 'react';
import {useSelector} from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import './ContactThankYou.css'
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import Button from '@mui/material/Button';

// Basic functional component structure for React with default state
// value setup. When making a new component be sure to replace the
// component name TemplateFunction with the name for the new component.
function ContactThankYou(props) {
  // Using hooks we're creating local state for a "heading" variable with
  // a default value of 'Functional Component'
  const store = useSelector((store) => store);
  const [heading, setHeading] = useState('THANK YOU!');

  const history = useHistory()

  const returnHome = () => {
    props.setThankYou()
    history.push('/user')
  }

  return (
    <div className='component'>
      <h2>{heading}</h2>
      <p>Thank you for your message. We'll be in touch with you shortly.</p>
      <Button color="secondary" variant="contained" className='contactThankYouButton' endIcon={<ArrowForwardIosIcon />} onClick={() => setTimeout(returnHome, 250)}>RETURN HOME</Button>
    </div>
  );
}

export default ContactThankYou;
