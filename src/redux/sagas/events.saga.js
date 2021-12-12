import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

//FUNCTION TO GET ALL ITEMS FOR ACCOUNT
function* fetchAllEvents(account) {
  // get all movies from the DB
  try {
        const events = yield axios.get('/api/event');
        console.log('get all:', events.data);
        yield put({ type: 'SET_EVENTS', payload: events.data });
        } 
        catch {
        console.log('fetchAllEvents error');
        }     
  };

function* eventsSaga() {
  yield takeEvery('FETCH_EVENTS', fetchAllEvents);
}

export default eventsSaga;
