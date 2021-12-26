import React, { useState } from 'react';
import {useSelector} from 'react-redux';
import qrCodeReducer from '../../../redux/reducers/qr_code.reducer';
import QRCodeScan from '../../SharedComponents/QRCodeScan/QRCodeScan';

// Basic functional component structure for React with default state
// value setup. When making a new component be sure to replace the
// component name TemplateFunction with the name for the new component.
function boxEditForm(props) {
  // Using hooks we're creating local state for a "heading" variable with
  // a default value of 'Functional Component'
  const store = useSelector((store) => store);
  const [heading, setHeading] = useState('Box Edit Form');

  const updateBox = () => {
    props.editBox()
  }

  return (
    <div>
      <h2>{heading}</h2>
      <QRCodeScan />
      <button onClick={updateBox}>Save</button>
    </div>
  );
}

export default boxEditForm;
