import { put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';

//FUNCTION TO GET ALL ITEMS FOR user
function* fetchMessages() {
  try {
        const messages = yield axios.get('/api/box/box-items');
        console.log('get allmessages:', messages.data);
        yield put({ type: 'SET_MESSAGES', payload: messages.data });
        } 
        catch (err) {
        console.log('fetchMessages error', err);
        }     
  };

function* submitMessage(info) {
console.log('In submitMessage', info.payload );
  try {  
    const messages = yield axios({
                          method: 'POST',
                          url: '/api/message',
                          data: info.payload});
    console.log('back from submitMessage with:', messages.data);
    yield put({ type: 'SET_MESSAGES', payload: messages.data});
    } 
    catch (err) {
    console.log('submitMessage error', err);
    }    
  };


function* contactUsSaga() {
  yield takeEvery('SUBMIT_MESSAGE', submitMessage);
  
}

export default contactUsSaga;
