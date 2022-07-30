const INITIAL_STATE = {
  IsSignedIn: null,
};

const authReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case "SIGN_IN":
      return { ...state, IsSignedIn: true };
    case "SIGN_OUT":
      return { ...state, IsSignedIn: false };
    default:
      return state;
  }
};

export default authReducer;
