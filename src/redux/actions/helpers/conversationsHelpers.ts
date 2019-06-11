import { getTimeValue } from "../conversations";

/**
 *
 * @param conversations The list of conversations from redux
 *
 * @returns either the conversation that is to be rendered or if it
 * can't find the conversation will return null
 *
 */
export const getConversationToRender = (conversations: any): any => {
  const { idxOfConversationToRender, allConversations } = conversations;
  if (allConversations && allConversations[idxOfConversationToRender]) {
    // Return the conversation that is being rendered
    return allConversations[idxOfConversationToRender];
  }

  // If cant find the conversation
  return null;
};

export const findIndexOfConversationToUpdate = (
  conversationToFind: any,
  allConversations: any[]
) => {
  return allConversations.findIndex((aConversation: any) => {
    return conversationToFind.id === aConversation.id;
  });
};

export const getLastMessageInAConversation = (conversation: any) => {
  const { messages } = conversation;
  return messages[messages.length - 1];
};

export const isANewMessage = (conversation: any, companyUserId: string) => {
  const lastMessage = getLastMessageInAConversation(conversation);
  const lastMessageSentBy = lastMessage.sentBy;

  if (lastMessageSentBy === null) {
    return true;
  }

  if (lastMessageSentBy.id === companyUserId) {
    return false;
  }

  return true;
};

export const sortConversations = (
  newUpdatedConversations: any[],
  idxOfConversationToRender: number | null,
  oldConversationsLength: number
) => {
  if (!newUpdatedConversations) {
    return;
  }

  let sortedConversations: any[] = [];
  newUpdatedConversations.forEach((aConversation, idx) => {
    const { messages } = aConversation;
    const lastMessageCreatedStamp = messages[messages.length - 1].created;
    sortedConversations.push({
      idx,
      timeValue: getTimeValue(lastMessageCreatedStamp)
    });
  });

  // Sort through the last message time stamp
  sortedConversations = sortedConversations.sort((a, b) => {
    return a.timeValue < b.timeValue ? 1 : -1;
  });

  let sortedConversationsArray: any[] = [];
  sortedConversations.forEach(({ idx }) => {
    sortedConversationsArray.push(newUpdatedConversations[idx]);
  });

  // Grab first conversation
  //   const messages = newUpdatedConversations[0].messages;
  // Grad last message of first conversation
  //   const lastMessageSentBy = messages[messages.length - 1].sentBy;

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
