import React, { useState } from 'react';
import {useSelector} from 'react-redux';
// import './ResultsBox.css'

// Basic functional component structure for React with default state
// value setup. When making a new component be sure to replace the
// component name TemplateFunction with the name for the new component.
function resultsBox(props) {
  // Using hooks we're creating local state for a "heading" variable with
  // a default value of 'Functional Component'
  const store = useSelector((store) => store);
  const [heading, setHeading] = useState('Results Box');

  return (
    <div className='component'>
      <h2>{heading}</h2>
      <img className='boxImage' src="/images/transparent_box.png" />
      <p>{JSON.stringify(props.box)}</p>
    </div>
  );
}

export default resultsBox;
