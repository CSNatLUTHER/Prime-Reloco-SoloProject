import React, { useState } from 'react';
import {useSelector} from 'react-redux';
import BoxDetails from '../BoxInfo/BoxDetails/BoxDetails';
import PutItemInBox from '../NewBoxConfirmation/PutItemInBox/PutItemInBox';
import { Link } from 'react-router-dom';
import BoxContentsList from '../BoxContents/BoxContentsList/BoxContentsList'
import BoxEditForm from '../BoxEdit/BoxEditForm/BoxEditForm';
import './BoxInfo.css'

// Basic functional component structure for React with default state
// value setup. When making a new component be sure to replace the
// component name TemplateFunction with the name for the new component.
function boxInfo(props) {
  // Using hooks we're creating local state for a "heading" variable with
  // a default value of 'Functional Component'
  const store = useSelector((store) => store);
  const [heading, setHeading] = useState('BOX INFO');
  const [boxEdit, setBoxEdit] = useState(false);

  const editBox = () => {
    setBoxEdit(!boxEdit)
  }

  return (
    <div  className='component'>
      <img className='boxInfoLogo' src="/images/brand.png" alt="" />
      <h2 className ='boxInfoResultsHeader'>{heading}</h2>
      {boxEdit?
      <BoxEditForm editBox={editBox}/>:
      <BoxDetails editBox={editBox} />
      }
      <BoxContentsList />
    </div>
  );
}

export default boxInfo;
