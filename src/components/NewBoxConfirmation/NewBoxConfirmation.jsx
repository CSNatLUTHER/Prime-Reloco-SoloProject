import React, { useState } from 'react';
import {useSelector} from 'react-redux';
import PutItemInBox from './PutItemInBox/PutItemInBox';
import BoxInfo from '../BoxInfo/BoxInfo'

// Basic functional component structure for React with default state
// value setup. When making a new component be sure to replace the
// component name TemplateFunction with the name for the new component.
function newBoxConfirmation(props) {
  // Using hooks we're creating local state for a "heading" variable with
  // a default value of 'Functional Component'
  const store = useSelector((store) => store);
  const [heading, setHeading] = useState('New Box Confirmation');

  return (
    <div className='component'>
      <h2>{heading}</h2>
      <p>The box,'{store.active_box.name}' was added!</p>
      {/* <PutItemInBox /> */}
      <BoxInfo />
    </div>
  );
}

export default newBoxConfirmation;
