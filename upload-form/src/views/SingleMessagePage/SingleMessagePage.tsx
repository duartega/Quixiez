import React from "react";
import Container from "components/Containers/Container";
import Grid from "@material-ui/core/Grid";
import SingleMessagePageStyle from "./SingleMessagePageStyle";
import { WithStyles, withStyles } from "@material-ui/core/styles";
import Switch from "@material-ui/core/Switch";
import Card from "components/Theme/Card/Card";
import Table from "components/Theme/Table/Table";
import ChatBubble from "components/ChatBubble/ChatBubble";
import CustomInput from "components/Theme/CustomInput/CustomInput";
import Button from "components/Theme/CustomButtons/Button";
import classNames from "classnames";

interface Props extends WithStyles<typeof SingleMessagePageStyle> {}

const longMessage =
  "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text. All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary, making this the first true generator on the Internet. It uses a dictionary of over 200 Latin words, combined with a handful of model sentence structures, to generate Lorem Ipsum which looks reasonable. The generated Lorem Ipsum is therefore always free from repetition, injected humour, or non-characteristic words etc.";

class SingleMessagePage extends React.Component<Props, any> {
  componentDidMount() {
    let bubbleContainer = document.getElementById("chat-container");
    if (bubbleContainer) {
      bubbleContainer.scrollTop = bubbleContainer.scrollHeight;
    }
  }
  render() {
    const { classes } = this.props;
    return (
      <div>
        <Grid container direction="row" alignItems="center" justify="center">
          <Container>
            <Card>
              <Grid container justify="space-around">
                <Grid item className={classes.test}>
                  <h5>Alexis</h5>
                </Grid>
                <Grid item className={classes.test}>
                  <Switch />
                </Grid>
              </Grid>
            </Card>
          </Container>
        </Grid>

        <Grid container direction="row" alignItems="center" justify="center">
          <Container>
            <Card
              className={classNames([
                classes.cardStyle,
                classes.containerStyle
              ])}
              id="chat-container"
            >
              <ChatBubble isSender message="Message" />
              <ChatBubble message="Howdy!" />
              <ChatBubble isSender message="Message" />
              <ChatBubble message="Howdy!" />
              <ChatBubble isSender message="Message" />
              <ChatBubble message="Howdy!" />
              <ChatBubble isSender message="Message" />
              <ChatBubble isSender message={longMessage} />
              <ChatBubble isSender message="Last message" />
            </Card>
          </Container>
        </Grid>
        <Grid container justify="center">
          <Container>
            <Card>
              <Grid
                container
                justify="space-around"
                direction="row"
                alignItems="center"
              >
                <CustomInput
                  inputProps={{ multiline: true }}
                  labelText="Input"
                  fullWidth
                />

                <Button type="button" color="info" size="sm">
                  Send
                </Button>
              </Grid>
            </Card>
          </Container>
        </Grid>
      </div>
    );
  }
}

export default withStyles(SingleMessagePageStyle)(SingleMessagePage);
