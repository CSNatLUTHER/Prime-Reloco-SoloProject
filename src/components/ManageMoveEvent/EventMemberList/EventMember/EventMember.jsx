import React, { useState } from 'react';
import {useSelector, useDispatch} from 'react-redux';
import './EventMember.css';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import PersonRemoveIcon from '@mui/icons-material/PersonRemove';
import Typography from '@mui/material/Typography';

// Basic functional component structure for React with default state
// value setup. When making a new component be sure to replace the
// component name TemplateFunction with the name for the new component.
function EventMember(props) {
  const dispatch = useDispatch();
  // Using hooks we're creating local state for a "heading" variable with
  // a default value of 'Functional Component'
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
    if(confirm(`Are you sure you want to remove ` + props.member.first_name + ' ' + props.member.last_name + ' from ' + store.active_event.name + '?')){
      removeMember()
    }
  }


  const removeMember = () => {
  console.log('Remove Member', leaveDetails);
  dispatch({type:'LEAVE_EVENT', payload: leaveDetails })
  }

  return (
    <div className='component'>
      {/* <h2>{heading}</h2> */}
      {/* {( userID === creatorID && userID != memberID )?
              <button onClick={removeMember}>Remove Member</button>:
              <></>       
       } */}
      {/* <p>User ID:{JSON.stringify(store.user.id)}</p>
      <p>Creator ID:{JSON.stringify(props.member.creator_user_id)}</p>
      <p>{JSON.stringify(props.member)}</p> */}
      <Card sx={{ minWidth: 275 }}
        className='moveEventMemberCard'>
      <CardContent>
        <Typography variant="h5" component="div">
          {props.member.first_name} {props.member.last_name}
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          {memberID === creatorID?
          'OWNER':'MEMBER'}
        </Typography>
        {( userID === creatorID && userID != memberID )?
              <Button color="error" variant="contained" className='removeMemberButton' endIcon={<PersonRemoveIcon />} onClick={() => {setTimeout(removeMemberConfirm, 250)}}>REMOVE MEMBER</Button>:
              <Button color="error" variant="contained" className='removeMemberButton' endIcon={<PersonRemoveIcon />} disabled>REMOVE MEMBER</Button>    
       }
      </CardContent>
    </Card>
    </div>
  );
}

export default EventMember;
