import { put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';

//FUNCTION TO GET ALL ITEMS FOR user
function* fetchAllBoxes(user) {
  // get all movies from the DB
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

function* createBox(data) {
  // get all movies from the DB
  console.log('In addBox Saga', data);
        try {  
        const newBox = yield axios({
                              method: 'POST',
                              url: '/api/box',
                              data: data.payload});
        console.log('posting newBox, returned data:', newBox.data);
        yield put({ type: 'SET_ACTIVE_BOX', payload: newBox.data[0]});
        } 
        catch (err) {
        console.log('addBox error', err);
        }     
  };

function* updateBox(data) {
  // get all movies from the DB
  console.log('In addBox Saga', data);
        try {  
        const newBox = yield axios({
                              method: 'PUT',
                              url: '/api/box',
                              data: data.payload});
        console.log('posting newBox, returned data:', newBox.data);
        yield put({ type: 'SET_ACTIVE_BOX', payload: newBox.data[0]});
        } 
        catch (err) {
        console.log('addBox error', err);
        }     
  };

function* boxesSaga() {
  yield takeEvery('FETCH_BOXES', fetchAllBoxes);
  yield takeEvery('SEARCH_FOR_BOX', searchBoxes);
  yield takeEvery('CREATE_BOX', createBox);
  yield takeEvery('UPDATE_BOX', updateBox);
}

export default boxesSaga;
