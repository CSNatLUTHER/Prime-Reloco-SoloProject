import { put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';

//FUNCTION TO GET ALL ITEMS FOR user
function* fetchAllBoxes(user) {
  // get all movies from the DB
  try {
        const boxes = yield axios.get('/api/box');
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

function* boxesSaga() {
  yield takeEvery('FETCH_BOXES', fetchAllBoxes);
  yield takeEvery('SEARCH_FOR_BOX', searchBoxes);
}

export default boxesSaga;
