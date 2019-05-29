/**
 * reducers/conversations
 */

import { SET_CONVERSATION } from "../ActionTypes";
const conversationsState = {};

export const conversation = (state = conversationsState, action) => {
  switch (action.type) {
    case SET_CONVERSATION:
      return {
        ...state,
        messages: action.messages
      };
    default:
      return {
        ...state
      };
  }
};
