import React, { useState } from 'react';
import {useSelector} from 'react-redux';
import QRCodeScan from '../../SharedComponents/QRCodeScan/QRCodeScan';

// Basic functional component structure for React with default state
// value setup. When making a new component be sure to replace the
// component name TemplateFunction with the name for the new component.
function putItemInBox(props) {
  // Using hooks we're creating local state for a "heading" variable with
  // a default value of 'Functional Component'
  const store = useSelector((store) => store);
  const [heading, setHeading] = useState('Put Item To Box');

  return (
    <div className='component'>
      <h2>{heading}</h2>
      <QRCodeScan />
    </div>
  );
}

export default putItemInBox;
