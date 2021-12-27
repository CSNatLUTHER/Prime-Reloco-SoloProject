import React, { useState } from 'react';
import {useDispatch, useSelector} from 'react-redux';
import QRCodeScan from '../../SharedComponents/QRCodeScan/QRCodeScan';
import { Link } from 'react-router-dom';


// Basic functional component structure for React with default state
// value setup. When making a new component be sure to replace the
// component name TemplateFunction with the name for the new component.
function ItemSearch(props) {
  const dispatch = useDispatch();
  // Using hooks we're creating local state for a "heading" variable with
  // a default value of 'Functional Component'
  const store = useSelector((store) => store);
  const event = useSelector((store) => store.active_event.event);
  const [heading, setHeading] = useState('Item Search');
  const [searchItem, setSearchItem] = useState({
    searchText:'',
    event:store.active_event.id,
    user: store.user.id});

  const handleSearchChange = (event) => {
  setSearchItem({ ...searchItem, searchText: event.target.value })
  }

  const searchForItem = () => {
    console.log('In searchForItem', searchItem);
    if(searchItem.searchText != ''){
      dispatch({ type: 'SEARCH_FOR_ITEM', payload: searchItem });
    }
    // else if(store.qr_code.id != ''){
    //   dispatch({ type: 'SEARCH_FOR_ITEM',
    //              payload: {
    //                 searchText:store.qr_code.id,
    //                 event:store.active_event.id,
    //                 user: store.user.id}
    //             });
    // }
    else{
      dispatch({ type: 'FETCH_ITEMS', payload: searchItem }); 
    }
    dispatch({ type: 'UNSET_QR_CODE' })
  } 

  const handleQrChange = (event) => {
    setSearchItem({ ...searchItem, searchText: event })
  }

  return (
    <div className='component'>
      <h2>{heading}</h2>
      <Link to="/create_new_item">
      <button>Create New Item</button>
      </Link>
      <br />
      <br />
      <input type='text' placeholder='ex. item name or QR' value={searchItem.searchText} onChange={handleSearchChange}></input>
      <QRCodeScan qr={handleQrChange} />
      <br />
      <Link to="/item_search_results">
      <button onClick={searchForItem}>Search</button>
      </Link>
      <p>{JSON.stringify(searchItem)}</p>
    </div>
  );
}

export default ItemSearch;
