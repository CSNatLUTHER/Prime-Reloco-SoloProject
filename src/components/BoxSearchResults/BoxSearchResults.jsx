import React, { useState, useEffect } from 'react';
import {useSelector} from 'react-redux';
import BoxResultsList from '../BoxSearchResults/BoxResultsList/BoxResultsList';
import './BoxSearchResults.css';

// Basic functional component structure for React with default state
// value setup. When making a new component be sure to replace the
// component name TemplateFunction with the name for the new component.
function boxSearchResults(props) {
  // Using hooks we're creating local state for a "heading" variable with
  // a default value of 'Functional Component'
  const store = useSelector((store) => store);
  const [heading, setHeading] = useState('BOX SEARCH RESULTS');

  useEffect( () => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className='component'>
      <img className='boxSearchResultsLogo' src="/images/brand.png" alt="" />
      <h2 className='boxSearchResultsHeader'>{heading}</h2>
      <BoxResultsList />
    </div>
  );
}

export default boxSearchResults;
