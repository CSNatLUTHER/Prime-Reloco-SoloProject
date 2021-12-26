import React, { useState } from 'react';
import {useSelector} from 'react-redux';
import qrCodeReducer from '../../../redux/reducers/qr_code.reducer';
import QRCodeScan from '../../SharedComponents/QRCodeScan/QRCodeScan';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';

// Basic functional component structure for React with default state
// value setup. When making a new component be sure to replace the
// component name TemplateFunction with the name for the new component.
function boxEditForm(props) {
  const dispatch = useDispatch();
  // Using hooks we're creating local state for a "heading" variable with
  // a default value of 'Functional Component'
  const store = useSelector((store) => store);
  const [heading, setHeading] = useState('Box Edit Form');
  const [editBox, setEditBox] = useState({ 
    qr: store.active_box.qr_id, 
    box_name: store.active_box.name, 
    box_size: store.active_box.size, 
    box_weight: store.active_box.weight, 
    destination: store.active_box.destination_id, 
    creator_user_id:store.active_box.creator_user_id,
    event:store.active_box.event_id,
    last_modified_user_id: store.user.id,
});

const handleNameChange = (event) => {
  setEditBox({ ...editBox, box_name: event.target.value })
}

const handleBoxSizeChange = (event) => {
  setEditBox({ ...editBox, box_size: event.target.value })
}

const handleBoxWeightChange = (event) => {
  setEditBox({ ...editBox, box_weight: event.target.value })
}

const handleDestinationChange = (event) => {
  setEditBox({ ...editBox, destination: event.target.value })
}

const handleQrChange = (event) => {
  setEditBox({ ...editBox, qr: event })
}

const updateQrChange = (event) => {
  setEditBox({...editBox, qr: event.target.value})
}
const addNewBox =  () => {
dispatch({ type: 'CREATE_BOX', payload: newBox })         
dispatch({ type: 'UNSET_QR_CODE' })
}
const updateBox = () => {
  props.editBox()
}

return (
<div className='component'>
      <h2>{heading}</h2>
      <p>QR Code:</p><input type="text" placeholder='ex. NEL12345IRE' value={editBox.qr} onChange={updateQrChange}  />
      <QRCodeScan qr={handleQrChange}/>
      <p>Box Name:</p><input type="text" placeholder='ex. Dishes' value={editBox.box_name} onChange={handleNameChange}  /> 
      <div>
        <p>Box Size:</p><select name="boxSize" value={editBox.box_size} onChange={handleBoxSizeChange} >
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
        <p>Box Weight:</p><select name="destination" value={editBox.box_weight} onChange={handleBoxWeightChange} >
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
        <p>Destination:</p><select name="destination" value={editBox.destination} onChange={handleDestinationChange} >
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
        <button onClick={updateBox}>Create New Item</button>
        </Link>
        <p>editBox:{JSON.stringify(editBox)}</p>
    </div>
  );
}

export default boxEditForm;
