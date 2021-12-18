import React, { useState } from 'react';
import {useSelector} from 'react-redux';
import ResultsItem from './ResultsItem/ResultsItem';

// Basic functional component structure for React with default state
// value setup. When making a new component be sure to replace the
// component name TemplateFunction with the name for the new component.
function itemResultsList(props) {
  // Using hooks we're creating local state for a "heading" variable with
  // a default value of 'Functional Component'
  const store = useSelector((store) => store);
  const itemList = useSelector((store) => store.items);
  const [heading, setHeading] = useState('Item Results List');

  return (
    <div className='component'>
      <h2>{heading}</h2>
      {itemList.map(item => (<ResultsItem className="ResultsItem" item={item} key={item.id} />))}
      {/* <ResultsItem /> */}
    </div>
  );
}

export default itemResultsList;
