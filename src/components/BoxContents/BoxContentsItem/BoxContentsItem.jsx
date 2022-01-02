import React, { useState, useEffect } from 'react';
import {useSelector, useDispatch} from 'react-redux';
import '../BoxContentsItem/BoxContentsItem.css'
import { Link } from 'react-router-dom';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { useHistory } from 'react-router-dom';

// Basic functional component structure for React with default state
// value setup. When making a new component be sure to replace the
// component name TemplateFunction with the name for the new component.
function boxContentsItem(props) {

  const dispatch = useDispatch()
  // Using hooks we're creating local state for a "heading" variable with
  // a default value of 'Functional Component'
  const store = useSelector((store) => store);
  const [heading, setHeading] = useState('Box Contents Item');
  const [imageToDisplay, setImageToDisplay] = useState('/images/image.png')


  useEffect( () => {
    if (props.boxContentsItem.image_path != '/images/image.png'){
      getImage()
    }
  }, []);



  const getImage = () =>{
    fetch(props.boxContentsItem.image_path)
    .then(response => response.body)
    .then(rb => {
      const reader = rb.getReader();

      return new ReadableStream({
        start(controller) {
          // The following function handles each data chunk
          function push() {
            // "done" is a Boolean and value a "Uint8Array"
            reader.read().then( ({done, value}) => {
              // If there is no more data to read
              if (done) {
                // console.log('done', done);
                controller.close();
                return;
              }
              // Get the data and send it to the browser via the controller
              controller.enqueue(value);
              // Check chunks by logging to the console
              // console.log(done, value);
              push();
            })
          }

        push();
      }
    });
    })
    .then(stream => {
    // Respond with our stream
    return new Response(stream, { headers: { "Content-Type": "text/html" } }).text();
    })
    .then(result => {
    // Do things with result
    setImageToDisplay(result)
    // console.log(result);
    });
  }

  const history = useHistory();

  const selectItem = () => {
    dispatch({type:'SET_ACTIVE_ITEM', payload:props.boxContentsItem})
    history.push('/item_info')
  }
  

  return (
    <div className='component'>
      {/* <h2>{heading}</h2>
      {imageToDisplay === '/images/image.png'?
      <img className='iconImage' src={imageToDisplay}/>:
      <img className='itemImage' src={imageToDisplay}/>
      }
      <p>{JSON.stringify(props)}</p>
      <Link to='/item_info'>
      <button onClick={selectItem}>Item Details</button>
      </Link> */}
      <Card sx={{ maxWidth: 500 }}
        className='boxContentsItemCard'
        style={{backgroundColor: "#88899111"}}
      >
        {imageToDisplay === '/images/image.png'?
          <img className='boxContentsIconImage' src={imageToDisplay}/>:
          <CardMedia
          component="img"
          height="180"
          image={imageToDisplay}
          alt="itemImage"
          className='boxContentsItemImage'
          />
        }
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {props.boxContentsItem.name}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            <b>QR CODE:</b> {props.boxContentsItem.qr_id===''? 'None Identified':props.boxContentsItem.qr_id} <br/>
            <b>VALUE:</b> {props.boxContentsItem.value===null? 'None Identified':'$'+ props.boxContentsItem.value} <br/>
            <b>DESTINATION:</b> {props.boxContentsItem.destination}
          </Typography>
        </CardContent>
        <Button color="secondary" variant="contained" className='boxContentsSelectItemButton' endIcon={<ArrowForwardIosIcon />} onClick={() => {setTimeout(selectItem, 250)}}>SELECT ITEM</Button>
      </Card>
    </div>
  );
}

export default boxContentsItem;
