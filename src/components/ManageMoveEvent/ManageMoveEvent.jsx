import React, { useEffect, useState } from 'react';
import {useDispatch, useSelector} from 'react-redux';
import EventMemberList from './EventMemberList/EventMemberList';
import LeaveMoveEvent from './LeaveMoveEvent/LeaveMoveEvent';
import ShareMoveEvent from './ShareMoveEvent/ShareMoveEvent';
import { Link } from 'react-router-dom';
import './ManageMoveEvent.css';
import Button from '@mui/material/Button';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { useHistory } from 'react-router-dom';
import Swal from 'sweetalert2';

// Basic functional component structure for React with default state
// value setup. When making a new component be sure to replace the
// component name TemplateFunction with the name for the new component.
function ManageMoveEvent(props) {
  //define dispatch
  const dispatch = useDispatch()
  // Using hooks we're creating local state for a "heading" variable with
  // a default value of 'Functional Component'
  const store = useSelector((store) => store);
  const [heading, setHeading] = useState('Manage Move Event');

  const history = useHistory()

  const deleteEvent = () => {
    console.log('In deleteEvent!');
    dispatch({
          type:'DELETE_EVENT', 
          payload:{
            event_id:store.active_event.id,
            user_id:store.user.id
          }
    })
      history.push('/user')
  }

  const deleteConfirm = () => { 
    Swal.fire({
      title: 'Are you sure you want to delete '+ store.active_event.name + '?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      width: '90%',
      iconColor: '#3f51b5',
      showCancelButton: true,
      confirmButtonColor: '#3f51b5',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        deleteConfirmItemsAndBoxes()
      }
    })
  }

  const deleteConfirmItemsAndBoxes = () => { 
    Swal.fire({
      title: 'Are you REALLY sure you want to delete '+ store.active_event.name + '?',
      text: "This will also delete ALL items and boxes associated with this event!",
      icon: 'question',
      width: '90%',
      iconColor: '#3f51b5',
      showCancelButton: true,
      confirmButtonColor: '#3f51b5',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title:'Deleted!',
          text: store.active_event.name +' has been deleted.',
          icon:'success',
          width: '90%',
          iconColor: '#3f51b5',
          confirmButtonColor:'#ffc400'
        })
        deleteEvent()
      }
    })
  }

  let moveDate = new Date(store.active_event.move_date).toLocaleDateString( 'en-US',{
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    // hour: '2-digit',
    // minute: '2-digit'
});

  return (
    <div className='component'>
       <img className='manageMoveEventHomeLogo' src="/images/brand.png" alt="" />
      <h1 className ='manageMoveEventHomeHeader'>{store.active_event.name}</h1>
      <p><b>MOVE OWNER:</b> {store.active_event.owner_first_name} {store.active_event.owner_last_name}</p>
      <p><b>MOVE DATE:</b> {moveDate}</p>
      <ShareMoveEvent />
      <EventMemberList />
      {(store.user.id === store.active_event.creator_user_id)?
        <>
          <h2 className ='manageMoveEvenDeleteHeader'>DELETE EVENT</h2>
          <Button color="error" variant="contained" className='deleteEventButton' endIcon={<DeleteForeverIcon />} onClick={() => {setTimeout(deleteConfirm, 250)}}>DELETE EVENT</Button>
        </>:
        <></>
      }
      {/* <p>User ID:{JSON.stringify(store.user.id)}</p>
      <p>Creator ID:{JSON.stringify(store.active_event.creator_user_id)}</p> */}
    </div>
  );
}

export default ManageMoveEvent;
