import React, { useState } from 'react';
import {useSelector} from 'react-redux';
import QRCodeScan from '../../SharedComponents/QRCodeScan/QRCodeScan';
import { Link } from 'react-router-dom';

// Basic functional component structure for React with default state
// value setup. When making a new component be sure to replace the
// component name TemplateFunction with the name for the new component.
function BoxSearch(props) {
  // Using hooks we're creating local state for a "heading" variable with
  // a default value of 'Functional Component'
  const store = useSelector((store) => store);
  const [heading, setHeading] = useState('Box Search');

  return (
    <div>
      <h2>{heading}</h2>
      <input type='text' placeholder='ex. box name or QR'></input>
      <QRCodeScan />
      <br />
      <Link to="/box_search_results">
      <button>Search</button>
      </Link>
    </div>
  );
}

export default BoxSearch;
