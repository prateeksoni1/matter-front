const initialState = {
  profile: null,
  registerFormValues: null
};

export default (state = initialState, action) => {
  switch (action.type) {
    case "SET_PROFILE":
      return {
        ...state,
        profile: action.payload
      };
    case "SET_REGISTER_FORM":
      return {
        ...state,
        registerFormValues: {
          ...state.registerFormValues,
          ...action.payload
        }
      };
    default:
      return state;
  }
};
