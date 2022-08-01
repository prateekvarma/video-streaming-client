import { SIGN_IN, SIGN_OUT } from "../actions/types";

const INITIAL_STATE = {
  isSignedIn: null,
  userId: null, //just a good practise to initialize. This is received from the "onAuthChange" function
};

const authReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SIGN_IN:
      return { ...state, isSignedIn: true, userId: action.payload };
    case SIGN_OUT:
      return { ...state, isSignedIn: false, userId: null };
    default:
      return state;
  }
};

export default authReducer;
