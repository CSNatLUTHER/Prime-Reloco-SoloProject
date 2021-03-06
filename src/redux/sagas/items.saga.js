import { put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';


//FUNCTION TO GET ALL ITEMS FOR EVENT
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

// FUNCTION TO GET ITEM SEARCH RESULTS
function* fetchItemBox(item) {
  console.log('In fetchItemBox', item.payload);
  try {  
    const search = yield axios.get('/api/item/box_item',{params: item.payload})
    console.log('searched box_item, found:', search.data);
    if(search.data.length === 0){
      yield put({ type: 'SET_ITEM_BOX', payload: {}})
    }else {
      yield put({ type: 'SET_ITEM_BOX', payload: search.data[0]})}
  } 
  catch (err) {
  console.log('fetchItemBox error', err);
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
      data: data.payload
    });
    console.log('posting newItem, returned ID:', newItem.data);
    yield put({ type: 'SET_ACTIVE_ITEM', payload: newItem.data[0] });
    data.payload.done();
  }
  catch (err) {
    console.log('addItem error', err);
  }
};

  // CREATES NEW ITEM FOR A MOVE EVENT
function* updateItem(data) {
  // get all movies from the DB
  console.log('In updateItem Saga', data);
  try {
    const newItem = yield axios({
      method: 'PUT',
      url: '/api/item',
      data: data.payload
    });
    console.log('posting newItem, returned ID:', newItem.data);
    yield put({ type: 'SET_ACTIVE_ITEM', payload: newItem.data[0] });
    data.payload.done();
  }
  catch {
    console.log('addItem error');
  }
};

// THIS FUNCTION WILL UPDATE THE DESTAION TO "IN BOX" - SHOULD BE RUN IN PARALLEL OF ADDING ITEM TO BOX 
function* updateItemDestination(data) {
  console.log('In updateItemDestination Saga', data);
  try {  
        const newItem = yield axios({
                              method: 'PUT',
                              url: '/api/item/item_destination',
                              data: data.payload});
        console.log('posting newItem, returned ID:', newItem.data);
        yield put({ type: 'SET_ACTIVE_ITEM', payload: newItem.data[0]});
        } 
        catch {
        console.log('addItem error');
        }     
  };

 // THIS FUNCTION WILL UPDATE THE DESTAION TO "GOING IN BOX" - SHOULD BE RUN IN PARALLEL OF REMOVING ITEM FROM BOX  
  function* resetItemDestination(data) {
    console.log('In resetItemDestination Saga', data);
    try {  
          const newItem = yield axios({
                                method: 'PUT',
                                url: '/api/item/reset_item_destination',
                                data: data.payload});
          console.log('posting newItem, returned ID:', newItem.data);
          yield put({ type: 'SET_ACTIVE_ITEM', payload: newItem.data[0]});
          } 
          catch {
          console.log('addItem error');
          }     
    };

// THIS FUNCTION WILL DELETE AN ITEM FROM THE DATABASE (AND REMOVE IT FROM ASSOCIATED BOXES)    
function* deleteItem(info) {
  console.log('In deleteItem', info.payload);
  try {
    const item = yield axios.delete('/api/item', { params: info.payload })
    yield put({ type: 'UNSET_ACTIVE_ITEM' });
  }
  catch (err) {
    console.log('deleteItem error', err);
  }
};

function* itemsSaga() {
  yield takeEvery('FETCH_ITEMS', fetchAllItems);
  yield takeEvery('ADD_ITEM', addItem);
  yield takeEvery('SEARCH_FOR_ITEM', searchItems);
  yield takeEvery('FETCH_ITEM_BOX', fetchItemBox);
  yield takeEvery('UPDATE_ITEM', updateItem);
  yield takeEvery('UPDATE_ITEM_DESTINATION', updateItemDestination);
  yield takeEvery('RESET_ITEM_DESTINATION', resetItemDestination);
  yield takeEvery('DELETE_ITEM', deleteItem);
  
}

export default itemsSaga;
