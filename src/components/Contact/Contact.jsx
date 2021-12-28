import React, { useState } from 'react';
import {useSelector} from 'react-redux';
import ContactUs from './ContactUs/ContactUs';
import ContactThankYou from './ContactThankYou/ContactThankYou';

// Basic functional component structure for React with default state
// value setup. When making a new component be sure to replace the
// component name TemplateFunction with the name for the new component.
function contactUs(props) {
  // Using hooks we're creating local state for a "heading" variable with
  // a default value of 'Functional Component'
  const store = useSelector((store) => store);
  const [heading, setHeading] = useState('Contact Us');
  const [thankYou, setThankYou] = useState(false);

  const updateThankYou = () => {
    setThankYou(true)
  }

  return (
    <div className='component'>
      <h2>{heading}</h2>
      {thankYou?
        <ContactThankYou setThankYou={updateThankYou} />:
        <ContactUs setThankYou={updateThankYou}/>
      }
    </div>
  );
}

export default contactUs;
