const activeBoxItemsReducer = (state = {}, action) => {
  switch (action.type) {
    case 'SET_ITEM_BOX':
      return action.payload;
    case 'UNSET_ACTIVE_ITEM_BOX':
      return {}
    default:
      return state;
  }
};

// user will be on the redux state at:
// state.user
export default activeBoxItemsReducer;
