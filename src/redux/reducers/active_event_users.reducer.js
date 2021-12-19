const activeEventUsersReducer = (state = {}, action) => {
  switch (action.type) {
    case 'SET_ACTIVE_EVENT_USERS':
      return action.payload;
    default:
      return state;
  }
};

// user will be on the redux state at:
// state.user
export default activeEventUsersReducer;
