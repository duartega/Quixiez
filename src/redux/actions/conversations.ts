/**
 * actions/conversations
 */

import {
  SET_CONVERSATION_TO_RENDER,
  SET_ALL_CONVERSATIONS
} from "../ActionTypes";

export const setConversationToRender = (idx: number) => {
  return {
    type: SET_CONVERSATION_TO_RENDER,
    idx
  };
};

export const setAllConversations = (conversations: any[]) => {
  return {
    type: SET_ALL_CONVERSATIONS,
    conversations
  };
};

export const checkForConversations = () => {};
