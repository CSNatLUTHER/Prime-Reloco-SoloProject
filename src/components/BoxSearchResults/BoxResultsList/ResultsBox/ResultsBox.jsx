import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import {useSelector} from 'react-redux';
import { Link } from 'react-router-dom';
// import './ResultsBox.css'

// Basic functional component structure for React with default state
// value setup. When making a new component be sure to replace the
// component name TemplateFunction with the name for the new component.
function resultsBox(props) {
  const dispatch = useDispatch()
  // Using hooks we're creating local state for a "heading" variable with
  // a default value of 'Functional Component'
  const store = useSelector((store) => store);
  const [heading, setHeading] = useState('Results Box');

  const setActiveBox = () => {
    dispatch({type: 'SET_ACTIVE_BOX', payload:props.box})
  }

  return (
    <div className='component'>
      <h2>{heading}</h2>
      <img className='boxImage' src="/images/transparent_box.png" />
      <br />
      <Link to='/box_info'>
      <button onClick={setActiveBox}>See Box Details</button>
      </Link>
      <p>{JSON.stringify(props.box)}</p>
    </div>
  );
}

export default resultsBox;
