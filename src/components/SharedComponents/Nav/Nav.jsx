import React from 'react';
import { Link } from 'react-router-dom';
import LogOutButton from '../LogOutButton/LogOutButton';
import './Nav.css';
import { useSelector } from 'react-redux';

function Nav() {
  const user = useSelector((store) => store.user);

  return (
    <div className="nav">
      <Link to="/home">
        <h2 className="nav-title">Prime Solo Project</h2>
      </Link>
      <div>
        {/* If no user is logged in, show these links */}
        {user.id === null &&
          // If there's no user, show login/registration links
          <>
          <Link className="navLink" to="/login">
            Login / Register
          </Link>
          </>
        }

        {/* If a user is logged in, show these links */}
        {user.id && (
          <>
            <Link className="navLink" to="/user">
              Home
            </Link>
{/* 
            <Link className="navLink" to="/create_move_event">
            New Move Event
            </Link> */}

            {/* <Link className="navLink" to="/manage_event">
            Manage Event
            </Link> */}

            <Link className="navLink" to="/move_event_home">
            Move Event Home
            </Link>

            <Link className="navLink" to="/move_event_home">
            Search
            </Link>

            {/* <Link className="navLink" to="/create_new_item">
            Create New Item
            </Link> */}

            {/* <Link className="navLink" to="/new_item_confirmation">
            New Item Confirm
            </Link> */}

            {/* <Link className="navLink" to="/item_search_results">
            Item Search Results
            </Link> */}
{/* 
            <Link className="navLink" to="/item_info">
            Item Info
            </Link> */}
{/* 
            <Link className="navLink" to="/item_edit">
            Item Edit
            </Link> */}

            {/* <Link className="navLink" to="/create_new_box">
            Create New Box
            </Link> */}

            {/* <Link className="navLink" to="/new_box_confirmation">
            New Box Confirmation
            </Link> */}

            {/* <Link className="navLink" to="/box_search_results">
            Box Search Results
            </Link> */}

            {/* <Link className="navLink" to="/box_info">
            Box Info
            </Link> */}
{/* 
            <Link className="navLink" to="/box_edit">
            Box Edit
            </Link> */}

            {/* <Link className="navLink" to="/box_contents">
            Box Contents
            </Link> */}

            <LogOutButton className="navLink" />
          </>
        )}
        <Link className="navLink" to="/about">
        About
        </Link>

        <Link className="navLink" to="/contact_us">
        Contact Us
        </Link>

        <Link className="navLink" to="/contact_thank_you">
        Contact Thank You
        </Link>
      </div>
    </div>
  );
}

export default Nav;
