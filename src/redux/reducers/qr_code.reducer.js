const qrCodeReducer = (state = {id: ''}, action) => {
  switch (action.type) {
    case 'SET_QR_CODE':
      return action.payload;
    case 'UNSET_QR_CODE':
      return ({...state, id: ''})
    default:
      return state;
  }
};

// user will be on the redux state at:
// state.user
export default qrCodeReducer;
