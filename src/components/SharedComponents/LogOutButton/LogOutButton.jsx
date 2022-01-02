import React from 'react';
import { useDispatch } from 'react-redux';
import LogoutIcon from '@mui/icons-material/Logout';
import Button from '@mui/material/Button';

function LogOutButton(props) {
  const dispatch = useDispatch();

  const appLogOut = () => {
    dispatch({ type: 'LOGOUT' })
    dispatch({ type: 'UNSET_ACTIVE_EVENT' })
    dispatch({ type: 'UNSET_EVENTS' })
  }

  return (
    <Button color="secondary" variant="outlined" className='contactThankYouButton' endIcon={<LogoutIcon />} onClick={() => setTimeout(appLogOut, 500)}>LOGOUT</Button>
  );
}

export default LogOutButton;
