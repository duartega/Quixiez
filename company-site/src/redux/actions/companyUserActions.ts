/**
 * actions/companyUserActions.js
 */

import { SET_JWT_TOKEN, SET_COMPANY_USER_ID } from "../ActionTypes";

export const setCompanyUserJWT = (jwt: string) => {
  return {
    type: SET_JWT_TOKEN,
    jwt
  };
};
export const setCompanyUserID = (companyUserId: string) => {
  return {
    type: SET_COMPANY_USER_ID,
    companyUserId
  };
};

