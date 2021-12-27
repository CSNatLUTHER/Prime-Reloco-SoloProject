import { put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';

//FUNCTION TO GET ALL ITEMS FOR user
function* fetchBoxItems(box) {
  try {
        const boxes = yield axios.get('/api/box/box-items',{params:box.payload});
        console.log('get all:', boxes.data);
        yield put({ type: 'SET_ACTIVE_BOX_ITEMS', payload: boxes.data });
        } 
        catch {
        console.log('fetchBoxItems error');
        }     
  };

function* putItemInBox(item) {
console.log('In putItemInBox', item.payload );
  try {  
    const putInBox = yield axios({
                          method: 'POST',
                          url: '/api/box/add_to_box',
                          data: item.payload});
    console.log('back from put Item in Box with:', putInBox.data);
    yield put({ type: 'SET_ACTIVE_BOX', payload: putInBox.data});
    } 
    catch {
    console.log('addItem error');
    }    
  };

function* removeFromBox(item) {
  console.log('In removeFromBox', item.payload );
    try {  
      const putInBox = yield axios({
                            method: 'DELETE',
                            url: '/api/box/remove_from_box',
                            data: item.payload});
      console.log('back from put Item in Box with:', putInBox.data);
      yield put({ type: 'UNSET_ACTIVE_ITEM_BOX'});
      } 
      catch {
      console.log('addItem error');
      }    
      };

function* boxItemsSaga() {
  yield takeEvery('FETCH_BOX_ITEMS', fetchBoxItems);
  yield takeEvery('PUT_ITEM_IN_BOX', putItemInBox);
  yield takeEvery('REMOVE_FROM_BOX', removeFromBox);
  
}

export default boxItemsSaga;
