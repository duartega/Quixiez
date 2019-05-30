/**
 * reducers/conversations
 */

import {
  SET_CONVERSATION_TO_RENDER,
  SET_ALL_CONVERSATIONS
} from "../ActionTypes";
const conversationsState = {};

export const conversation = (state = conversationsState, action) => {
  switch (action.type) {
    case SET_CONVERSATION_TO_RENDER:
      const { idx } = action;
      return {
        ...state,
        idxOfConversationToRender: idx
      };

    case SET_ALL_CONVERSATIONS:
      const { conversations } = action;
      return {
        ...state,
        allConversations: conversations
      };

    default:
      return {
        ...state
      };
  }
};
