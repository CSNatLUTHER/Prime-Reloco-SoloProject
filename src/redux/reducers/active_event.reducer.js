const activeEventReducer = (state = {}, action) => {
  switch (action.type) {
    case 'SET_ACTIVE_EVENT':
      return action.payload;
    default:
      return state;
  }
};

// user will be on the redux state at:
// state.user
export default activeEventReducer;
