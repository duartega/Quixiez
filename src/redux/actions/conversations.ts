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
import { findIndexOfConversationToUpdate } from "./helpers/conversationsHelpers";

export const getTimeValue = (timeReceived: string) => {
  return parse(timeReceived).getTime();
};

const sortConversations = (
  newUpdatedConversations: any[],
  idxOfConversationToRender: number | null,
  oldConversationsLength?: number
) => {
  if (!newUpdatedConversations) {
    return;
  }

  let sortedConversations: any[] = [];
  newUpdatedConversations.forEach((aConversation, idx) => {
    // console.log(aConversation.messages);
    const { messages } = aConversation;
    const lastMessageCreatedStamp = messages[messages.length - 1].created;
    sortedConversations.push({
      idx,
      timeValue: getTimeValue(lastMessageCreatedStamp)
    });
  });

  sortedConversations = sortedConversations.sort((a, b) => {
    return a.timeValue < b.timeValue ? 1 : -1;
  });

  let sortedConversationsArray: any[] = [];
  sortedConversations.forEach(({ idx }) => {
    sortedConversationsArray.push(newUpdatedConversations[idx]);
  });

  // Grab first conversation
  const messages = newUpdatedConversations[0].messages;
  // Grad last message of first conversation
  const lastMessageSentBy = messages[messages.length - 1].sentBy;

  //   lastMessageSentBy !== null && console.log(lastMessageSentBy.id);

  /**
   * If the message was not sent by the user AND
   * the message was not sent by the bot we are making
   * the assumption for now that the current user sent it.
   *
   * TODO: Check to see if the current user sent the message
   * and update the new idx to 0 only if the current user sent
   * the message.
   */
  if (
    lastMessageSentBy &&
    lastMessageSentBy !== null &&
    lastMessageSentBy.id !== "00000000-0000-0000-0000-000000000000"
  ) {
    return {
      sortedConversationsArray,
      newIdxOfConversationsToRender: 0
    };
  }
  if (
    oldConversationsLength === undefined ||
    idxOfConversationToRender === null
  ) {
    return {
      sortedConversationsArray,
      newIdxOfConversationsToRender: null
    };
  }
  const newConversationsLen = newUpdatedConversations.length;

  const newIdxOfConversationsToRender =
    newConversationsLen - oldConversationsLength + idxOfConversationToRender;

  return {
    sortedConversationsArray,
    newIdxOfConversationsToRender
  };
};

export const setConversationToRender = (idx: number) => {
  return {
    type: SET_CONVERSATION_TO_RENDER,
    idx
  };
};

export const setAllConversations = (
  conversations: any[],
  oldConversationsLength?: number,
  updateType?: "message_marked_read"
) => (dispatch: any, getState: any) => {
  const {
    idxOfConversationToRender,
    allConversations
  } = getState().conversation;

  if (updateType) {
    return dispatch({
      type: SET_ALL_CONVERSATIONS,
      conversations,
      updateType
    });
  }

  let sortedConversationsAndNewIdxToRender = sortConversations(
    conversations,
    idxOfConversationToRender,
    oldConversationsLength
  );
  if (sortedConversationsAndNewIdxToRender) {
    const {
      sortedConversationsArray,
      newIdxOfConversationsToRender
    } = sortedConversationsAndNewIdxToRender;
    if (newIdxOfConversationsToRender !== null) {
      console.log(
        "newIdxOfConversationsToRender",
        newIdxOfConversationsToRender
      );
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
  conversation: any,
  callback?: (alertType: string) => void
) => (dispatch: any, getState: any) => {
  const {
    conversation: { allConversations },
    companyUserReducer: { id: companyUserId }
  } = getState();

  const idxOfConvoToUpdate = findIndexOfConversationToUpdate(
    conversation,
    allConversations
  );

  const oldConversationsLength = allConversations.length;

  if (idxOfConvoToUpdate !== -1) {
    // updating appropriate conversation
    allConversations[idxOfConvoToUpdate] = conversation;

    return dispatch(
      setAllConversations(
        allConversations,
        oldConversationsLength
        //   updateType
      )
    );
  } else {
    callback && callback("NEW_ORDER");
    allConversations.push(conversation);
    return dispatch(
      setAllConversations(allConversations, oldConversationsLength)
    );
  }
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

  const hash: { [key: string]: boolean } = {};

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
  return dispatch({
    type: SET_CONVERSATION_READ,
    unread
  });
};

export const checkForConversations = () => {};
