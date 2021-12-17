import React, { useState } from 'react';
import {useSelector} from 'react-redux';
import BoxContentsItem from '../BoxContentsItem/BoxContentsItem';

// Basic functional component structure for React with default state
// value setup. When making a new component be sure to replace the
// component name TemplateFunction with the name for the new component.
function boxContentsList(props) {
  // Using hooks we're creating local state for a "heading" variable with
  // a default value of 'Functional Component'
  const store = useSelector((store) => store);
  const boxContents = useSelector(store => store.active_box_items);
  const [heading, setHeading] = useState('Box Contents List');

  return (
    <div>
      <h2>{heading}</h2>
      <div>
        <h4>Box Contents: {JSON.stringify(boxContents)}</h4>
        <BoxContentsItem />
        {/* {boxContents.map(boxContentsItem => (<BoxContentsItem className="boxContentsItem" boxContenstItem={boxContentsItem} key={boxContentsItem.id} />))} */}
      </div>
    </div>
  );
}

export default boxContentsList;
