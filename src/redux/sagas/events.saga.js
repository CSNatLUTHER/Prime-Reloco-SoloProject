import { put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';

//FUNCTION TO GET ALL EVENTS FOR user
function* fetchAllEvents(user) {
  try {
        const events = yield axios.get('/api/event', {params: user.payload });
        console.log('get all event for user:', events.data);
        yield put({ type: 'SET_EVENTS', payload: events.data });
        } 
        catch {
        console.log('fetchAllEvents error');
        }     
  };


// CREATES NEW MOVE EVENT
function* createEvent(data) {
  console.log('In createEvent Saga', data);
  try {  
        const newEvent = yield axios({
                              method: 'POST',
                              url: '/api/event',
                              data: data.payload});
        console.log('posting newItem, returned ID:', newEvent.data);
        yield put({ type: 'SET_ACTIVE_EVENT', payload: newEvent.data[0]});
        data.payload.done();
        } 
        catch {
        console.log('addItem error');
        }     
  };

//FUNCTION TO DELETE EVENT
function* deleteEvent(event) {
  try {
        const events = yield axios.delete('/api/event', {params: event.payload });
        console.log('Deleting Event', events.data);
        yield put({ type: 'FETCH_EVENTS', payload: {userid:event.payload.user_id} });
        } 
        catch {
        console.log('fetchAllEvents error');
        }     
  };

function* eventsSaga() {
  yield takeEvery('FETCH_EVENTS', fetchAllEvents);
  yield takeEvery('CREATE_EVENT', createEvent);
  yield takeEvery('DELETE_EVENT', deleteEvent);

}

export default eventsSaga;
