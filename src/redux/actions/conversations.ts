/**
 * actions/conversations
 */

//  import {  Dispatch} from "redux";
//  import {stat} from "redux-thunk"
// import { Thunk } from "redux-thunk";

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
  // console.log("setting all conversations...");
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

  const idxOfConvoToUpdate: number | null = conversationsExist
    ? allConversations.findIndex((aConversation: any) => {
        console.log(
          "conversation.id",
          conversation.id,
          " === ",
          "aConversation.id",
          aConversation.id
        );
        return conversation.id === aConversation.id;
      })
    : null;

  if (idxOfConvoToUpdate !== null) {
    console.log("if (idxOfConvoToUpdate)");
    allConversations[idxOfConvoToUpdate] = conversation;
    return dispatch(setAllConversations(allConversations));
  }
  return dispatch(setAllConversations([conversation]));
};

export const checkForConversations = () => {};
