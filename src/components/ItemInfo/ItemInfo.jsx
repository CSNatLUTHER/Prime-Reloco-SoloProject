import React, { useState, useEffect } from 'react';
import {useSelector, useDispatch} from 'react-redux';
import ItemDetails from '../ItemInfo/ItemDetails/ItemDetails';
import AddItemToBox from '../NewItemConfirmation/AddItemToBox/AddItemToBox'
import CreateNewBox from '../CreateNewBox/CreateNewBox';
import ItemEditForm from '../ItemEdit/ItemEditForm/ItemEditForm'


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
  const [heading, setHeading] = useState('Item Info');
  const [itemEdit, setItemEdit] = useState(false);

  const editItem = () => {
    setItemEdit(!itemEdit)
  }

  return (
    <div className='component'>
      <h2>{heading}</h2>
      {itemEdit?
      <ItemEditForm editItem={editItem}/>:
      <ItemDetails  editItem={editItem}/>
      }

      <AddItemToBox />
      <CreateNewBox />
    </div>
  );
}

export default itemInfo;
