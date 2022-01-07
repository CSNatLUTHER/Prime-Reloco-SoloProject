import React, { useState } from 'react';
import {useDispatch, useSelector} from 'react-redux';
import QRCodeScan from '../../SharedComponents/QRCodeScan/QRCodeScan';
import { Link } from 'react-router-dom';
import './ItemSearch.css';
import Button from '@mui/material/Button';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { useHistory } from 'react-router-dom';
import TextField from '@mui/material/TextField';
import QrCodeScannerIcon from '@mui/icons-material/QrCodeScanner';
import IconButton from '@mui/material/IconButton';

// Basic functional component structure for React with default state
// value setup. When making a new component be sure to replace the
// component name TemplateFunction with the name for the new component.
function ItemSearch(props) {
  const dispatch = useDispatch();
  // Using hooks we're creating local state for a "heading" variable with
  // a default value of 'Functional Component'
  const store = useSelector((store) => store);
  const event = useSelector((store) => store.active_event.event);
  const [heading, setHeading] = useState('ITEMS');
  const [scanning, setScanning] = useState(false);
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
    else{
      dispatch({ type: 'FETCH_ITEMS', payload: searchItem }); 
    }
    dispatch({ type: 'UNSET_QR_CODE' })
    history.push('/item_search_results')
  } 

  const handleQrChange = (event) => {
    setSearchItem({ ...searchItem, searchText: event })
    setScanning(false)
  }

  const history = useHistory()

  const handleCreate = () => {
  history.push('/create_new_item')
  }

  const scanClick = () => {
    setScanning(!scanning)
  }

  return (
    <div className='component'>
      <h2 className='itemSearchHeader'>{heading}</h2>
      <Button color="secondary" variant="contained" className='createNewItemButton' endIcon={<ArrowForwardIosIcon />} onClick={() => {setTimeout(handleCreate, 250)}}>CREATE NEW ITEM</Button>
      <br />
      <br />
      {/* <input  type='text' placeholder='ex. item name or QR' value={searchItem.searchText} onChange={handleSearchChange}></input> */}
      <div className='searchContainer'>
        <div className='itemSearchTextFieldDiv'>
          <TextField
              id="itemOutlined-search"
              label="SEARCH ITEMS"
              type="search"
              value={searchItem.searchText}
              onChange={handleSearchChange}
              className='itemSearchTextField'
            />
        </div>
        <div className='qrIconButtonDiv'>
          <IconButton onClick={scanClick} size="large" color="primary">
            <QrCodeScannerIcon 
            className='qrIconButton'
            />
          </IconButton>
        </div>
      </div>
      {scanning==true?
      <QRCodeScan qr={handleQrChange} />:
      <></>}
      <br />
      {/* <Link to="/item_search_results"> */}
      {/* <button onClick={searchForItem}>Search</button> */}
      <Button color="secondary" variant="contained" className='searchItemButton' endIcon={<ArrowForwardIosIcon />} onClick={() => {setTimeout(searchForItem, 250)}}>SEARCH ITEMS</Button>
      {/* </Link> */}
      {/* <p>{JSON.stringify(searchItem)}</p> */}
    </div>
  );
}

export default ItemSearch;
