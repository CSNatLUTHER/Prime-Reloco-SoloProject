import React, { useState, useEffect } from 'react';
import {useDispatch, useSelector} from 'react-redux';
import BoxContentsItem from '../BoxContentsItem/BoxContentsItem';
import { Link } from 'react-router-dom';
import './BoxContentsList.css';
import Button from '@mui/material/Button';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { useHistory } from 'react-router-dom';


// Basic functional component structure for React with default state
// value setup. When making a new component be sure to replace the
// component name TemplateFunction with the name for the new component.
function boxContentsList(props) {
  // Using hooks we're creating local state for a "heading" variable with
  // a default value of 'Functional Component'
  const store = useSelector((store) => store);
  const boxContents = useSelector(store => store.active_box_items);
  const [heading, setHeading] = useState('BOX CONTENTS');

  // define dispatch
  const dispatch = useDispatch();
  // kick-off many of the FETCH actions needed to set initial reducers
  useEffect( () => {
    dispatch({ type: 'FETCH_BOX_ITEMS', payload: {id: store.active_box.id} });
  }, []);

  const history = useHistory()

  return (
    <div className='component'>
      <h2 className='BoxContentsListSubHeader'>{heading}</h2>
      <div>
        {boxContents.length === 0?
          <>
            <p><b>THIS BOX CONTAINS NO ITEMS</b></p>
            <Button color="secondary" variant="contained" className='searchItemButton' endIcon={<ArrowForwardIosIcon />} onClick={() => {setTimeout(() =>{history.push('/move_event_home')}, 250)}}>ADD ITEMS TO BOX</Button>
          </>:
          <div>
            {boxContents.map(boxContentsItem => (<BoxContentsItem className="boxContentsItem" boxContentsItem={boxContentsItem} key={boxContentsItem.item_id} />))}
          </div>
        }
      </div>
    </div>
  );
}

export default boxContentsList;
