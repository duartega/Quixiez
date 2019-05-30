/**
 * reducers/conversations
 */

import { SET_CONVERSATION } from "../ActionTypes";
const conversationsState = {};

export const conversation = (state = conversationsState, action) => {
  switch (action.type) {
    case SET_CONVERSATION:
      const { conversation } = action;
      return {
        ...state,
        ...conversation
      };
    default:
      return {
        ...state
      };
  }
};
