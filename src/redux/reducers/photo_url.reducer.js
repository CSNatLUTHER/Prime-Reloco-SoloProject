const photoUrlReducer = (state = {}, action) => {
  switch (action.type) {
    case 'SET_PHOTO_URL':
      return action.payload;
    default:
      return state;
  }
};

// user will be on the redux state at:
// state.user
export default photoUrlReducer;
