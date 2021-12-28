import React, { useState } from 'react';
import {useDispatch, useSelector} from 'react-redux';
import QRCodeScan from '../../SharedComponents/QRCodeScan/QRCodeScan';
import { Link } from 'react-router-dom';
import DelayLink from 'react-delay-link';

// Basic functional component structure for React with default state
// value setup. When making a new component be sure to replace the
// component name TemplateFunction with the name for the new component.
function addItemToBox(props) {
  const dispatch = useDispatch()
  // Using hooks we're creating local state for a "heading" variable with
  // a default value of 'Functional Component'
  const store = useSelector((store) => store);
  console.log('Active Item:', store.active_item.id);
  const [heading, setHeading] = useState('Add Item To Box');
  const [box, setBox] = useState({
                          item_id:store.active_item.id,
                          boxQr:'',
                          user: store.user.id,
                          event: store.active_event.id});

  const handleQrChange = (event) => {
    setBox({ ...box, boxQr: event.target.value })
  }

  const receiveQrCode = (event) => {
    setBox({...box, boxQr: event})
  }

  const putItemInBox = () => {
    // if(store.qr_code.id != ''){
      dispatch({ type: 'PUT_ITEM_IN_BOX', payload: box });
      dispatch({ type: 'UPDATE_ITEM_DESTINATION', payload: box });
    // }
    // else{
    //   dispatch({ type: 'PUT_ITEM_IN_BOX', payload: box });
    // }
  } 

  return (
    <div className='component'>
      <h2>{heading}</h2>
      <p>QR Code ID:</p><input type="text" placeholder='enter code or use QR scan' value={box.boxQr} onChange={handleQrChange} /><QRCodeScan qr={receiveQrCode} />
      <br />
      <br />
      <DelayLink delay={500} to="/box_info">
        <button onClick={putItemInBox}>Add To Box</button>
      </DelayLink>
      <p>{JSON.stringify(box)}</p>
    </div>
  );
}

export default addItemToBox;
