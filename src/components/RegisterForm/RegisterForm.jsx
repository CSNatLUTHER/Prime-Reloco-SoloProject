import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Button from '@mui/material/Button';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import TextField from '@mui/material/TextField';
import './RegisterForm.css'
import Swal from 'sweetalert2'

function RegisterForm() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const errors = useSelector((store) => store.errors);
  const dispatch = useDispatch();

  const validateData = () => {
    if(firstName != '' && lastName != '' && password != ''){
      if(username.includes('@' && '.')){
        registerUser()
      }
      else{
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Username (email address) appears invalid.',
          width: '90%',
          iconColor: '#3f51b5',
          confirmButtonColor:'#ffc400'
        })
      }
    }
    else{
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'All fields are required to send message.',
        width: '90%',
        iconColor: '#3f51b5',
        confirmButtonColor:'#ffc400'
      });
    }
  }


  const registerUser = (event) => {
    event.preventDefault();

    dispatch({
      type: 'REGISTER',
      payload: {
        firstName:firstName,
        lastName: lastName,
        username: username,
        password: password,
      },
    });
  }; // end registerUser

  return (
    <form className="formPanel" onSubmit={registerUser}>
      <h2 className='registerFormHeader'>REGISTER</h2>
      {errors.registrationMessage && (
        <h3 className="alert" role="alert">
          {errors.registrationMessage}
        </h3>
      )}
      <div>
        <TextField
          id="firstname"
          label='FIRST NAME'
          type="required"
          value={firstName}
          onChange={(event) => setFirstName(event.target.value)}
          className='registerGeneralTextField'
          />
        <br />
        <br />
        <TextField
          id="lastname"
          label='LAST NAME'
          type="required"
          value={lastName}
          onChange={(event) => setLastName(event.target.value)}
          className='registerGeneralTextField'
          />
        <br />
        <br />
        <TextField
          id="username"
          label='USERNAME (email)'
          type="required"
          value={username}
          onChange={(event) => setUsername(event.target.value)}
          className='registerGeneralTextField'
          />
        <br />
        <br />
        <TextField
          id="password"
          label='PASSWORD'
          type="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          className='registerGeneralTextField'
          />
      </div>
      <br />
      <div>
        {/* <input className="btn" type="submit" name="submit" value="Register" /> */}
        <Button color="secondary" variant="contained" className='registerFormButton' endIcon={<ArrowForwardIosIcon />} onClick={validateData}>REGISTER</Button>
      </div>
    </form>
  );
}

export default RegisterForm;
