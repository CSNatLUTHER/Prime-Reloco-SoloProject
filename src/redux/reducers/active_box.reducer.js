const activeBoxReducer = (state = {}, action) => {
  switch (action.type) {
    case 'SET_ACTIVE_BOX':
      return action.payload;
    case 'UNSET_ACTIVE_BOX':
      return {};
    default:
      return state;
  }
};

// user will be on the redux state at:
// state.user
export default activeBoxReducer;
