import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";

import rootReducer from "../reducers";
import { devToolsEnhancer } from "redux-devtools-extension";

const devTools = devToolsEnhancer();
const enhancer = compose(
  applyMiddleware(thunk),
  devTools
);

export default createStore(rootReducer, enhancer);
