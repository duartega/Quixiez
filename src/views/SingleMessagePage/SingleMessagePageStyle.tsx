import { createStyles } from "@material-ui/core/styles";

const singleMessagePageStyle = createStyles({
  test: {
    backgroundColor: "pink"
  },
  messageTableHeader: {
    width: "50%",
    // alignItems: "flex-end",
    // alignContent: "flex-end",
    textAlign: "center"
  },
  messageTableCell: {
    width: "50%"
    // textAlign: "left"
  },
  messageTableTimeCell: {
    width: "50%",
    textAlign: "center"
  },
  containerStyle: {
    width: "70%"
  }
});

export default singleMessagePageStyle;
