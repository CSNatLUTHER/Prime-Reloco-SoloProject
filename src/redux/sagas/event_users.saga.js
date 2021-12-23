import { put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';

//FUNCTION TO GET ALL ITEMS FOR user
function* fetchAllEventUsers(event) {
  try {
        const eventUser = yield axios.get('/api/event_user', {params: {id: event.payload}});
        console.log('get all:', eventUser.data);
        yield put({ type: 'SET_ACTIVE_EVENT_USERS', payload: eventUser.data });
        } 
        catch {
        console.log('fetchAllEventUsers error');
        }     
  };

function* leaveEvent(event) {
  try {
        const eventUser = yield axios.delete('/api/event_user', {params: event.payload});
        console.log('get all:', eventUser.data);
        yield put({ type: 'FETCH_EVENT_USERS', payload: event.payload.event_id });
        } 
        catch {
        console.log('leaveEvent error');
        }     
  };

function* joinEvent(event) {
  try {
        const eventUser = yield axios({
                                  method: 'POST',
                                  url: '/api/event_user/join',
                                  data: event.payload});
        console.log('get all:', eventUser.data);
        yield put({ type: 'SET_ACTIVE_EVENT', payload: eventUser.data });
        } 
        catch {
        console.log('fetchAllEventUsers error');
        }     
  };

function* eventUsersSaga() {
  yield takeEvery('FETCH_EVENT_USERS', fetchAllEventUsers);
  yield takeEvery('JOIN_EVENT', joinEvent);
  yield takeEvery('LEAVE_EVENT', leaveEvent);
}

export default eventUsersSaga;
