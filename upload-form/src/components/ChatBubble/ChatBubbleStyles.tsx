import { createStyles } from "@material-ui/core/styles";
/** https://leaverou.github.io/bubbly/ */
const defaultArrowStyle = createStyles({
  fromArrow: {
    marginTop: "-7px",
    marginRight: "-14px",
    right: "0",
    borderLeftColor: "#00aabb",
    borderRight: "0"
  },
  toArrow: {
    marginTop: "-7px",
    marginLeft: "-14px",
    left: "0",
    borderRightColor: "#00aabb",
    borderLeft: "0"
  }
});

const defaultStyle = createStyles({
  defaultBubble: {
    position: "relative",
    backgroundColor: "#00aabb",
    borderRadius: ".4em",
    display: "inline-block",
    minHeight: "20px",
    padding: "10px",
    margin: "14px",
    maxWidth: "50%"
  },

  defaultAfter: {
    content: "''",
    position: "absolute",
    top: "50%",
    width: "0",
    height: "0",
    border: "14px solid transparent",
    borderTop: "0"
  }
});

const defaultContainer = createStyles({
  container: {
    display: "inline-block",
    padding: "20px"
  }
});

const ChatBubbleStyles = createStyles({
  fromChatBubble: {
    ...defaultStyle.defaultBubble,
    float: "right",
    "&:after": {
      ...defaultStyle.defaultAfter,

      ...defaultArrowStyle.fromArrow
    }
  },

  toChatBubble: {
    ...defaultStyle.defaultBubble,
    float: "left",
    "&:after": {
      ...defaultStyle.defaultAfter,
      ...defaultArrowStyle.toArrow
    }
  },
  toContainer: {
    ...defaultContainer.container,
    float: "right"
  },
  fromContainer: {
    ...defaultContainer.container,
    float: "left"
  }
});

export default ChatBubbleStyles;