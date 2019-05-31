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
  console.log("setting all conversations...");
  return {
    type: SET_ALL_CONVERSATIONS,
    conversations
  };
};

export const updateConversations = (conversation: any) => (
  dispatch: any,
  getState: any
) => {
  const {
    conversation: { allConversations }
  } = getState();
  console.log("UPDATE CONVERSATION CALLED");

  let conversationsExist = true;
  if (allConversations === null || allConversations.length === 0) {
    console.log("(allConversations === null || allConversations.length === 0)");
    conversationsExist = false;
  }

  const idxOfConvoToUpdate = conversationsExist
    ? allConversations.findIndex((aConversation: any) => {
        return conversation.id === aConversation.id;
      })
    : null;

  if (idxOfConvoToUpdate) {
    allConversations[idxOfConvoToUpdate] = conversation;
    return dispatch(setAllConversations(allConversations));
  }
  return dispatch(setAllConversations([conversation]));
};

export const checkForConversations = () => {};
