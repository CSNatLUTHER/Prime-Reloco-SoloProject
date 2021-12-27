import React, { useState } from 'react';
import {useSelector} from 'react-redux';
import QRCodeScan from '../../SharedComponents/QRCodeScan/QRCodeScan';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';

// Basic functional component structure for React with default state
// value setup. When making a new component be sure to replace the
// component name TemplateFunction with the name for the new component.
function newBoxForm(props) {
  const dispatch = useDispatch()
  // Using hooks we're creating local state for a "heading" variable with
  // a default value of 'Functional Component'
  const store = useSelector((store) => store);
  const [heading, setHeading] = useState('New Box Form');
  const [newBox, setNewBox] = useState({ 
                                    qr: store.qr_code.id, 
                                    box_name: '', 
                                    box_size: '', 
                                    box_weight: '', 
                                    destination: '', 
                                    creator_user_id:store.user.id,
                                    event:store.active_event.id,
                                    last_modified_user_id: store.user.id,
                                });
  
  const handleNameChange = (event) => {
    setNewBox({ ...newBox, box_name: event.target.value })
  }

  const handleBoxSizeChange = (event) => {
    setNewBox({ ...newBox, box_size: event.target.value })
  }

  const handleBoxWeightChange = (event) => {
    setNewBox({ ...newBox, box_weight: event.target.value })
  }

  const handleDestinationChange = (event) => {
    setNewBox({ ...newBox, destination: event.target.value })
  }

  const handleQrChange = (event) => {
    setNewBox({ ...newBox, qr: event })
  }

  const updateQrCode = (event) => {
    setNewBox({ ...newBox, qr: event.target.value })
  }

  const addNewBox =  () => {
    dispatch({ type: 'CREATE_BOX', payload: newBox })         
    dispatch({ type: 'UNSET_QR_CODE' })
    
    // if(store.qr_code.id != ''){
  }  

  return (
    <div className='component'>
      <h2>{heading}</h2>
      <p>QR Code:</p><input type="text" placeholder='ex. NEL10001IRE' value={newBox.qr} onChange={updateQrCode}  />
      <QRCodeScan qr={handleQrChange}/>
      <p>Box Name:</p><input type="text" placeholder='ex. Dishes' value={newBox.box_name} onChange={handleNameChange}  /> 
      <div>
        <p>Box Size:</p><select name="boxSize" value={newBox.box_size} onChange={handleBoxSizeChange} >
                          {/* Consider replacing this with a map of the options for the destinations table */}
                          <option value={''} disabled>CHOOSE BOX SIZE</option>
                          <option value={'SMALL'}>SMALL</option>
                          <option value={'MEDIUM'}>MEDIUM</option>
                          <option value={'LARGE'}>LARGE</option>
                          <option value={'WARDROBE'}>WARDROBE</option>
                          <option value={'CRATE'}>CRATE</option>
                      </select>
      </div>
      <div>
        <p>Box Weight:</p><select name="destination" value={newBox.box_weight} onChange={handleBoxWeightChange} >
                          {/* Consider replacing this with a map of the options for the destinations table */}
                          <option value={''} disabled>CHOOSE BOX WEIGHT</option>
                          <option value={'VERY LIGHT'}>VERY LIGHT</option>
                          <option value={'LIGHT'}>LIGHT</option>
                          <option value={'MEDIUM'}>MEDIUM</option>
                          <option value={'HEAVY'}>HEAVY</option>
                          <option value={'VERY HEAVY'}>VERY HEAVY</option>
                      </select>
      </div>
      <div>
        <p>Destination:</p><select name="destination" value={newBox.destination} onChange={handleDestinationChange} >
                          {/* Consider replacing this with a map of the options for the destinations table */}
                          <option value={''} disabled>CHOOSE DESTINATION</option>
                          <option value={1}>MOVE</option>
                          <option value={2}>STORE</option>
                          <option value={3}>SELL</option>
                          <option value={4}>DONATE</option>
                          <option value={5}>PURGE</option>
                      </select>
      </div>
        <br />
        <br />
        <Link to="/new_box_confirmation">
        <button onClick={addNewBox}>Create New Item</button>
        </Link>
        <p>newBox: {JSON.stringify(newBox)}</p>

    </div>
  );
}

export default newBoxForm;
