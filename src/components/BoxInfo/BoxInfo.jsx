import React, { useState } from 'react';
import {useSelector} from 'react-redux';
import BoxDetails from '../BoxInfo/BoxDetails/BoxDetails';
import PutItemInBox from '../NewBoxConfirmation/PutItemInBox/PutItemInBox';

// Basic functional component structure for React with default state
// value setup. When making a new component be sure to replace the
// component name TemplateFunction with the name for the new component.
function boxInfo(props) {
  // Using hooks we're creating local state for a "heading" variable with
  // a default value of 'Functional Component'
  const store = useSelector((store) => store);
  const [heading, setHeading] = useState('Box Info');

  return (
    <div>
      <h2>{heading}</h2>
      <BoxDetails />
      <PutItemInBox />
    </div>
  );
}

export default boxInfo;
