import React, { useState } from 'react';
import {useSelector} from 'react-redux';
import ResultsBox from '../BoxResultsList/ResultsBox/ResultsBox'

// Basic functional component structure for React with default state
// value setup. When making a new component be sure to replace the
// component name TemplateFunction with the name for the new component.
function boxResultsList(props) {
  // Using hooks we're creating local state for a "heading" variable with
  // a default value of 'Functional Component'
  const store = useSelector((store) => store);
  const [heading, setHeading] = useState('Box Results List');
  const searchResults = useSelector((store) => store.search_results);

  return (
    <div>
      <h2>{heading}</h2>
      <h4>Search Results: {JSON.stringify(searchResults)}</h4>
      {/* {searchResults.map(item => (<ResultsBox className="resultsBox" item={item} key={item.id} />))} */}
      <ResultsBox />
    </div>
  );
}

export default boxResultsList;
