import React, { useState } from 'react';
import { useDispatch, useSelector} from 'react-redux';
import { Link } from 'react-router-dom';
import './ResultsItem.css'

// Basic functional component structure for React with default state
// value setup. When making a new component be sure to replace the
// component name TemplateFunction with the name for the new component.
function resultsItem(props) {
  //set dispatch
  const dispatch = useDispatch()
  // Using hooks we're creating local state for a "heading" variable with
  // a default value of 'Functional Component'
  const store = useSelector((store) => store);
  const [heading, setHeading] = useState('Results Item');

  const selectItem = () => {
    dispatch({type:'SET_ACTIVE_ITEM', payload:props.item})
  }
  return (
    <div className='component'>
      <img className='itemImage' src={props.item.image_path} />
      <h2>{heading}</h2>
      <p>{JSON.stringify(props.item)}</p>
      <Link to="/item_info">
      <button onClick={selectItem}>Select Item</button>
      </Link>
    </div>
  );
}

export default resultsItem;
