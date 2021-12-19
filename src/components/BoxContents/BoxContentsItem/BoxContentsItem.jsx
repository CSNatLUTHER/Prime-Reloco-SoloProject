import React, { useState } from 'react';
import {useSelector} from 'react-redux';
import '../BoxContentsItem/BoxContentsItem.css'

// Basic functional component structure for React with default state
// value setup. When making a new component be sure to replace the
// component name TemplateFunction with the name for the new component.
function boxContentsItem(props) {
  // Using hooks we're creating local state for a "heading" variable with
  // a default value of 'Functional Component'
  const store = useSelector((store) => store);
  const [heading, setHeading] = useState('Box Contents Item');

  return (
    <div className='component'>
      <img className='contentsItemImage' src={props.boxContentsItem.image_path}/>
      <h2>{heading}</h2>
      <p>{JSON.stringify(props)}</p>
    </div>
  );
}

export default boxContentsItem;
