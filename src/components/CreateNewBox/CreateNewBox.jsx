import React, { useState, useEffect } from 'react';
import {useSelector, useDispatch} from 'react-redux';
import NewBoxForm from '../CreateNewBox/NewBoxForm/NewBoxForm';


// Basic functional component structure for React with default state
// value setup. When making a new component be sure to replace the
// component name TemplateFunction with the name for the new component.
function createNewBox(props) {
  // Using hooks we're creating local state for a "heading" variable with
  // a default value of 'Functional Component'
  const store = useSelector((store) => store);
  const [heading, setHeading] = useState('Create New Box');

  return (
    <div className='component'>
      <h2>{heading}</h2>
      <NewBoxForm />
    </div>
  );
}

export default createNewBox;