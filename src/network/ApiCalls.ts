import Axios, { AxiosResponse } from "axios";
/**
 * Content Types
 * Used for api calls
 */
type contentType = "application/json" | "multipart/form-data";

/**
 * @function setHeaders Used to set the headers in the api calls
 */
const setHeaders = (contentType: contentType) => {
  const jwtToken = localStorage.getItem("jwt");
  return jwtToken
    ? {
        Authorization: `Bearer ${jwtToken}`,
        "Content-Type": contentType
      }
    : {
        "Content-Type": contentType
      };
};

/** Post Requests */

export function axiosPost(endpoint: string, data?: any): Promise<AxiosResponse>;

export function axiosPost(
  endpoint: string,
  data?: any
): // jwtToken?: string
Promise<AxiosResponse>;
/**
 * @param endpoint api endpoint
 * @param data data to be posted
 * @param jwtToken jwt token for authorization
 * @param contentType already set by default to "application/json"
 */
export function axiosPost(
  endpoint: string,
  data?: any,
  // jwtToken?: string,
  contentType: contentType = "application/json"
): Promise<AxiosResponse> {
  return new Promise((resolve, reject) => {
    Axios.post(endpoint, data, {
      headers: setHeaders(contentType)
    })
      .then(result => {
        resolve(result);
      })
      .catch(err => {
        reject(err);
      });
  });
}

/** Put Request */

export function axiosPut(
  endpoint: string,
  data?: any,
  // jwtToken?: string,
  contentType: contentType = "application/json"
) {
  return new Promise((resolve, reject) => {
    Axios.put(endpoint, data, {
      headers: setHeaders(contentType)
    })
      .then(result => {
        resolve(result);
      })
      .catch(err => {
        reject(err);
      });
  });
}

/** Get Requests */
export function axiosGet(
  endpoint: string
): // jwtToken?: string
Promise<AxiosResponse>;

export function axiosGet(
  endpoint: string,
  // jwtToken?: string,
  contentType: contentType = "application/json"
): Promise<AxiosResponse> {
  return new Promise((resolve, reject) => {
    Axios.get(endpoint, {
      headers: setHeaders(contentType)
    })
      .then(result => {
        resolve(result);
      })
      .catch(err => {
        reject(err);
      });
  });
}
