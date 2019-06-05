/**
 * actions/companyUserActions.js
 */

import {
  SET_JWT_TOKEN,
  SET_COMPANY_USER_ID,
  SET_COMPANY_NAME,
  SET_COMPANY_USER
} from "../ActionTypes";

export const setCompanyUserJWT = (jwt: string) => {
  return {
    type: SET_JWT_TOKEN,
    jwt
  };
};

export const setCompanyName = (companyName: string) => {
  return {
    type: SET_COMPANY_NAME,
    companyName
  };
};

export const setCompanyUserID = (companyUserId: string) => {
  return {
    type: SET_COMPANY_USER_ID,
    companyUserId
  };
};

export const setCompanyUser = () => {
  let companyUser = localStorage.getItem("companyUser");
  if (companyUser) {
    companyUser = JSON.parse(companyUser);
    return {
      type: SET_COMPANY_USER,
      companyUser
    };
  }
  // Will hit default statement and do nothing...
  return {
    type: "IGNORE"
  };
};
