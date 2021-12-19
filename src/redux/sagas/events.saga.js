import { put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';

//FUNCTION TO GET ALL ITEMS FOR user
function* fetchAllEvents(user) {
  // get all movies from the DB
  try {
        const events = yield axios.get('/api/event', {params: user.payload });
        console.log('get all event for user:', events.data);
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
