import React, { useState } from 'react';
import {useDispatch, useSelector} from 'react-redux';
import QRCodeScan from '../../SharedComponents/QRCodeScan/QRCodeScan';
import { Link } from 'react-router-dom';

// Basic functional component structure for React with default state
// value setup. When making a new component be sure to replace the
// component name TemplateFunction with the name for the new component.
function BoxSearch(props) {
  const dispatch = useDispatch();
  // Using hooks we're creating local state for a "heading" variable with
  // a default value of 'Functional Component'
  const store = useSelector((store) => store);
  const [heading, setHeading] = useState('Box Search');
  const [searchBox, setSearchbox] = useState({
                                          searchText:'',
                                          event:store.active_event.id,
                                          user: store.user.id
                                        });

  const handleSearchChange = (event) => {
    setSearchbox({ ...searchBox, searchText: event.target.value })
  }

  const searchForBox = () => {
    console.log('In searchForBox', searchBox);
    if(searchBox.searchText != ''){
      dispatch({ type: 'SEARCH_FOR_BOX', payload: searchBox });
    }
    else if(store.qr_code.id != ''){
      dispatch({ type: 'SEARCH_FOR_BOX',
                 payload: {
                    searchText:store.qr_code.id,
                    event:store.active_event.id,
                    user: store.user.id}
                });
    }
    else{
      dispatch({ type: 'FETCH_BOXES', payload: searchBox }); 
    }
    dispatch({ type: 'UNSET_QR_CODE' })
  } 


  return (
    <div className='component'>
      <h2>{heading}</h2>
      <Link to="/create_new_box">
      <button>Create New Box</button>
      </Link>
      <br />
      <br />
      <input type='text' placeholder='ex. box name or QR' onChange={handleSearchChange} ></input>
      <QRCodeScan />
      <Link to="/box_search_results">
      <button onClick={searchForBox}>Search</button>
      </Link>
      <p>{JSON.stringify(searchBox)}</p>
    </div>
  );
}

export default BoxSearch;
