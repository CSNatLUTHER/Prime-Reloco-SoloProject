import React, { useEffect, useState } from 'react';
import {useDispatch, useSelector} from 'react-redux';
import ItemSearch from './ItemSearch/ItemSearch';
import BoxSearch from './BoxSearch/BoxSearch';

// Basic functional component structure for React with default state
// value setup. When making a new component be sure to replace the
// component name TemplateFunction with the name for the new component.
function MoveEventHome(props) {
  //define dispatch
  const dispatch = useDispatch()

  // Using hooks we're creating local state for a "heading" variable with
  // a default value of 'Functional Component'
  const store = useSelector((store) => store);
  const event = useSelector((store) => store.active_event);
  const [heading, setHeading] = useState('Move Event Home');

  // useEffect to call sagas and reducers and set Event Items and Boxes
  useEffect( () => {
    dispatch({ type: 'FETCH_EVENT_USERS', payload: store.active_event.id });
  }, []);
  

  return (
    <div className='component'>
      <h2>{heading}</h2>
      <h4>{JSON.stringify(event)}</h4>
      <ItemSearch />
      <BoxSearch />
    </div>
  );
}

export default MoveEventHome;
