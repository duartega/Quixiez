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
    // width: "70%",
    height: "80vh",
    overflow: "auto",
    margin: "0",
    marginTop: "20px"
  },
  cardStyle: {
    marginTop: "0"
  }
});

export default singleMessagePageStyle;
