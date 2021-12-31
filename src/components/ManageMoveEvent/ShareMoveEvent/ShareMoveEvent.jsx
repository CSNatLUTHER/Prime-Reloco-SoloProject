import React, { useState } from 'react';
import {useSelector} from 'react-redux';
import {CopyToClipboard} from 'react-copy-to-clipboard';
import './ShareMoveEvent.css';
import Button from '@mui/material/Button';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';


// Basic functional component structure for React with default state
// value setup. When making a new component be sure to replace the
// component name TemplateFunction with the name for the new component.
function ShareMoveEvent(props) {
  // Using hooks we're creating local state for a "heading" variable with
  // a default value of 'Functional Component'
  const store = useSelector((store) => store);
  const [heading, setHeading] = useState('SHARE MOVE EVENT');

  const shareCode = () => {
    alert('Event Code: ' + store.active_event.share_code +  '\n\nAn invitation has been copied to you clipboard! \nYou can now text or email it to a collaborator')
  }

  return (
    <div className='component'>
      <h2 className='shareMoveEventHeader'>{heading}</h2>
      <p><b>MOVE EVENT SHARE CODE: <br /><br />{store.active_event.share_code} </b></p>
      <CopyToClipboard text={`${store.user.first_name} ${store.user.last_name} is inviting you to join their moving event on RELOCO. Please join: ${store.active_event.name} with event code: ${store.active_event.share_code}`}>
      {/* <button onClick={shareCode} >Share Move Event Code</button> */}
      <Button color="secondary" variant="contained" className='searchItemButton' endIcon={<ContentCopyIcon />} onClick={() => {setTimeout(shareCode, 250)}}>COPY CODE</Button>
      </CopyToClipboard>
      {/* <p>Move Event Code:{JSON.stringify(store.active_event.share_code)}</p> */}
    </div>
  );
}

export default ShareMoveEvent;
