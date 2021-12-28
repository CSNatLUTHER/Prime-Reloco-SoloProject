import React from 'react';
import './Footer.css';

// This is one of our simplest components
// It doesn't have local state, so it can be a function component.
// It doesn't dispatch any redux actions or display any part of redux state
// or even care what the redux state is, so it doesn't need 'connect()'

function Footer() {
  return <footer>
              <img className='footerBrand' src="/images/logo.png" alt="" />
              <span className='footerName'>RELOCO</span>
  </footer>;
}

export default Footer;
