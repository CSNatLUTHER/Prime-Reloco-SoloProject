import { put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';

//FUNCTION TO GET ALL ITEMS FOR user
function* fetchAllEventUsers() {
  try {
        const eventUser = yield axios.get('/api/event_user');
        console.log('get all:', eventUser.data);
        yield put({ type: 'SET_EVENT_USERS', payload: eventUser.data });
        } 
        catch {
        console.log('fetchAllEventUsers error');
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
}

export default eventUsersSaga;
