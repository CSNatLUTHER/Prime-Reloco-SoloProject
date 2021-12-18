import React, { useState } from 'react';
import {useDispatch, useSelector} from 'react-redux';
import QRCodeScan from '../../SharedComponents/QRCodeScan/QRCodeScan';
import { Link } from 'react-router-dom';
import { user } from 'pg/lib/defaults';
import '../NewItemForm/NewItemForm.css'

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
  const [newItem, setNewItem] = useState({ 
                                  qr: '', 
                                  item_name: '', 
                                  put_in_box: false, 
                                  value: '', 
                                  destination: 6, 
                                  creator_user_id:store.user.id,
                                  event:store.active_event.event.id,
                                  last_modified_user_id: store.user.id,
                                  image_url: 'https://i1.wp.com/lanecdr.org/wp-content/uploads/2019/08/placeholder.png?w=1200&ssl=1'});

  const handleQrChange = (event) => {
      setNewItem({ ...newItem, qr: event.target.value })
  }

  const handleNameChange = (event) => {
      setNewItem({ ...newItem, item_name: event.target.value })
  }
  
  const handleValueChange = (event) => {
      setNewItem({ ...newItem, value: event.target.value })
  }

  const handleDestinationChange = (event) => {
      setNewItem({ ...newItem, destination: event.target.value })
  }

  const handleImageChange = (event) => {
    setNewItem({ ...newItem, image_url: event.target.value })
  }

  const addNewItem = () => {
    dispatch({ type: 'ADD_ITEM', payload: newItem });
    setNewItem({ qr: '', item_name: '', value: '', destination: '', image_url: ''});
  }

  return (
    <div className='component'>
      <h2>{heading}</h2>
      <p>Item going in box: </p>
      <label class="switch">
        <input type="checkbox" onClick={() => {setGoingInBox(!goingInBox), setNewItem({...newItem, put_in_box: !newItem.put_in_box })}}/>
        <span class="slider round"></span>
      </label>
      <br />
      <p>QR Code ID:</p><input type="text" placeholder='enter or use QR scan' value={newItem.qr} onChange={handleQrChange} /><QRCodeScan />
      <p>Item Name:</p><input type="text" placeholder='ex. speaker' value={newItem.item_name} onChange={handleNameChange}  />
      <p>Item Value: $</p><input type="number" placeholder='150' value={newItem.value} onChange={handleValueChange}  />
      {/* Create a conditional statement that renders destination only when "going in box" is 'false' */}
        {!goingInBox?
          <div>
            <p>Destination:</p><select name="destination" value={newItem.destination} onChange={handleDestinationChange} >
                              {/* Consider replacing this with a map of the options for the destinations table */}
                              <option value={1}>MOVE</option>
                              <option value={2}>STORE</option>
                              <option value={3}>SELL</option>
                              <option value={4}>DONATE</option>
                              <option value={5}>PURGE</option>
                          </select>
          </div>:
          <div></div>
        }
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
