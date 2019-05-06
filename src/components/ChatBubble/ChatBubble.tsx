import React from "react";
import { WithStyles, withStyles } from "@material-ui/core/styles";
import ChatBubbleStyles from "./ChatBubbleStyles";
interface ChatBubble extends WithStyles<typeof ChatBubbleStyles> {
  message: string;
  isSender?: boolean;
  //   classes: typeof ChatBubbleStyles;
}

const ChatBubble: React.FC<ChatBubble> = ({
  message,
  isSender,
  classes
}: ChatBubble) => {
  return (
    <div
      style={{ backgroundColor: "pink" }}
      className={isSender ? classes.fromContainer : classes.toContainer}
    >
      <p className={isSender ? classes.fromChatBubble : classes.toChatBubble}>
        {message}
      </p>
    </div>
  );
};

export default withStyles(ChatBubbleStyles)(ChatBubble);
