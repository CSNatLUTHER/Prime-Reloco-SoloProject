import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector} from 'react-redux';
import { Link } from 'react-router-dom';
import './ResultsItem.css'

// Basic functional component structure for React with default state
// value setup. When making a new component be sure to replace the
// component name TemplateFunction with the name for the new component.
function resultsItem(props) {
  //set dispatch
  const dispatch = useDispatch()
  useEffect( () => {
    if (props.item.image_path != '/images/image.png'){
      getImage()
    }
  }, []);
  // Using hooks we're creating local state for a "heading" variable with
  // a default value of 'Functional Component'
  const store = useSelector((store) => store);
  const [heading, setHeading] = useState('Results Item');
  const [imageToDisplay, setImageToDisplay] = useState('/images/image.png')

  const selectItem = () => {
    dispatch({type:'SET_ACTIVE_ITEM', payload:props.item})
  }

  const getImage = () =>{
    fetch(props.item.image_path)
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

  return (
    <div className='component'>
      {imageToDisplay === '/images/image.png'?
      <img className='iconImage' src={imageToDisplay}/>:
      <img className='itemImage' src={imageToDisplay}/>
      }
      <h2>{heading}</h2>
      <p>{JSON.stringify(props.item)}</p>
      <Link to="/item_info">
      <button onClick={selectItem}>Select Item</button>
      </Link>
    </div>
  );
}

export default resultsItem;
