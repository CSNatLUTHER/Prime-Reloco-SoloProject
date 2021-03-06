import { combineReducers } from 'redux';
import errors from './errors.reducer';
import user from './users.reducer';
import boxes from './boxes.reducer';
import active_box from './active_box.reducer';
import items from './items.reducer';
import active_item from './active_item.reducer';
import events from './events.reducer';
import active_event from './active_event.reducer';
import qr_code from './qr_code.reducer';
import search_results from './search_results.reducer';
import active_box_items from './active_box_items.reducer';
import active_event_users from './active_event_users.reducer';
import photo_capture from './photo_capture.reducer';
import photo from './photo.reducer';
import active_item_box from './active_item_box.reducer';
import messages from './messages.reducer';


// rootReducer is the primary reducer for our entire project
// It bundles up all of the other reducers so our project can use them.
// This is imported in index.js as rootSaga

// Lets make a bigger object for our store, with the objects from our reducers.
// This is what we get when we use 'state' inside of 'mapStateToProps'
const rootReducer = combineReducers({
  errors, // contains registrationMessage and loginMessage
  user, // will have an id and username if someone is logged in
  boxes, // will have all boxes for an user in active event
  active_box, // will have details of active box being worked on
  items, // will have all items for an user in active event
  active_item, // will have details of active item being worked on
  events, // will have all events associated with a user
  active_event, // will have all details associated with active event
  qr_code, // will have details of active QR code just captured
  active_box_items, // will have details of all items in active_box reducer
  search_results, // will have all details of item or boxed search for
  active_event_users, // will have list of all user details associated with an event
  photo_capture, // will have data of the last captured image
  photo, // will hold the url of the AWS S3 image
  active_item_box, // will hold box data of active item when needed
  messages // will hold all messages from contact us page

});

export default rootReducer;
