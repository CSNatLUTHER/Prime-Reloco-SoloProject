import { put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';

//FUNCTION TO GET ALL ITEMS FOR USER
function* fetchAllBoxes(user) {
  console.log('In get all boxes', user.payload);
  try {
    const boxes = yield axios.get('/api/box', {params: user.payload } );
    console.log('get all:', boxes.data);
    yield put({ type: 'SET_BOXES', payload: boxes.data });
    } 
    catch {
    console.log('fetchAllBoxes error');
    }     
  };

// FUNCTION TO SEARCH EXISTING BOXES
function* searchBoxes(info) {
  console.log('In searchBoxes', info.payload);
  try {  
    const search = yield axios.get('/api/box/search',{params:info.payload})
    console.log('searched boxes, found:', search.data);
    yield put({ type: 'SET_BOXES', payload: search.data});
    } 
    catch {
    console.log('searchBoxes error');
    }     
  };


// FUNCTION TO CREATE A NEW BOX
function* createBox(data) {
  console.log('In addBox Saga', data);
        try {  
        const newBox = yield axios({
                              method: 'POST',
                              url: '/api/box',
                              data: data.payload});
        console.log('posting newBox, returned data:', newBox.data);
        yield put({ type: 'SET_ACTIVE_BOX', payload: newBox.data[0]});
        data.payload.done();
        } 
        catch (err) {
        console.log('addBox error', err);
        }     
  };

// FUNCTION TO UPDATE AN EXISTING BOX  
function* updateBox(data) {
  console.log('In addBox Saga', data);
  try {
    const newBox = yield axios({
      method: 'PUT',
      url: '/api/box',
      data: data.payload
    });
    console.log('posting newBox, returned data:', newBox.data);
    yield put({ type: 'SET_ACTIVE_BOX', payload: newBox.data[0] });
    data.payload.done();
  }
  catch (err) {
    console.log('addBox error', err);
  }
};

//CONSOLIDATES ALL SAGA FUNCTIONS FOR ROOT SAGA
function* boxesSaga() {
  yield takeEvery('FETCH_BOXES', fetchAllBoxes);
  yield takeEvery('SEARCH_FOR_BOX', searchBoxes);
  yield takeEvery('CREATE_BOX', createBox);
  yield takeEvery('UPDATE_BOX', updateBox);
}

// EXPORTS TO BE IMPORTED INTO ROOT SAGA
export default boxesSaga;
