import React, { useState } from 'react';
import {useSelector} from 'react-redux';
import ResultsItem from './ResultsItem/ResultsItem';
import Button from '@mui/material/Button';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import './ItemResultsList.css';
import { useHistory } from 'react-router-dom';

function itemResultsList(props) {
  const store = useSelector((store) => store);
  const itemList = useSelector((store) => store.items);
  const [heading, setHeading] = useState('Item Results List');
  const history = useHistory();

  return (
    <div className='component'>
      {itemList.length === 0?
        <>
        <br />
        <h2>NO RESULTS FOUND</h2>
        <br />
        <Button color="secondary" variant="contained" className='searchItemBackButton' startIcon={<ArrowBackIosIcon />} onClick={() => {setTimeout(()=>history.push('/move_event_home'), 250)}}>RETURN TO SEARCH</Button>
        </>:
        <>
        <Button color="secondary" variant="contained" className='searchItemBackButton' startIcon={<ArrowBackIosIcon />} onClick={() => {setTimeout(()=>history.push('/move_event_home'), 250)}}>RETURN TO SEARCH</Button>
        <br />
        <br />
        {itemList.map(item => (<ResultsItem className="ResultsItem" item={item} key={item.id} />))}
        </>
      }
    </div>
  );
}

export default itemResultsList;
