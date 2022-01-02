import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import {useSelector} from 'react-redux';
import './ContactUs.css';
import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';
import TextField from '@mui/material/TextField';

// Basic functional component structure for React with default state
// value setup. When making a new component be sure to replace the
// component name TemplateFunction with the name for the new component.
function contactUs(props) {
  const dispatch = useDispatch()
  // Using hooks we're creating local state for a "heading" variable with
  // a default value of 'Functional Component'
  const store = useSelector((store) => store);
  const [heading, setHeading] = useState('Contact Us Form');
  const [contactForm, setContactForm] = useState({
                                              name:'',
                                              email: '',
                                              subject: '',
                                              message:''  
                                            });

  const handleNameChange = (event) => {
    setContactForm({...contactForm, name:event.target.value})
  }  
  
  const handleEmailChange = (event) => {
    setContactForm({...contactForm, email:event.target.value})
  }  

  const handleSubjectChange = (event) => {
    setContactForm({...contactForm, subject:event.target.value})
  }  

  const handleMessageChange = (event) => {
    setContactForm({...contactForm, message:event.target.value})
  }  
  const validateMessage = () => {
    if(contactForm.name != '' && contactForm.subject != '' && contactForm.message != ''){
      if(contactForm.email.includes('@' && '.')){
        submitMessage()
      }
      else{
        alert('Email address appears invalid')
      }
    }
    else{
      alert('All fields are required to send message.');
    }
  }

  const submitMessage = () => {
    console.log('Message Submitted with:', contactForm);
    dispatch({type:'SUBMIT_MESSAGE', payload:contactForm})
    props.setThankYou()
  }

  return (
    <div className='component'>
      <TextField
          id="contactName"
          label='NAME'
          type="required"
          value={contactForm.name}
          onChange={handleNameChange}
          className='contactGeneralTextField'
          />
          <br />
          <br />
      <TextField
          id="contactEmail"
          label='EMAIL'
          type="required"
          value={contactForm.email}
          onChange={handleEmailChange}
          className='contactGeneralTextField'
          />
          <br />
          <br />
      <TextField
          id="contactSubject"
          label='SUBJECT'
          type="required"
          value={contactForm.subject}
          onChange={handleSubjectChange}
          className='contactGeneralTextField'
          />
          <br />
          <br />
      <TextField
          multiline
          id="contactSubject"
          label='MESSAGE'
          type="required"
          rows={4}
          value={contactForm.message}
          inputProps={{ maxLength: 1000 }}
          onChange={handleMessageChange}
          className='contactMessageTextField'
          />
      <br />
      <br />
      <Button color="secondary" variant="contained" className='sendMessageButton' endIcon={<SendIcon />} onClick={() => {setTimeout(validateMessage, 250)}}>SEND MESSAGE</Button>

    </div>
  );
}

export default contactUs;
