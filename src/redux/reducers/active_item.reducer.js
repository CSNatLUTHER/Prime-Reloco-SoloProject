const activeItemReducer = (state = {}, action) => {
  switch (action.type) {
    case 'SET_ACTIVE_ITEM':
      return action.payload;
    default:
      return state;
  }
};



// user will be on the redux state at:
// state.user

export default activeItemReducer;
