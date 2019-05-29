/**
 * actions/conversations
 */

import { SET_CONVERSATION } from "../ActionTypes";

export const setConversation = (messages: any[]) => {
  return {
    type: SET_CONVERSATION,
    messages
  };
};
