import { put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';

//FUNCTION TO GET ALL ITEMS FOR user
function* fetchAllItems(user) {
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

  //FUNCTION TO GET ALL ITEMS FOR user
  function* addItem(data) {
  // get all movies from the DB
  console.log('In addItem Saga', data);
  try {  
        const newItem = yield axios({
                              method: 'POST',
                              url: '/api/item',
                              data: data.payload});
        console.log('posting newItem:', newItem);
        yield put({ type: 'SET_ACTIVE_ITEM', payload: data.payload});
        } 
        catch {
        console.log('addItem error');
        }     
  };

function* itemsSaga() {
  yield takeEvery('FETCH_ITEMS', fetchAllItems);
  yield takeEvery('ADD_ITEM', addItem);
}

export default itemsSaga;
