import React, { useState } from 'react';
import {useSelector} from 'react-redux';
import ItemResultsList from './ItemResultsList/ItemResultsList'
import './ItemSearchResults.css';
import { useHistory } from "react-router-dom";

// Basic functional component structure for React with default state
// value setup. When making a new component be sure to replace the
// component name TemplateFunction with the name for the new component.
function itemSearchResults(props) {
  // Using hooks we're creating local state for a "heading" variable with
  // a default value of 'Functional Component'
  const store = useSelector((store) => store);
  const [heading, setHeading] = useState('ITEM SEARCH RESULTS');
  let history = useHistory();
  return (
    <div className='component'>
      <img className='itemSearchResultsLogo' src="/images/brand.png" alt="" />
      <h2 className ='itemSearchResultsHeader'>{heading}</h2>
      <ItemResultsList />
    </div>
  );
}

export default itemSearchResults;
