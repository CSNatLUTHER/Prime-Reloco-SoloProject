import React, { useState } from 'react';
import {useSelector} from 'react-redux';
import BoxContentsList from '../BoxContents/BoxContentsList/BoxContentsList'
import BoxDetails from '../BoxInfo/BoxDetails/BoxDetails'



// Basic functional component structure for React with default state
// value setup. When making a new component be sure to replace the
// component name TemplateFunction with the name for the new component.
function boxContents(props) {
  // Using hooks we're creating local state for a "heading" variable with
  // a default value of 'Functional Component'
  const store = useSelector((store) => store);
  const [heading, setHeading] = useState('Box Contents');

  return (
    <div className='component'>
      <h2>{heading}</h2>
      <BoxDetails />
      <BoxContentsList />
    </div>
  );
}

export default boxContents;
