/**
 * reducers/companyUser.js
 */

import {
  SET_JWT_TOKEN,
  SET_COMPANY_USER_ID,
  SET_COMPANY_NAME,
  SET_COMPANY_USER
} from "../ActionTypes";

const companyUserState = {
  companyUser: JSON.parse(localStorage.getItem("companyUser"))
};

export const companyUserReducer = (state = companyUserState, action) => {
  switch (action.type) {
    case SET_COMPANY_USER:
      return {
        ...state,
        companyUser: action.companyUser
      };

    default:
      return {
        ...state
      };
  }
};
