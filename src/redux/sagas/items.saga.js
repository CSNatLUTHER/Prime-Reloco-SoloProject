import { put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';

//FUNCTION TO GET ALL ITEMS FOR ACCOUNT
function* fetchAllItems(account) {
  // get all movies from the DB
  try {
        const items = yield axios.get('/api/item');
        console.log('get all:', items.data);
        yield put({ type: 'SET_ITEMS', payload: items.data });
        } 
        catch {
        console.log('fetchAllItems error');
        }     
  };

function* itemsSaga() {
  yield takeEvery('FETCH_ITEMS', fetchAllItems);
}

export default itemsSaga;
