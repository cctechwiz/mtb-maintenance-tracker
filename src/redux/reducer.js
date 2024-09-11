const initialState = {};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'USER_AUTH':
      return {
        ...state,
        userId: action.payload,
      };

    default:
      return state;
  };
};

export default reducer;