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
  const boxResults = useSelector((store) => store.boxes);

  return (
    <div className='component'>
      {/* <h2>{heading}</h2> */}
      {/* <h4>Search Results: {JSON.stringify(boxResults)}</h4> */}
      {boxResults.map(box => (<ResultsBox className="resultsBox" box={box} key={box.id} />))}
      {/* <ResultsBox /> */}
    </div>
  );
}

export default boxResultsList;
