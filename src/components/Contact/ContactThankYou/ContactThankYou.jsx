import React, { useState } from 'react';
import {useSelector} from 'react-redux';
import { Link } from 'react-router-dom';

// Basic functional component structure for React with default state
// value setup. When making a new component be sure to replace the
// component name TemplateFunction with the name for the new component.
function ContactThankYou(props) {
  // Using hooks we're creating local state for a "heading" variable with
  // a default value of 'Functional Component'
  const store = useSelector((store) => store);
  const [heading, setHeading] = useState('Contact Thank You Message');

  return (
    <div className='component'>
      <h2>{heading}</h2>
      <p>Thank you for your message. We'll be in touch with you soon.</p>
      <Link to='/user'>
      <button onClick={()=> {props.setThankYou}}>Return Home</button>
      </Link>
    </div>
  );
}

export default ContactThankYou;
