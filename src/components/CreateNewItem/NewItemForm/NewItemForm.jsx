import React, { useState } from 'react';
import {useDispatch, useSelector} from 'react-redux';
import QRCodeScan from '../../SharedComponents/QRCodeScan/QRCodeScan';
import { Link } from 'react-router-dom';

// Basic functional component structure for React with default state
// value setup. When making a new component be sure to replace the
// component name TemplateFunction with the name for the new component.
function newItemForm(props) {
  // define dispatch
  const dispatch = useDispatch();
  // Using hooks we're creating local state for a "heading" variable with
  // a default value of 'Functional Component'
  const store = useSelector((store) => store);
  const [heading, setHeading] = useState('New Item Form');
  const [goingInBox, setGoingInBox] = useState(false);
  const [newItem, setNewItem] = useState({ qr: '', item_name: '', value: '', destination: 1 , image_url: ''});

  const handleQrChange = (event) => {
      console.log('event happened');
      //Similar to in redux -- we dont want to get rid of the id field when we update name
      setNewItem({ ...newItem, qr: event.target.value })
  }

  const handleNameChange = (event) => {
      console.log('event happened');
      //Similar to in redux -- we dont want to get rid of the id field when we update name
      setNewItem({ ...newItem, item_name: event.target.value })
  }
  
  const handleValueChange = (event) => {
      console.log('event happened');
      //Similar to in redux -- we dont want to get rid of the id field when we update name
      setNewItem({ ...newItem, value: event.target.value })
  }

  const handleDestinationChange = (event) => {
      console.log('event happened');
      //Similar to in redux -- we dont want to get rid of the id field when we update name
      setNewItem({ ...newItem, destination: event.target.value })
  }

  const handleImageChange = (event) => {
    console.log('event happened');
    //Similar to in redux -- we dont want to get rid of the id field when we update name
    setNewItem({ ...newItem, image_url: event.target.value })
  }

  const addNewItem = () => {
    dispatch({ type: 'ADD_ITEM', payload: newItem });
    //updates the next plant to have a new id
    setNewItem({ qr: '', item_name: '', value: '', destination: '', image_url: ''});
  }

  return (
    <div>
      <h2>{heading}</h2>
      <h6>Will Item Go in a Box</h6>
      <p>Going In Box: {JSON.stringify(goingInBox)}</p>
      <button onClick={() => {{setGoingInBox(true)}}}>Yes</button>
      <button onClick={() => {{setGoingInBox(false)}}}>No</button>
      <br />
      <p>QR Code ID:</p><input type="text" placeholder='enter or use QR scan' value={newItem.qr} onChange={handleQrChange} /><QRCodeScan />
      <p>Item Name:</p><input type="text" placeholder='ex. speaker' value={newItem.item_name} onChange={handleNameChange}  />
      <p>Item Value: $</p><input type="number" placeholder='150' value={newItem.value} onChange={handleValueChange}  />
      {/* Create a conditional statement that renders destination only when "going in box" is 'false' */}
      <p>Destination:</p><select name="destination" value={newItem.destination} onChange={handleDestinationChange} >
                            {/* Consider replacing this with a map of the options for the destinations table */}
                            <option value={1}>MOVE</option>
                            <option value={2}>STORE</option>
                            <option value={3}>SELL</option>
                            <option value={4}>DONATE</option>
                            <option value={5}>PURGE</option>
                         </select>
        {/* Need to Handle Adding Image and Setting URL to newItem */}
        <p>Image:</p><button>Add Image</button>
        <br />
        <br />
        <Link to="/new_item_confirmation">
        <button onClick={addNewItem}>Create New Item</button>
        </Link>
        <p>newItem: {JSON.stringify(newItem)}</p>
    </div>
  );
}

export default newItemForm;
