import React, { useState, useEffect } from 'react';
import {useSelector, useDispatch} from 'react-redux';
import ItemDetails from '../ItemInfo/ItemDetails/ItemDetails';
import AddItemToBox from '../NewItemConfirmation/AddItemToBox/AddItemToBox'
import CreateNewBox from '../CreateNewBox/CreateNewBox';
import ItemEditForm from '../ItemEdit/ItemEditForm/ItemEditForm';
import './ItemInfo.css'
import Button from '@mui/material/Button';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { useHistory } from 'react-router-dom';


// Basic functional component structure for React with default state
// value setup. When making a new component be sure to replace the
// component name TemplateFunction with the name for the new component.
function itemInfo(props) {
    // define dispatch
    const dispatch = useDispatch();
    // kick-off many of the FETCH actions needed to set initial reducers
    useEffect( () => {
      dispatch({ type: 'FETCH_ITEM_BOX', payload: {item_id: store.active_item.id} });
    }, []);
  // Using hooks we're creating local state for a "heading" variable with
  // a default value of 'Functional Component'
  const store = useSelector((store) => store);
  const [heading, setHeading] = useState('ITEM INFO');
  const [itemEdit, setItemEdit] = useState(false);

  const editItem = () => {
    setItemEdit(!itemEdit)
  }

  const removeFromBoxConfirm = () => {
    if(confirm('Are you sure you want to remove ' + store.active_item.name + ' from ' + store.active_item_box.name + '?')){
      removeFromBox()
    }
  }

  const removeFromBox = () => {
    console.log('In removeFromBox');
    dispatch({ type: 'REMOVE_FROM_BOX', payload: {item_id: store.active_item.id, box_id: store.active_item_box.id} });
  }

  const history = useHistory();

  return (
    <div className='component'>
      <img className='itemInfoLogo' src="/images/brand.png" alt="" />
      <h2 className ='itemInfoResultsHeader'>{heading}</h2>
      {itemEdit?
      <ItemEditForm editItem={editItem}/>:
      <ItemDetails  editItem={editItem}/>
      }
      {store.active_item_box.id >0?
        <>
        <p><b>THIS ITEM IS IN: </b>'{store.active_item_box.name}'</p>
        <p><b>BOX QR CODE: </b>'{store.active_item_box.qr_id}'</p>
        <Button color="error" variant="outlined" className='removeItemFromBoxButton' endIcon={<RemoveCircleOutlineIcon />} onClick={() => {setTimeout(removeFromBoxConfirm, 250)}}>REMOVE ITEM FROM BOX</Button>
        {/* <button onClick={removeFromBox}>Remove Item From Box</button> */}
        </>:
        <>
          <AddItemToBox />
          <br />
          <br />
          <Button color="success" variant="contained" className='createNewBoxButton' endIcon={<AddCircleOutlineIcon />} onClick={() => {setTimeout(()=>{history.push('/create_new_box')}, 250)}}>CREATE NEW BOX</Button>
          {/* <CreateNewBox /> */}
        </>
      }
      <br />
      <br />
    </div>
  );
}

export default itemInfo;
