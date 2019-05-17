/**
 * reducers/companyUser.js
 */

import { SET_JWT_TOKEN, SET_COMPANY_USER_ID } from "../ActionTypes";

const companyUserState = {
  jwt: "",
  companyUserID: "",
};

export const companyUserReducer = (state = companyUserState, action) => {
  switch (action.type) {
    case SET_JWT_TOKEN:
      return {
        ...state,
        jwt: action.jwt
      };
    case SET_COMPANY_USER_ID:
    console.log(action.companyUserId)

    return {
        ...state,
      companyUserId: action.companyUserId
      }
    default:
      return {
        ...state
      };
  }
};
