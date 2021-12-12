import { put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';

//FUNCTION TO GET ALL ITEMS FOR ACCOUNT
function* fetchAllEventAccounts() {
  // get all movies from the DB
  try {
        const eventAccount = yield axios.get('/api/event_account');
        console.log('get all:', eventAccount.data);
        yield put({ type: 'SET_EVENT_ACCOUNTS', payload: eventAccount.data });
        } 
        catch {
        console.log('fetchAllEventAccounts error');
        }     
  };

function* eventAccountsSaga() {
  yield takeEvery('FETCH_EVENT_ACCOUNTS', fetchAllEventAccounts);
}

export default eventAccountsSaga;
