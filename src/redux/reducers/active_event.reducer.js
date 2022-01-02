const activeEventReducer = (state = {}, action) => {
  switch (action.type) {
    case 'SET_ACTIVE_EVENT':
      return action.payload;
    case 'UNSET_ACTIVE_EVENT':
      return {};
    default:
      return state;
  }
};

// user will be on the redux state at:
// state.user
export default activeEventReducer;
