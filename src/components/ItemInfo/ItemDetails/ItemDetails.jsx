import React, { useEffect, useState } from 'react';
import {useDispatch, useSelector} from 'react-redux';
import './ItemDetails.css'

// Basic functional component structure for React with default state
// value setup. When making a new component be sure to replace the
// component name TemplateFunction with the name for the new component.
function itemDetails(props) {
  // Using hooks we're creating local state for a "heading" variable with
  // a default value of 'Functional Component'
  const store = useSelector((store) => store);
  const item = useSelector((store) => store.active_item);
  const [heading, setHeading] = useState('Item Details');
  const [imageToDisplay, setImageToDisplay] = useState('/images/image.png')
  const [showImage, setShowImage] = useState(false)

  useEffect( () => {
    // const myTimeout = setTimeout(getImage, 500)
    // getImage()
}, []);

  // const checkImagePath = () => {
  //   if (store.active_item.image_path != '/images/image.png'){
  //     getImage()
  //   }
  // }

  const getImage = () =>{
    const url = store.active_item.image_path
    console.log("----------->Image Path Being Used:", url );
    if (store.active_item.image_path != '/images/image.png'){
      fetch(url)
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
  }

  const previewImage = () => {
    getImage()
    setShowImage(true)
  }

  return (
    <div className='component'>
      {showImage === false?
        <button onClick={previewImage}>Preview Image</button>:
        <>
          {imageToDisplay === '/images/image.png'?
            <img className='iconImage' src={imageToDisplay} alt={JSON.stringify(imageToDisplay)}/>:
            <img className='itemImage' src={imageToDisplay} alt={JSON.stringify(imageToDisplay)}/>
          }
        </>
      }
      <h2>{heading}</h2>
      <h4>{JSON.stringify(item)}</h4>
    </div>
  );
}

export default itemDetails;
