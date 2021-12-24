const photoCaptureReducer = (state = {data:'/images/image.png'}, action) => {
  switch (action.type) {
    case 'SET_PHOTO_CAPTURE':
      return action.payload;
    case 'UNSET_PHOTO_CAPTURE':
      return {data:'/images/image.png'}
    default:
      return state;
  }
};

// user will be on the redux state at:
// state.user
export default photoCaptureReducer;
