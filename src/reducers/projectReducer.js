const initialState = {
  currentProject: null
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case "SET_CURRENT_PROJECT":
      return { ...state, currentProject: payload };

    default:
      return state;
  }
};
