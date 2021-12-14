import { put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';

//FUNCTION TO GET ALL ITEMS FOR user
function* fetchAllEventUsers() {
  // get all movies from the DB
  try {
        const eventuser = yield axios.get('/api/event_user');
        console.log('get all:', eventUser.data);
        yield put({ type: 'SET_EVENT_USERS', payload: eventUser.data });
        } 
        catch {
        console.log('fetchAllEventUsers error');
        }     
  };

function* eventUsersSaga() {
  yield takeEvery('FETCH_EVENT_USERS', fetchAllEventUsers);
}

export default eventUsersSaga;
