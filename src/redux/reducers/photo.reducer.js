const photoReducer = (state = {url:'/images/image.png'}, action) => {
  switch (action.type) {
    case 'SET_PHOTO_URL':
      return {...state, url:action.payload.url};
    default:
      return state;
  }
};

// user will be on the redux state at:
// state.user
export default photoReducer;
