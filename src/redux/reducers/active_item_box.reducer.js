const activeBoxItemsReducer = (state = {}, action) => {
  switch (action.type) {
    case 'SET_ITEM_BOX':
      return action.payload;
    default:
      return state;
  }
};

// user will be on the redux state at:
// state.user
export default activeBoxItemsReducer;
