const INITIAL_STATE = {
  profile: null,
}

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case "SET_PROFILE":
      return {
        ...state,
        profile: action.payload,
      }
    default:
      return state
  }
}
