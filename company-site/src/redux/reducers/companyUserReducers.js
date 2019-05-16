/**
 * reducers/companyUser.js
 */

import { SET_JWT_TOKEN } from "../ActionTypes";

const companyUserState = {
  jwt: ""
};

export const companyUserReducer = (state = companyUserState, action) => {
  switch (action.type) {
    case SET_JWT_TOKEN:
      return {
        ...state,
        jwt: action.jwt
      };
    default:
      return {
        ...state
      };
  }
};
