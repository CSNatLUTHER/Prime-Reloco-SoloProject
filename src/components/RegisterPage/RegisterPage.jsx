import React from 'react';
import { useHistory } from 'react-router-dom';
import RegisterForm from '../RegisterForm/RegisterForm';
import './RegisterPage.css'
import Button from '@mui/material/Button';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';

function RegisterPage() {
  const history = useHistory();

  return (
    <div>
      <img className='registerFormBrand' src="/images/brand.png" alt="" />
      <RegisterForm />
      <br />
      <br />
      <Button color="success" variant="outlined" className='loginReturnButton' startIcon={<ArrowBackIosIcon />} onClick={ () => { setTimeout(() => { history.push('/login')}, 250) } }> RETURN TO LOGIN</Button>
    </div>
  );
}

export default RegisterPage;
