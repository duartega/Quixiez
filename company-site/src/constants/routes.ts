const testing = false;
const baseRoute = testing
  ? "https://api.stage.quixiez.com"
  : "https://api.quixiez.com";

export const queTextRoute = `${baseRoute}/quetext`;
export const socketTest = `${baseRoute}/test`;
export const login = `${baseRoute}/auth/company/login`;