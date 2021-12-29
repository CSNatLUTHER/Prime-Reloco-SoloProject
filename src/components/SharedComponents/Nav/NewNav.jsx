import React, { useEffect, useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import LogOutButton from '../LogOutButton/LogOutButton';
import { useSelector } from 'react-redux';
import { slide as Menu } from 'react-burger-menu'
import { useHistory } from 'react-router-dom';

function NewNav() {
  const user = useSelector((store) => store.user);


  
  return (
      <Menu 
        right
      >
        <img className='navLogo' src="/images/logo.png" alt="" />
          {/* If no user is logged in, show these links */}
          {user.id != null?
            // If there's no user, show login/registration links
            <></>:
            <>
            <a className="menu-item" className="navLink"  href="/login">
              Login / Register
            </a>
            </>
          }

          {/* If a user is logged in, show these links */}
          {user.id && (
            <>
              <Link className="navLink" to="/user">Home</Link>
              <br />
              <Link className="menu-item" className="navLink"  to="/move_event_home">Move Event Home</Link>
              <br />
              {/* <a id="home" className="menu-item" href="/move_event_home">Home</a>
              <br /> */}
              <Link onClick={()=>{setMenuOpen(false)}} className="menu-item" className="navLink" to="/move_event_home">Search</Link>
              <br />
              <Link onClick={()=>{setMenuOpen(false)}}className="menu-item" className="navLink" >TEST</Link>
              <br />
              <LogOutButton className="navLink" />
            </>
          )}

          <Link className="menu-item" className="navLink" to="/about">
              About
              </Link>
          <Link className="menu-item" className="navLink" to="/contact">Contact</Link>
        
      </Menu>
  );
}

export default NewNav;
