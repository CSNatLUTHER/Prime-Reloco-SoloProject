import React, { useState } from 'react';
import {useSelector} from 'react-redux';
import {CopyToClipboard} from 'react-copy-to-clipboard';

// Basic functional component structure for React with default state
// value setup. When making a new component be sure to replace the
// component name TemplateFunction with the name for the new component.
function ShareMoveEvent(props) {
  // Using hooks we're creating local state for a "heading" variable with
  // a default value of 'Functional Component'
  const store = useSelector((store) => store);
  const [heading, setHeading] = useState('Share Move Event');

  const shareCode = () => {
    if (navigator.canShare) {
      navigator.share({
        title: 'Lee Martin',
        text: 'Netmaker. Playing the Internet in your favorite band for nearly two decades.',
        url: 'https://leemartin.dev'
      })
      .then(() => console.log('Share was successful.'))
      .catch((error) => console.log('Sharing failed', error));
    } else{console.log('I cannot share!')}
    // alert('Event data has been copied to clipboard!')
  }

  return (
    <div className='component'>
      <h2>{heading}</h2>
      <CopyToClipboard text={`Please join: ${store.active_event.name} with event code: ${store.active_event.share_code}`}>
      <button onClick={shareCode} >Share Move Event Code</button>
      </CopyToClipboard>
      <p>Move Event Code:{JSON.stringify(store.active_event.share_code)}</p>
    </div>
  );
}

export default ShareMoveEvent;
