/**
 * actions/conversations
 */

//  import {  Dispatch} from "redux";
//  import {stat} from "redux-thunk"
// import { Thunk } from "redux-thunk";

import { parse, getTime } from "date-fns";
import {
  SET_CONVERSATION_TO_RENDER,
  SET_ALL_CONVERSATIONS
} from "../ActionTypes";

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

  if (
    oldConversationsLength === undefined ||
    idxOfConversationToRender === null
  ) {
    // console.log("OLD CONVERSATION IS NULL");
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
  oldConversationsLength?: number
) => (dispatch: any, getState: any) => {
  const {
    idxOfConversationToRender,
    allConversations
  } = getState().conversation;
  //   console.log("idxOfConversationToRender", idxOfConversationToRender);
  //   console.log("setting all conversations...", conversations);
  conversations && console.log("conversations.length", conversations.length);
  allConversations &&
    console.log("allConversations.length", allConversations.length);
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

export const updateConversations = (conversation: any) => (
  dispatch: any,
  getState: any
) => {
  const {
    conversation: { allConversations }
  } = getState();
  //   console.log("idxOfConversationToRender", idxOfConversationToRender);
  //   console.log("UPDATE CONVERSATION CALLED");
  //   console.log("conversation", conversation);

  let conversationsExist = true;
  if (allConversations === null || allConversations.length === 0) {
    console.log("(allConversations === null || allConversations.length === 0)");
    conversationsExist = false;
  }

  const idxOfConvoToUpdate: number = conversationsExist
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

  //   console.log("idxOfConvoToUpdate", idxOfConvoToUpdate);
  const oldConversationsLength = allConversations.length;

  if (idxOfConvoToUpdate !== -1) {
    console.log("if (idxOfConvoToUpdate)");
    allConversations[idxOfConvoToUpdate] = conversation;
    return dispatch(
      setAllConversations(allConversations, oldConversationsLength)
    );
  } else if (idxOfConvoToUpdate === -1) {
    allConversations.push(conversation);
    return dispatch(
      setAllConversations(allConversations, oldConversationsLength)
    );
  } else if (conversationsExist === false) {
    return dispatch(
      setAllConversations([conversation], oldConversationsLength)
    );
  }
};

export const checkForConversations = () => {};
