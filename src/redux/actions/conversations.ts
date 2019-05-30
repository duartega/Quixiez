/**
 * actions/conversations
 */

import { SET_CONVERSATION } from "../ActionTypes";

export const setConversation = (conversation: any[]) => {
  return {
    type: SET_CONVERSATION,
    conversation
  };
};
