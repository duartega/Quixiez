import { combineReducers } from "redux";
import { companyUserReducer } from "./companyUserReducers";
import { conversation } from "./conversations";

export default combineReducers({
  companyUserReducer,
  conversation
});
