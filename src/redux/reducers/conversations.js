/**
 * reducers/conversations
 */

import {
  SET_CONVERSATION_TO_RENDER,
  SET_ALL_CONVERSATIONS,
  SET_CONVERSATION_UNREAD
} from "../ActionTypes";

const conversationsState = {
  idxOfConversationToRender: null,
  allConversations: null,
  unread: null,
  updateType: null
};

export const conversation = (state = conversationsState, action) => {
  switch (action.type) {
    case SET_CONVERSATION_TO_RENDER:
      const { idx } = action;
      return {
        ...state,
        idxOfConversationToRender: idx
      };

    case SET_ALL_CONVERSATIONS:
      const { conversations, updateType } = action;

      if (updateType) {
        return {
          ...state,
          allConversations: conversations,
          updateType
        };
      }
      return {
        ...state,
        allConversations: conversations
      };

    case SET_CONVERSATION_UNREAD:
      const { unreadHash } = action;
      return {
        ...state,
        unread: { ...unreadHash }
      };

    default:
      return {
        ...state
      };
  }
};
