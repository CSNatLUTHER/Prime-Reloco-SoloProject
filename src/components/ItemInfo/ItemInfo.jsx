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
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { useHistory } from 'react-router-dom';
import Swal from 'sweetalert2';


// Basic functional component structure for React with default state
// value setup. When making a new component be sure to replace the
// component name TemplateFunction with the name for the new component.
function itemInfo(props) {
    // define dispatch
    const dispatch = useDispatch();
    // kick-off many of the FETCH actions needed to set initial reducers
    useEffect( () => {
      dispatch({ type: 'FETCH_ITEM_BOX', payload: {item_id: store.active_item.id} });
      window.scroll(0,0);
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
    Swal.fire({
      title: 'Are you sure you want to remove ' + store.active_item.name + ' from ' + store.active_item_box.name + '?',
      text: "You will need to re-add the item to the box to undo this action.",
      icon: 'question',
      width: '90%',
      iconColor: '#3f51b5',
      showCancelButton: true,
      confirmButtonColor: '#3f51b5',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title:'You have successfully removed ' + store.active_item.name + ' from ' + store.active_item_box.name + '.',
          icon:'success',
          width: '90%',
          iconColor: '#3f51b5',
          confirmButtonColor:'#ffc400'
        })
        removeFromBox()
      }
    })
    // if(confirm('Are you sure you want to remove ' + store.active_item.name + ' from ' + store.active_item_box.name + '?')){
    //   removeFromBox()
    // }
  }

  const removeFromBox = () => {
    console.log('In removeFromBox');
    dispatch({ type: 'REMOVE_FROM_BOX', payload: {item_id: store.active_item.id, box_id: store.active_item_box.id} });
  }

  const viewItemBox = () => {
    dispatch({type:'SET_ACTIVE_BOX', payload: store.active_item_box})
    setTimeout(()=>{history.push('/box_info')},250)
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
          <br />
          <br />
          <Button color="secondary" variant="contained" className='removeItemFromBoxButton' endIcon={<ArrowForwardIosIcon />} onClick={viewItemBox}>VIEW BOX</Button>
        </>:
        <>
          <AddItemToBox />
          <br />
          <br />
          <Button color="success" variant="contained" className='createNewBoxButton' endIcon={<AddCircleOutlineIcon />} onClick={() => {setTimeout(()=>{history.push('/create_new_box')}, 250)}}>CREATE NEW BOX</Button>
        </>
      }
      <br />
      <br />
    </div>
  );
}

export default itemInfo;
