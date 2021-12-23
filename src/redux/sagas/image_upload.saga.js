import { put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';


//FUNCTION TO GET ALL ITEMS FOR user
function* imageUpload() {
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



function* imageUploadSaga() {
  yield takeEvery('UPLOAD_PHOTO', imageUpload);
}

export default imageUploadSaga;
