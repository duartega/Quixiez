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
