import React, { useState, useEffect } from 'react';
import {useSelector, useDispatch} from 'react-redux';
import QRCodeScan from '../../SharedComponents/QRCodeScan/QRCodeScan';
import PhotoCapture from '../../SharedComponents/PhotoCapture/PhotoCapture';
import DelayLink from 'react-delay-link';

// Basic functional component structure for React with default state
// value setup. When making a new component be sure to replace the
// component name TemplateFunction with the name for the new component.
function itemEditForm(props) {
  const dispatch = useDispatch();
  // Using hooks we're creating local state for a "heading" variable with
  // a default value of 'Functional Component'
  const store = useSelector((store) => store);
  const [heading, setHeading] = useState('Item Edit Form');
  const [goingInBox, setGoingInBox] = useState(false);
  const [imageToDisplay, setImageToDisplay] = useState('/images/image.png')
  const [capturePhoto, setCapturePhoto] = useState(false);
  const [newItem, setNewItem] = useState({ 
                                  qr: store.active_item.qr_id, 
                                  item_name: store.active_item.name, 
                                  put_in_box: store.active_item.put_in_box, 
                                  value:store.active_item.value, 
                                  destination: store.active_item.destination_id, 
                                  creator_user_id:store.active_item.creator_user_id,
                                  event:store.active_item.event_id,
                                  last_modified_user_id: store.user.id,
                                  image_url:store.active_item.image_path,
                                  id: store.active_item.id
                                });

useEffect( () => {
  const myTimeout = setTimeout(getImage, 500)
}, []);

  const handleNameChange = (event) => {
      setNewItem({ ...newItem, item_name: event.target.value })
  }
  
  const handleValueChange = (event) => {
      setNewItem({ ...newItem, value: event.target.value })
  }

  const handleDestinationChange = (event) => {
      setNewItem({ ...newItem, destination: event.target.value })
  }

  const handleQrChange = (event) => {
    setNewItem({ ...newItem, qr: event })
  }

  const updateQrCode = (event) => {
    setNewItem({ ...newItem, qr: event })
  }
  
  const handleGoingInBoxChange = (event) => {
    if(newItem.put_in_box === false){
      setNewItem({ ...newItem, put_in_box: true, destination: 6 })
    }
    else{
      setNewItem({ ...newItem, put_in_box: false, destination: 0 })
    }
  }
  
  const postImageData = () => {
    if(store.photo.url != '/images/image.png'){
      // console.log('store.photo.url was not default', store.photo.url);
      const url = store.photo.url;
      // setNewItem({ ...newItem, image_url: url.split('?')[0] })
      fetch(url,{
        method: 'PUT',
        headers: {
          'Content-Type' : 'jpeg'
        },
        body: store.photo_capture.data
      })
    }
  }

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

  const validateData = () => {
    if (newItem.put_in_box === false){
      if(newItem.qr != '' && newItem.item_name != '' && newItem.destination != 0){
        updateItem()
      }
      else{
        alert('Must complete all required fields')
      }
    }
    else{
      if(newItem.item_name != '' && newItem.destination != 0){
        updateItem()
      }
      else{
        alert('Must complete all required fields')
      }
    }
  }

  const updateItem =  () => {
    const url = newItem.image_url
    if(store.photo.url != '/images/image.png' )
      {
        url = store.photo.url.split('?')[0] 
      }
    postImageData();
    dispatch({ type: 'UPDATE_ITEM', payload: { 
                                      qr: newItem.qr, 
                                      item_name: newItem.item_name, 
                                      put_in_box: newItem.put_in_box, 
                                      value: newItem.value, 
                                      destination: newItem.destination, 
                                      creator_user_id:store.user.id,
                                      event:store.active_event.id,
                                      last_modified_user_id: store.user.id,
                                      image_url: url,
                                      id: newItem.id
                                      } 
              }),         
    dispatch({ type: 'UNSET_QR_CODE' })
    dispatch({ type: 'UNSET_PHOTO_URL'})
    dispatch({ type: 'UNSET_PHOTO_CAPTURE'})
    
  }

  return (
    <div className='component'>
      <h2>{heading}</h2>
      <p>Item going in box: </p>
      <label className="switch">
        <input type="checkbox" onClick={handleGoingInBoxChange}/>
        <span className="slider round"></span>
      </label>
      <br />
      {newItem.put_in_box?
        <p>QR Code ID:(optional)</p>:
        <p>QR Code ID:(required)</p>
      }
      <input type="text" placeholder='ex. NEL10003IRE' value={newItem.qr} onChange={updateQrCode}  />
      {/* <input type="text" placeholder='enter or use QR scan' value={store.qr_code.id} onChange={handleQrChange} /> */}
      <QRCodeScan qr={handleQrChange}/>
      <p>Item Name:</p><input type="text" placeholder='ex. speaker' value={newItem.item_name} onChange={handleNameChange}  />
      <p>Item Value: $</p><input type="number" placeholder='150' value={newItem.value} onChange={handleValueChange}  />
      {/* Create a conditional statement that renders destination only when "going in box" is 'false' */}
        {!goingInBox?
          <div>
            <p>Destination:</p><select name="destination" value={newItem.destination} onChange={handleDestinationChange} >
                              {/* Consider replacing this with a map of the options for the destinations table */}
                              <option value={0} disabled>CHOOSE DESTINATION</option>
                              <option value={1}>MOVE</option>
                              <option value={2}>STORE</option>
                              <option value={3}>SELL</option>
                              <option value={4}>DONATE</option>
                              <option value={5}>PURGE</option>
                              <option value={6}>GOING IN BOX</option>

                          </select>
          </div>:
          <div></div>
        }
        {/* Need to Handle Adding Image and Setting URL to newItem */}
        <p>Image:</p>
        {newItem.image_url === '/images/image.png'?
          <button onClick={ () => {setCapturePhoto(true)}}>Add Image</button>:
          <>
            {capturePhoto?
              <></>:
              <>
                <img src={imageToDisplay} alt="" />
                <br />
                <button onClick={ () => {setCapturePhoto(true)}}>Edit Image</button>
              </>
            }
          </>
        }
        <br />
        <br />
        {capturePhoto?
          <PhotoCapture/>:
          <></>
        }
        <br />
        <DelayLink delay={750} to="/new_item_confirmation">
        <button onClick={validateData}>Save Item</button>
        </DelayLink>
        <p>Local Item Info: {JSON.stringify(newItem)}</p>
        <p>Store Active_Item Info: {JSON.stringify(store.active_item)}</p>
      </div>
  );
}

export default itemEditForm;
