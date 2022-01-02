import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import {useSelector} from 'react-redux';
import './LoginForm.css';
import Button from '@mui/material/Button';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import TextField from '@mui/material/TextField';

function LoginForm() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const errors = useSelector(store => store.errors);
  const dispatch = useDispatch();

  const login = (event) => {
    event.preventDefault();

    if (username && password) {
      dispatch({
        type: 'LOGIN',
        payload: {
          username: username,
          password: password,
        },
      });
    } else {
      dispatch({ type: 'LOGIN_INPUT_ERROR' });
    }
  }; // end login

  return (
    <form className="formPanel" onSubmit={login}>
      <h2 className='loginFormHeader'>LOGIN</h2>
      {errors.loginMessage && (
        <h3 className="alert" role="alert">
          {errors.loginMessage}
        </h3>
      )}
      <div>
        <TextField
          id="username"
          label='USERNAME'
          type="required"
          value={username}
          onChange={(event) => setUsername(event.target.value)}
          className='loginFormGeneralTextField'
          />
      </div>
      <br />
      <div>
        <TextField
          id="password"
          label='PASSWORD'
          type="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          className='loginFormGeneralTextField'
          />
      </div>
      <br />
      <div>
        <Button color="secondary" variant="contained" className='LogInButton' endIcon={<ArrowForwardIosIcon />} onClick={login}>LOG IN</Button>
      </div>
    </form>
  );
}

export default LoginForm;
