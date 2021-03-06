import React, { useState } from 'react';
import {useSelector} from 'react-redux';
import BoxEditForm from '../BoxEdit/BoxEditForm/BoxEditForm';


// Basic functional component structure for React with default state
// value setup. When making a new component be sure to replace the
// component name TemplateFunction with the name for the new component.
function boxEdit(props) {
  // Using hooks we're creating local state for a "heading" variable with
  // a default value of 'Functional Component'
  const store = useSelector((store) => store);
  const [heading, setHeading] = useState('Box Edit');

  return (
    <div className='component'>
      <h2>{heading}</h2>
      <BoxEditForm />
      <button>Update Box</button>
    </div>
  );
}

export default boxEdit;
