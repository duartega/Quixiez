const testing = true;
const baseRoute = testing
  ? "https://api.stage.quixiez.com"
  : "https://api.quixiez.com";

export const queTextRoute = `${baseRoute}/quetext`;
export const queTextSingle = (
  id: string,
  mark?: "READ" | "UNREAD",
  socket?: "true"
) => `${baseRoute}/quetext/${id}?mark=${mark}&socket=${socket}`;
export const socketTest = `${baseRoute}/`;
export const socketTestTestNameSpace = `${baseRoute}/test`;
export const login = `${baseRoute}/auth/company/login`;
export const selectCompany = `${baseRoute}/auth/company/select`;
export const registration = `${baseRoute}/auth/company/user/register`;
export const getCompanyId = `${baseRoute}/company/predictions/?predict=`;
export const register = `${baseRoute}/auth/company/register/user`;
export const finishRegister = `${baseRoute}/company/user/request`;
export const createCompany = `${baseRoute}/company/`;
export const getCompanyInfo = `${baseRoute}/company/`;
export const putCompanyInfo = `${baseRoute}/company/`;
export const getAddress = `${baseRoute}/address/`;
export const putAddress = `${baseRoute}/address/`;
export const getSocialMediaLinks = `${baseRoute}/company/socialMedia/`;
export const companyHours = `${baseRoute}/company/hours/`;
export const putSocialMediaLinks = `${baseRoute}/company/socialMedia/`;
export const getAllConversations = `${baseRoute}/quetext/`;
export const sendMessage = (queTextId: string) =>
  `${baseRoute}/quetext/${queTextId}`;
export const updatePhase = (quetextID: string) =>
  `${baseRoute}/quetext/${quetextID}`;
