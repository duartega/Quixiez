/**
 * actions/conversations
 */

//  import {  Dispatch} from "redux";
//  import {stat} from "redux-thunk"
// import { Thunk } from "redux-thunk";

import { parse, getTime } from "date-fns";
import {
  SET_CONVERSATION_TO_RENDER,
  SET_ALL_CONVERSATIONS,
  SET_CONVERSATION_UNREAD,
  SET_CONVERSATION_READ
} from "../ActionTypes";
import { conditionalExpression } from "@babel/types";
import {
  findIndexOfConversationToUpdate,
  isANewMessage,
  sortConversations
} from "./helpers/conversationsHelpers";

import { unreadType } from "../types/conversationTypes";
import { QueTextI } from "Types/Interfaces/QueText";

export const getTimeValue = (timeReceived: string | Date) => {
  return parse(timeReceived).getTime();
};

export const setConversationToRender = (idx: number) => {
  return {
    type: SET_CONVERSATION_TO_RENDER,
    idx
  };
};

export const setAllConversations = (
  conversations: any[],
  oldConversationsLength: number
) => (dispatch: any, getState: any) => {
  const {
    idxOfConversationToRender,
    allConversations
  } = getState().conversation;

  let sortedConversationsAndNewIdxToRender = sortConversations(
    conversations,
    idxOfConversationToRender,
    oldConversationsLength
  );
  //   console.log("setAllConversations called");
  if (sortedConversationsAndNewIdxToRender) {
    const {
      sortedConversationsArray,
      newIdxOfConversationsToRender
    } = sortedConversationsAndNewIdxToRender;
    // console.log("sortedConversationsArray", sortedConversationsArray);
    // console.log("newIdxOfConversationsToRender", newIdxOfConversationsToRender);
    if (newIdxOfConversationsToRender !== null) {
      //   console.log(
      //     "newIdxOfConversationsToRender",
      //     newIdxOfConversationsToRender
      //   );
      dispatch(setConversationToRender(newIdxOfConversationsToRender));
    }
    // console.log("sortedConversationsArray", sortedConversationsArray);
    dispatch({
      type: SET_ALL_CONVERSATIONS,
      conversations: sortedConversationsArray
    });
  }
};

/**
 * This is not working...
 *
 * We really don't care about a message being read by for right now...
 */
// export const updateConversationsReadBy = (conversation: any) => (
//   dispatch: any,
//   getState: any
// ) => {
//   const {
//     conversation: { allConversations }
//   } = getState();

//   console.log("updateConversationsReadBy FIRING");

//   const idxOfConvoToUpdate = findIndexOfConversationToUpdate(
//     conversation,
//     allConversations
//   );
//   //   This should always execute
//   console.log("idxOfConvoToUpdate", idxOfConvoToUpdate);
//   if (idxOfConvoToUpdate !== -1) {
//     console.log("updateConversationsReadBy");
//     allConversations[idxOfConvoToUpdate] = conversation;
//     dispatch(setAllConversations(allConversations));
//   }

//   //   if (sentBy === null || (sentBy && sentBy.id !== companyUserId)) {
//   // dispatch(setConversationUnread(conversation.id));
//   // callback && callback("NEW_MESSAGE");
//   //   }
// };

/**
 * This is only being called in Admin
 */
export const updateConversations = (
  conversation: QueTextI,
  callback?: (alertType: string) => void
) => (dispatch: any, getState: any) => {
  const {
    conversation: { allConversations, unread },
    companyUserReducer
  } = getState();

  const { companyUser } = companyUserReducer;
  const { id: companyUserId } = companyUser;

  const idxOfConvoToUpdate = findIndexOfConversationToUpdate(
    conversation,
    allConversations
  );

  const oldConversationsLength = allConversations.length;

  // The conversation has been found
  if (idxOfConvoToUpdate !== -1) {
    // updated the appropriate conversation
    allConversations[idxOfConvoToUpdate] = conversation;
    // copy the conversation locally
    let conversationToUpdate = allConversations[idxOfConvoToUpdate];
    // conversationToUpdate = conversation;

    if (isANewMessage(conversationToUpdate, companyUserId)) {
      // Trigger notification
      callback && callback("NEW_MESSAGE");

      // Mark the message as unread
      const { id } = conversationToUpdate;
      dispatch(setConversationUnread(id));
    }
    return dispatch(
      setAllConversations(allConversations, oldConversationsLength)
    );
  }
  /**
   * Else the conversation is actually a new
   * order. We know this because a new
   * conversation came in and the conversation
   * does not exist in Redux.
   */
  callback && callback("NEW_ORDER");

  const { id } = conversation;
  dispatch(setConversationUnread(id));

  allConversations.push(conversation);

  return dispatch(
    setAllConversations(allConversations, oldConversationsLength)
  );
};

export const setConversationUnread = (conversationId: string) => (
  dispatch: any,
  getState: any
) => {
  const { unread } = getState().conversation;
  unread[conversationId] = true;
  return dispatch({
    type: SET_CONVERSATION_UNREAD,
    unreadHash: unread
  });
};

export const setConversationReadUnread = (queTextUnread: any) => {
  //   console.log(queTextUnread);

  const { unreadQueTexts } = queTextUnread;

  const hash: unreadType = {};

  unreadQueTexts.forEach((aQtextObject: any) => {
    const { id }: { id: string } = aQtextObject;
    hash[id] = true;
  });

  return {
    type: SET_CONVERSATION_UNREAD,
    unreadHash: hash
  };
};

export const setConversationRead = (id: string) => (
  dispatch: any,
  getState: any
) => {
  const { unread } = getState().conversation;
  unread[id] = false;

  console.log("set conversation" + id + " read");

  return dispatch({
    type: SET_CONVERSATION_READ,
    unread
  });
};

export const checkForConversations = () => {};
