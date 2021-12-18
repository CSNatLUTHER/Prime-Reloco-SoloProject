import React, { useState } from 'react';
import {useSelector} from 'react-redux';
import QRCodeScan from '../../SharedComponents/QRCodeScan/QRCodeScan';
import { Link } from 'react-router-dom';

// Basic functional component structure for React with default state
// value setup. When making a new component be sure to replace the
// component name TemplateFunction with the name for the new component.
function addItemToBox(props) {
  // Using hooks we're creating local state for a "heading" variable with
  // a default value of 'Functional Component'
  const store = useSelector((store) => store);
  const [heading, setHeading] = useState('Add Item To Box');
  const [box, setBox] = useState({
                          item_id:store.active_item.item,
                          boxQr:''});

  const handleQrChange = (event) => {
    console.log('event happened');
    //Similar to in redux -- we dont want to get rid of the id field when we update name
    setBox({ ...box, qr: event.target.value })
  }

  const putItemInBox = () => {
    dispatch({ type: 'ADD_ITEM', payload: newItem });
    //updates the next plant to have a new id
  } 

  return (
    <div>
      <h2>{heading}</h2>
      <p>QR Code ID:</p><input type="text" placeholder='enter code or use QR scan' value={box.qr} onChange={handleQrChange} /><QRCodeScan />
      <br />
      <br />
      <Link to="/box_info">
        <button onClick={putItemInBox}>Add To Box</button>
        </Link>
      <p>{JSON.stringify(box)}</p>
    </div>
  );
}

export default addItemToBox;
