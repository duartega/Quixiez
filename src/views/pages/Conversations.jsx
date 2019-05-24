import React from "react";
import { ChatBubble } from "../../our-components/ChatBubble";
import { ChatFooter } from "../../our-components/ChatFooter";
import { ChatHeader } from "../../our-components/ChatHeader";
// reactstrap components
import { Badge, Card, CardBody, Row, Col } from "reactstrap";

class Widgets extends React.Component {
  constructor() {
    super();
    this.showNormalBubble = false;
    this.state = {
      testBubble: [],
      message: ""
    };
    this.key = 1;
  }

  componentDidMount() {
    this.initialScroll();

    if (false) {
      setInterval(() => {
        this.testBubble();
      }, 2000);
    }
  }

  initialScroll = () => {
    this.messagesEnd.scrollIntoView(true);
  };

  // scroll to bottom of screen when called
  scrollToBottom = () => {
    this.messagesEnd.scrollIntoView({ behavior: "smooth" });
  };

  componentDidUpdate() {
    this.scrollToBottom(); // scroll to bottom of screen on mount
  }

  testBubble = () => {
    const testBubble = (
      <ChatBubble
        key={this.key++}
        badgeColor="info"
        badgeLabel="Joe"
        message={this.state.message}
        timePassed="7 Days"
        // inverted
      />
    );
    const { testBubble: testBubbleState } = this.state;
    testBubbleState.push(testBubble);

    this.setState({ testBubble: testBubbleState, message: "" });
  };

  handleChange = event =>
    this.setState({ [event.target.name]: event.target.value });

  addMessage = () => {
    if (this.state.message !== "") {
      this.testBubble();
    }
  };

  keyPress = e => {
    if (e.keyCode === 13 && this.state.message !== "" && !e.shiftKey) {
      e.preventDefault();
      this.testBubble();
    }
  };

  render() {
    return (
      <>
        <div ref={node => (this.chatContainer = node)}>
          <ChatHeader />

          <ChatBubble
            badgeColor="warning"
            badgeLabel="Gabe"
            message="A message"
            timePassed="10 hours"
            inverted
          />
          <ChatBubble
            badgeColor="info"
            badgeLabel="Joe"
            message="What's up Gabe?"
            timePassed="7 Days"
          />
          <ChatBubble
            badgeColor="info"
            badgeLabel="Joe"
            message="Hey Man Reply!"
            timePassed="7 Days"
          />

          <ChatBubble
            badgeColor="warning"
            badgeLabel="Gabe"
            message="Hey Joe"
            timePassed="7 Days"
            inverted
          />

          <ChatBubble
            badgeColor="warning"
            badgeLabel="Gabe"
            message="Hey Test Bubble"
            timePassed="7 Days"
            inverted
          />
          <ChatBubble
            badgeColor="warning"
            badgeLabel="Gabe"
            message="Hey Test Bubble"
            timePassed="7 Days"
            inverted
          />
          <ChatBubble
            badgeColor="warning"
            badgeLabel="Gabe"
            message="Hey Test Bubble"
            timePassed="7 Days"
            inverted
          />
          <ChatBubble
            badgeColor="warning"
            badgeLabel="Gabe"
            message="Hey Test Bubble"
            timePassed="7 Days"
            inverted
          />
          <ChatBubble
            badgeColor="warning"
            badgeLabel="Gabe"
            message="Hey Test Bubble"
            timePassed="7 Days"
            inverted
          />

          {this.state.testBubble.map(aTestBubble => {
            return aTestBubble;
          })}

          {/* Scroll to bottom of screen on mount
           * If this div is moved below the chat
           * footer the footer will lose its
           * sticky property. */}
          <div
            ref={el => {
              this.messagesEnd = el;
            }}
          />
          {/* </div> */}
        </div>
        <ChatFooter
          inputPlaceHolder="Enter Message"
          inputOnChange={this.handleChange}
          inputName="message"
          inputValue={this.state.message}
          inputOnKeyDown={this.keyPress}
          inputStyle={{ backgroundColor: "#27293d" }}
          buttonOnClick={this.addMessage}
        />
      </>
    );
  }
}
export default Widgets;
