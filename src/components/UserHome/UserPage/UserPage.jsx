import React from 'react';
import LogOutButton from '../../SharedComponents/LogOutButton/LogOutButton';
import {useSelector} from 'react-redux';
import MoveEventList from '../MoveEventList/MoveEventList';
import CreateMoveEvent from '../../CreateMoveEvent/CreateMoveEvent'

function UserPage() {
  // this component doesn't do much to start, just renders some user reducer info to the DOM
  const user = useSelector((store) => store.user);
  return (
    <div className="container">
      <h2>Welcome, {user.first_name} {user.last_name}!</h2>
      <p>Your ID is: {user.id}</p>
      <LogOutButton className="btn" />
      <CreateMoveEvent />
      <MoveEventList />
    </div>
  );
}

// this allows us to use <App /> in index.js
export default UserPage;
