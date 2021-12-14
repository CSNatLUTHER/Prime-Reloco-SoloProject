import { put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';

//FUNCTION TO GET ALL ITEMS FOR user
function* fetchBoxItems(user) {
  // get all movies from the DB
  try {
        const boxes = yield axios.get('/api/box/items');
        console.log('get all:', boxes.data);
        yield put({ type: 'SET_BOX_ITEMS', payload: boxes.data });
        } 
        catch {
        console.log('fetchBoxItems error');
        }     
  };

function* boxItemsSaga() {
  yield takeEvery('FETCH_BOX_ITEMS', fetchBoxItems);
}

export default boxItemsSaga;
