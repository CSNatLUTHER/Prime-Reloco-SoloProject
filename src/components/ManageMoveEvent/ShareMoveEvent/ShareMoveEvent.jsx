import React, { useState } from 'react';
import {useSelector} from 'react-redux';
import {CopyToClipboard} from 'react-copy-to-clipboard';
import './ShareMoveEvent.css';
import Button from '@mui/material/Button';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import Swal from 'sweetalert2';


// Basic functional component structure for React with default state
// value setup. When making a new component be sure to replace the
// component name TemplateFunction with the name for the new component.
function ShareMoveEvent(props) {
  // Using hooks we're creating local state for a "heading" variable with
  // a default value of 'Functional Component'
  const store = useSelector((store) => store);
  const [heading, setHeading] = useState('SHARE MOVE EVENT');

  const shareCode = () => {
    Swal.fire({
      icon: 'info',
      title: 'Copied!',
      html: `<div><p><b>Event Code: </b>${store.active_event.share_code}</p><p>An invitation has been copied to your clipboard!</p><p>You can now text or email it to a collaborator</p></div>`,
      width: '90%',
      iconColor: '#3f51b5',
      confirmButtonColor:'#ffc400'
    });
  }

  return (
    <div className='component'>
      <h2 className='shareMoveEventHeader'>{heading}</h2>
      <p><b>MOVE EVENT SHARE CODE: <br /><br />{store.active_event.share_code} </b></p>
      <CopyToClipboard text={`${store.user.first_name} ${store.user.last_name} is inviting you to join their moving event on RELOCO. \nPlease join: ${store.active_event.name} with event code: ${store.active_event.share_code}\nhttps://reloco.herokuapp.com`}>
      <Button color="secondary" variant="contained" className='searchItemButton' endIcon={<ContentCopyIcon />} onClick={() => {setTimeout(shareCode, 250)}}>COPY CODE</Button>
      </CopyToClipboard>
    </div>
  );
}

export default ShareMoveEvent;
