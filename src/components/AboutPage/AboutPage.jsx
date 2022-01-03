import React from 'react';
import './AboutPage.css';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import Button from '@mui/material/Button';
import { useHistory } from 'react-router-dom';
import { useEffect } from 'react';


function AboutPage() {

  useEffect(()=>{
    window.scroll(0,0)
  },[])

  const history = useHistory()

  const returnHome = () => {
    history.push('/user')
  }

  useEffect(()=>{
    window.scroll(0,0)
  },[])

  return (
    <div className="container">
        <img src="/images/brand.png" className='brand' />
        <p className='aboutText'>
          Making a move can feel overwhelming as you consider the process of getting possessions organized and to their final destination. 
          Major decisions like what items to donate, purge, store or ship can be difficult, and tracking those decisions is challenging. 
          {<br />}{<br />}This application is designed to be an aide in tracking all your belongings at an item, box and location level. 
          Each independent item and box will have a unique QR code that will allow you to provide key details for later refernce. 
          You can also put an item into a box and and make note to whether the item/box will be shipped, stored, donated, sold or purged. 
          {<br />}{<br />}If you have a major life event happening that requires multiple moving events, you create and manage multiple events concurrently. 
          Finally, you can invite others to join your moving event so you can collaborate on a move with friends and family.
          {<br />}{<br />}HAPPY MOVING!!! 
        </p>
        <br />
        <Button color="secondary" variant="contained" className='aboutUsButton' endIcon={<ArrowForwardIosIcon />} onClick={() => setTimeout(returnHome, 250)}>RETURN HOME</Button>
    </div>
  );
}

export default AboutPage;
