/**
 * actions/companyUserActions.js
 */

import { SET_JWT_TOKEN } from "../ActionTypes";

export const setCompanyUserJWT = (jwt: string) => {
  return {
    type: SET_JWT_TOKEN,
    jwt
  };
};
