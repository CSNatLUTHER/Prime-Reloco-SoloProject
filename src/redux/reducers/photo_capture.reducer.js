const photoCaptureReducer = (state = [], action) => {
  switch (action.type) {
    case 'SET_PHOTO_CAPTURE':
      return action.payload;
    default:
      return state;
  }
};

// user will be on the redux state at:
// state.user
export default photoCaptureReducer;
