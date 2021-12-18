import React, { useState } from 'react';
import {useSelector} from 'react-redux';
import QRCodeScan from '../../SharedComponents/QRCodeScan/QRCodeScan';
import { Link } from 'react-router-dom';

// Basic functional component structure for React with default state
// value setup. When making a new component be sure to replace the
// component name TemplateFunction with the name for the new component.
function ItemSearch(props) {
  // Using hooks we're creating local state for a "heading" variable with
  // a default value of 'Functional Component'
  const store = useSelector((store) => store);
  const event = useSelector((store) => store.active_event);
  const [heading, setHeading] = useState('Item Search');

  return (
    <div>
      <h2>{heading}</h2>
      <input type='text' placeholder='ex. item name or QR'></input>
      <QRCodeScan />
      <br />
      <Link to="/item_search_results">
      <button>Search</button>
      </Link>
    </div>
  );
}

export default ItemSearch;
