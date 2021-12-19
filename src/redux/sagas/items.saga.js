import { put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';


//FUNCTION TO GET ALL ITEMS FOR user
function* fetchAllItems(event) {
  try {
        const items = yield axios.get('/api/item', {params: event.payload});
        console.log('get all:', items.data);
        yield put({ type: 'SET_ITEMS', payload: items.data });
        } 
        catch {
        console.log('fetchAllItems error');
        }     
  };

  // FUNCTION TO GET ITEM SEARCH RESULTS
  function* searchItems(info) {
    console.log('In searchItems', info.payload);
    try {  
      const search = yield axios.get('/api/item/search',{params:info.payload})
      console.log('searched items, found:', search.data);
      yield put({ type: 'SET_ITEMS', payload: search.data});
      } 
      catch {
      console.log('searchItem error');
      }     
    };

  // CREATES NEW ITEM FOR A MOVE EVENT
  function* addItem(data) {
  // get all movies from the DB
  console.log('In addItem Saga', data);
  try {  
        const newItem = yield axios({
                              method: 'POST',
                              url: '/api/item',
                              data: data.payload});
        console.log('posting newItem, returned ID:', newItem.data);
        yield put({ type: 'SET_ACTIVE_ITEM', payload: newItem.data[0]});
        } 
        catch {
        console.log('addItem error');
        }     
  };

function* itemsSaga() {
  yield takeEvery('FETCH_ITEMS', fetchAllItems);
  yield takeEvery('ADD_ITEM', addItem);
  yield takeEvery('SEARCH_FOR_ITEM', searchItems);
}

export default itemsSaga;
