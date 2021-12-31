import React, { useState } from 'react';
import {useDispatch, useSelector} from 'react-redux';
import QRCodeScan from '../../SharedComponents/QRCodeScan/QRCodeScan';
import { Link } from 'react-router-dom';
import './BoxSearch.css'
import Button from '@mui/material/Button';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { useHistory } from 'react-router-dom';
import TextField from '@mui/material/TextField';
import QrCodeScannerIcon from '@mui/icons-material/QrCodeScanner';
import IconButton from '@mui/material/IconButton';

// Basic functional component structure for React with default state
// value setup. When making a new component be sure to replace the
// component name TemplateFunction with the name for the new component.
function BoxSearch(props) {
  const dispatch = useDispatch();
  // Using hooks we're creating local state for a "heading" variable with
  // a default value of 'Functional Component'
  const store = useSelector((store) => store);
  const [heading, setHeading] = useState('BOXES');
  const [scanning, setScanning] = useState(false);
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
    // else if(store.qr_code.id != ''){
    //   dispatch({ type: 'SEARCH_FOR_BOX',
    //              payload: {
    //                 searchText:store.qr_code.id,
    //                 event:store.active_event.id,
    //                 user: store.user.id}
    //             });
    // }
    else{
      dispatch({ type: 'FETCH_BOXES', payload: searchBox }); 
    }
    dispatch({ type: 'UNSET_QR_CODE' })
    history.push('/box_search_results')
  } 

  const handleQrChange = (event) => {
    setSearchbox({ ...searchBox, searchText: event })
    setScanning(false)
  }

  const history = useHistory()

  const handleCreate = () => {
    history.push('/create_new_box')
    }
  
    const scanClick = () => {
      setScanning(!scanning)
    }


  return (
    <div className='component'>
      <h2 className='boxSearchHeader'>{heading}</h2>
      <Button color="secondary" variant="contained" className='createNewboxButton' endIcon={<ArrowForwardIosIcon />} onClick={() => {setTimeout(handleCreate, 250)}}>CREATE NEW BOX</Button>
      <br />
      <br />
      <div className='searchContainer'>
        <div>
          <TextField
              id="outlined-search"
              label="SEARCH BOXES"
              type="search"
              value={searchBox.searchText}
              onChange={handleSearchChange}
              className='boxSearchTextField'
            />
        </div>
        <div>
          <IconButton onClick={scanClick} size="large" color="primary">
            <QrCodeScannerIcon className='qrIconButton'/>
          </IconButton>
        </div>
      </div>
      {scanning==true?
      <QRCodeScan qr={handleQrChange} />:
      <></>}
      <br />
      <Button color="secondary" variant="contained" className='searchItemButton' endIcon={<ArrowForwardIosIcon />} onClick={() => {setTimeout(searchForBox, 250)}}>SEARCH BOXES</Button>
      {/* <Link to="/box_search_results">
      <button onClick={searchForBox}>Search</button>
      </Link>
      <p>{JSON.stringify(searchBox)}</p> */}
    </div>
  );
}

export default BoxSearch;
