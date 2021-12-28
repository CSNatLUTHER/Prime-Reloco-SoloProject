import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import {useSelector} from 'react-redux';

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

  const submitMessage = () => {
    console.log('Message Submitted with:', contactForm);
    dispatch({type:'SUBMIT_MESSAGE', payload:contactForm})
    props.setThankYou()
  }

  return (
    <div className='component'>
      <h2>{heading}</h2>
      <p>Name:</p><input type="text" placeholder='ex. Jane Doe' value={contactForm.name} onChange={handleNameChange}/>
      <p>Email:</p><input type="text" placeholder='ex. email@domain.com' value={contactForm.email} onChange={handleEmailChange}/>
      <p>Subject:</p><input type="text" placeholder='ex. Password Help' value={contactForm.subject} onChange={handleSubjectChange}/>
      <p>Message:</p><textarea cols="30" rows="10" placeholder='ex. Your message here...' value={contactForm.message} onChange={handleMessageChange}/>
      <br />
      <br />
      <button onClick={submitMessage}>Submit Message</button>
      <p>contactForm: {JSON.stringify(contactForm)}</p>

    </div>
  );
}

export default contactUs;
