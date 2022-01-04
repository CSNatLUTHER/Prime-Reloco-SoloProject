import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import './EventMember.css';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import PersonRemoveIcon from '@mui/icons-material/PersonRemove';
import Typography from '@mui/material/Typography';
import LeaveMoveEvent from '../../LeaveMoveEvent/LeaveMoveEvent';
import Swal from 'sweetalert2';


function EventMember(props) {
  const dispatch = useDispatch();
  const store = useSelector((store) => store);
  const [heading, setHeading] = useState('Event Member');

  let userID = store.user.id;
  let creatorID = props.member.creator_user_id;
  let memberID = props.member.id;

  const [leaveDetails, setLeaveDetails] = useState({
    event_id: store.active_event.id,
    user_id: props.member.id
  });

  const removeMemberConfirm = () => {
    Swal.fire({
      title: `Are you sure you want to remove ` + props.member.first_name + ' ' + props.member.last_name + ' from ' + store.active_event.name + '?',
      text: "To undo this action, a member will need to rejoin the move event through the event 'Share Code'.",
      icon: 'question',
      width: '90%',
      iconColor: '#3f51b5',
      showCancelButton: true,
      confirmButtonColor: '#3f51b5',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, Remove ' + props.member.first_name,
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: 'You have successfully removed ' + props.member.first_name + ' ' + props.member.last_name + ' from ' + store.active_event.name + '.',
          icon: 'success',
          width: '90%',
          iconColor: '#3f51b5',
          confirmButtonColor: '#ffc400'
        })
        removeMember()
      }
    })
  }

  const removeMember = () => {
    console.log('Remove Member', leaveDetails);
    dispatch({ type: 'LEAVE_EVENT', payload: leaveDetails })
  }



  return (
    <div className='component'>
      <Card sx={{ minWidth: 275 }}
        className='moveEventMemberCard'>
        <CardContent>
          <Typography variant="h5" component="div">
            {props.member.first_name} {props.member.last_name}
          </Typography>
          <Typography sx={{ mb: 1.5 }} color="text.secondary">
            {memberID === creatorID ?
              'OWNER' : 'MEMBER'}
          </Typography>
          {userID === creatorID && creatorID != memberID ?
            <Button color="error" variant="contained" className='removeMemberButton' endIcon={<PersonRemoveIcon />} onClick={() => { setTimeout(removeMemberConfirm, 250) }}>REMOVE MEMBER</Button>:
            <>
              {userID === memberID && userID != creatorID ?
                <LeaveMoveEvent className='removeMemberButton' /> :
                <Button color="error" variant="outlined" className='removeMemberButton' endIcon={<PersonRemoveIcon />} disabled>REMOVE MEMBER</Button>
              }
            </>
          }
        </CardContent>
      </Card>
    </div>
  );
}

export default EventMember;
