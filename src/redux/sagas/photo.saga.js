import { put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';


//FUNCTION TO GET ALL ITEMS FOR user
function* fetchPhotoUrl() {
  console.log('In fetchPhotoUrl');

  try {
        const url = yield axios.get('/api/photo');
        
        yield put(
          { type: 'SET_PHOTO_URL', payload: url.data  }
          );
      } 
      catch (err) {
      console.log('fetchPhotoUrl error', err);
      } 

};


function* photoSaga() {
  yield takeEvery('FETCH_PHOTO_URL', fetchPhotoUrl);
}

export default photoSaga;
