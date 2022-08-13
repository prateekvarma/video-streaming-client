import { combineReducers } from "redux";
import { reducer as formReducer } from "redux-form";
import authReducer from "./authReducer";

const reducers = combineReducers({
  auth: authReducer,
  form: formReducer //this reducer comes from the "redux-form" library
});

export default reducers;