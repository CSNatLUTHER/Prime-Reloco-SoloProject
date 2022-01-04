import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import ResultsBox from '../BoxResultsList/ResultsBox/ResultsBox'
import './BoxResultsList.css'
import { useHistory } from 'react-router-dom';
import Button from '@mui/material/Button';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';

// Basic functional component structure for React with default state
// value setup. When making a new component be sure to replace the
// component name TemplateFunction with the name for the new component.
function boxResultsList(props) {
  // Using hooks we're creating local state for a "heading" variable with
  // a default value of 'Functional Component'
  const store = useSelector((store) => store);
  const [heading, setHeading] = useState('Box Results List');
  const boxResults = useSelector((store) => store.boxes);

  const history = useHistory();
  
  return (
    <div className='component'>
      {/* <h2>{heading}</h2> */}
      {/* <h4>Search Results: {JSON.stringify(boxResults)}</h4> */}
      {boxResults.length === 0 ?
        <>
          <br />
          <h2>NO RESULTS FOUND</h2>
          <br />
          <Button color="secondary" variant="contained" className='searchItemBackButton' startIcon={<ArrowBackIosIcon />} onClick={() => { setTimeout(() => history.push('/move_event_home'), 250) }}>RETURN TO SEARCH</Button>
        </>:
        <>
          <Button color="secondary" variant="contained" className='searchItemBackButton' startIcon={<ArrowBackIosIcon />} onClick={() => { setTimeout(() => history.push('/move_event_home'), 250) }}>RETURN TO SEARCH</Button>
          <br />
          <br />
          {boxResults.map(box => (<ResultsBox className="resultsBox" box={box} key={box.id} />))}
        </>
      }
      {/* <ResultsBox /> */}
    </div>
  );
}

export default boxResultsList;
