import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import BoxDetails from '../BoxInfo/BoxDetails/BoxDetails';
import PutItemInBox from '../NewBoxConfirmation/PutItemInBox/PutItemInBox';
import { Link, useHistory } from 'react-router-dom';
import BoxContentsList from '../BoxContents/BoxContentsList/BoxContentsList'
import BoxEditForm from '../BoxEdit/BoxEditForm/BoxEditForm';
import './BoxInfo.css'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import Button from '@mui/material/Button';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import Swal from 'sweetalert2';

// Basic functional component structure for React with default state
// value setup. When making a new component be sure to replace the
// component name TemplateFunction with the name for the new component.
function boxInfo(props) {
  // Using hooks we're creating local state for a "heading" variable with
  // a default value of 'Functional Component'
  const dispatch = useDispatch()
  const store = useSelector((store) => store);
  const [heading, setHeading] = useState('BOX INFO');
  const [boxEdit, setBoxEdit] = useState(false);
  const [moreOptions, setMoreOptions] = useState(false);

  useEffect(() => {
    window.scroll(0, 0);
  }, []);

  const editBox = () => {
    setBoxEdit(!boxEdit)
    window.scroll(0, 0)
  }

  const deleteBoxConfirmation = () => {
    Swal.fire({
      title: 'Are you sure you want to delete ' + store.active_box.name + '?',
      text: "It will remove the items associated to this box (if applicable) and delete this box. This action cannot be undone!",
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
          title: 'You have successfully deleted ' + store.active_box.name + '.',
          icon: 'success',
          width: '90%',
          iconColor: '#3f51b5',
          confirmButtonColor: '#ffc400'
        })
        deleteBox()
      }
    })
  }

  const history = useHistory()

  const deleteBox = () => {
    console.log('In deleteBox function!');
    dispatch({ type: 'DELETE_BOX', payload: store.active_box })
    setTimeout(() => { history.push('/move_event_home') }, 250)
  }

  return (
    <div className='component'>
      <img className='boxInfoLogo' src="/images/brand.png" alt="" />
      <h2 className='boxInfoResultsHeader'>{heading}</h2>
      {boxEdit ?
        <>
          <BoxEditForm editBox={editBox} />
          {moreOptions ?
            <>
              <br />
              <Button color="secondary" variant="contained" className='removeItemFromBoxButton' startIcon={<ExpandLessIcon />} endIcon={<ExpandLessIcon />} onClick={() => { setMoreOptions(!moreOptions) }}>LESS OPTIONS</Button>
              <br />
              <br />
              <Button color="error" variant="contained" className='removeItemFromBoxButton' endIcon={<RemoveCircleOutlineIcon />} onClick={() => { setTimeout(deleteBoxConfirmation, 250) }}>DELETE ITEM</Button>
            </> :
            <>
              <br />
              <Button color="secondary" variant="contained" className='removeItemFromBoxButton' startIcon={<ExpandMoreIcon />} endIcon={<ExpandMoreIcon />} onClick={() => { setMoreOptions(!moreOptions) }}>MORE OPTIONS</Button>
              <br />
            </>
          }
        </>
        :
        <BoxDetails editBox={editBox} />
      }
      <BoxContentsList />
    </div>
  );
}

export default boxInfo;
