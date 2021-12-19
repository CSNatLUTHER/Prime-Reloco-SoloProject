import React, { useState, useEffect } from 'react';
import {useDispatch, useSelector} from 'react-redux';
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

  // define dispatch
  const dispatch = useDispatch();
  // kick-off many of the FETCH actions needed to set initial reducers
  useEffect( () => {
    dispatch({ type: 'FETCH_BOX_ITEMS', payload: {id: store.active_box.id} });
  }, []);

  return (
    <div className='component'>
      <h2>{heading}</h2>
      <div>
        {/* <BoxContentsItem /> */}
        {boxContents.map(boxContentsItem => (<BoxContentsItem className="boxContentsItem" boxContenstItem={boxContentsItem} key={boxContentsItem.id} />))}
      </div>
    </div>
  );
}

export default boxContentsList;
