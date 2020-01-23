const initialState = {
  currentProject: null,
  permissions: []
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case "SET_CURRENT_PROJECT":
      return { ...state, currentProject: payload };

    case "SET_PERMISSIONS":
      return { ...state, permissions: payload };

    default:
      return state;
  }
};
