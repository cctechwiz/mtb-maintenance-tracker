const initialState = {
  userId: null,
  builds: null
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'USER_AUTH':
      return {
        ...state,
        userId: action.payload,
      };
    
    case 'LOGOUT':
      return {
        ...state,
        userId: null
      }
    
    case 'UPDATE_BUILDS':
      return {
        ...state,
        builds: action.payload
      }

    default:
      return state;
  };
};

export default reducer;