import React, { useEffect, useState } from 'react';
import {useDispatch, useSelector} from 'react-redux';

// Basic functional component structure for React with default state
// value setup. When making a new component be sure to replace the
// component name TemplateFunction with the name for the new component.
function itemDetails(props) {

  // Using hooks we're creating local state for a "heading" variable with
  // a default value of 'Functional Component'
  const store = useSelector((store) => store);
  const item = useSelector((store) => store.active_item);
  const [heading, setHeading] = useState('Item Details');

  return (
    <div>
      <h2>{heading}</h2>
      <h4>{JSON.stringify(item)}</h4>
    </div>
  );
}

export default itemDetails;
