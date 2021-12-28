const messagesReducer = (state = {}, action) => {
  switch (action.type) {
    case 'SET_MESSAGES':
      return action.payload;
    default:
      return state;
  }
};



// user will be on the redux state at:
// state.user

export default messagesReducer;
