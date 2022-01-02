import React from 'react';
import LoginForm from '../LoginForm/LoginForm';
import { useHistory } from 'react-router-dom';
import Button from '@mui/material/Button';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import './LoginPage.css'

function LoginPage() {
  const history = useHistory();

  return (
    <div>
      <img className='brand'src="/images/brand.png" alt="" />
      <LoginForm />
      <br />
      <br />
      <Button color="success" variant="outlined" className='registerButton' endIcon={<ArrowForwardIosIcon />} onClick={ () => { setTimeout(() => { history.push('/registration')}, 250) } }>REGISTER</Button>
    </div>
  );
}

export default LoginPage;
