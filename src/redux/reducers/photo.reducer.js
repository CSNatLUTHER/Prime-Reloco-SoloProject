const photoReducer = (state = {url:'/images/image.png'}, action) => {
  switch (action.type) {
    case 'SET_PHOTO_URL':
      return {...state, url:action.payload.url};
    case 'UNSET_PHOTO_URL':
      return {url:'/images/image.png'}
    default:
      return state;
  }
};

// user will be on the redux state at:
// state.user
export default photoReducer;
