const activeBoxItemsReducer = (state = {}, action) => {
  switch (action.type) {
    case 'SET_ACTIVE_BOX_ITEMS':
      return action.payload;
    default:
      return state;
  }
};

// user will be on the redux state at:
// state.user
export default activeBoxItemsReducer;
