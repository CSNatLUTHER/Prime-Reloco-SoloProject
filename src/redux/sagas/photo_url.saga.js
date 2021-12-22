import { put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';


//FUNCTION TO GET ALL ITEMS FOR user
function* fetchPhotoUrl() {
  console.log('In fetchPhotoUrl with:');

  try {
        const items = yield axios.get('/api/photo');
        console.log('GET fetchPhotoURL:');
        yield put({ type: 'SET_PHOTO_URL' });
        } 
        catch (err) {
        console.log('fetchPhotoUrl error', err);
        } 

  };



function* photoUrlSaga() {
  yield takeEvery('FETCH_PHOTO_URL', fetchPhotoUrl);
}

export default photoUrlSaga;
