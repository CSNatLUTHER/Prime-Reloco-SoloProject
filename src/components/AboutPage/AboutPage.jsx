import React from 'react';
import './AboutPage.css'

// This is one of our simplest components
// It doesn't have local state,
// It doesn't dispatch any redux actions or display any part of redux state
// or even care what the redux state is'

function AboutPage() {
  return (
    <div className="container">
      <div>
        <img src="/images/brand.png" className='brand' />
        <p className='aboutText'>Making a move can feel overwhelming as you consider the process of getting possessions organized and to their final destination. 

Major decisions like what items to donate, purge, store or ship can be difficult, and tracking those decisions is challenging. 

This application is designed to aide you in tracking all your belongings at an item, box and location level. 

Each independent item and box will have a unique QR code that will allow you to provide key details for later refernce. You can also put an item into a box and and make note to whether the item/box will be shipped, stored, donated, sold or purged. 

If you have a major life event happening that requires multiple moving events, you create and manage multiple events concurrently. Finally, you can invite others to join your moving event so you can collaborate on a move with friends and family. </p>
      </div>
    </div>
  );
}

export default AboutPage;
