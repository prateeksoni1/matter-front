const initialState = {
  profile: null
};

export default (state = initialState, action) => {
  switch (action.type) {
    case "SET_PROFILE":
      return {
        ...state,
        profile: action.payload
      };
    default:
      return state;
  }
};
