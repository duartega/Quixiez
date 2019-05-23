/**
 * reducers/companyUser.js
 */

import { SET_JWT_TOKEN, SET_COMPANY_USER_ID, SET_COMPANY_NAME } from "../ActionTypes";

const companyUserState = {
  jwt: "",
  companyUserID: ""
};

export const companyUserReducer = (state = companyUserState, action) => {
  switch (action.type) {
    case SET_JWT_TOKEN:
      return {
        ...state,
        jwt: action.jwt
      };
    case SET_COMPANY_USER_ID:
      return {
        ...state,
        companyUserId: action.companyUserId
      };
      case SET_COMPANY_NAME:
      return {
        ...state,
        companyName: action.companyName
      };
    default:
      return {
        ...state
      };

  }
};
