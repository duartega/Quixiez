const testing = false;
const baseRoute = testing
  ? "https://api.stage.quixiez.com"
  : "https://api.quixiez.com";

export const queTextRoute = `${baseRoute}/quetext`;
export const socketTest = `${baseRoute}/test`;
export const login = `${baseRoute}/auth/company/login`;
export const selectCompany = `${baseRoute}/auth/company/select`;
export const registration = `${baseRoute}/auth/company/user/register`;
export const getCompanyId = `${baseRoute}/company/predictions/?predict=`;
export const register = `${baseRoute}/auth/company/register/user`;
export const finishRegister = `${baseRoute}/company/user/request`;
export const createCompany = `${baseRoute}/company/`;
