import React from "react";
import { ChatBubble } from "../../our-components/Chat/ChatBubble";
import { ChatFooter } from "../../our-components/Chat/ChatFooter";
import { ChatHeader } from "../../our-components/Chat/ChatHeader";
// reactstrap components
import { Badge, Card, CardBody, Row, Col } from "reactstrap";

import {
  joinRoom,
  sendMessage,
  receiveMessage,
  handleEmployeeStartedTyping,
  handleIncomingEmployeeStartedTyping,
  stopListening
} from "../../sockets/Socket";
import { INCOMING_MESSAGE, EMPLOYEE_START_TYPING } from "sockets/events/Events";

interface State {
  messages: any[];
  message: string;
  companyUserTyping: string | null;
}

class Conversations extends React.Component<{}, State> {
  constructor(props: any) {
    super(props);
    this.state = {
      messages: [],
      message: "",
      companyUserTyping: null
    };
  }

  private key = 1;
  private chatContainer: HTMLDivElement | null = null;
  private messagesEnd: HTMLDivElement | null = null;

  componentDidMount() {
    this.initialScroll();
    // Joining socket room
    /**
     * Effectively joining the room, but nothing is going
     * on with the room at the moment. All messages are
     * being sent to the namespace right now.
     */
    joinRoom();

    receiveMessage(messageData => {
      console.log("messageData", messageData);
      const { message } = messageData;
      this.createMessage(message);
    });

    handleIncomingEmployeeStartedTyping(companyUsername => {
      console.log(
        "Incoming Employee Started Typing (updating the state)",
        companyUsername
      );
      // if (companyUsername !== "Joe") {
      this.setState({ companyUserTyping: companyUsername });
      // }
    });

    if (false) {
      setInterval(() => {
        this.createMessage();
      }, 2000);
    }
  }

  componentWillUnmount() {
    stopListening(INCOMING_MESSAGE);
    stopListening(EMPLOYEE_START_TYPING);
  }

  initialScroll = () => {
    this.messagesEnd && this.messagesEnd.scrollIntoView(true);
  };

  // scroll to bottom of screen when called
  scrollToBottom = () => {
    this.messagesEnd && this.messagesEnd.scrollIntoView({ behavior: "smooth" });
  };

  componentDidUpdate() {
    this.scrollToBottom(); // scroll to bottom of screen on mount
  }

  createMessage = (message?: string) => {
    message && sendMessage(message);
    const messages = (
      <ChatBubble
        key={this.key++}
        badgeColor="info"
        badgeLabel="Joe"
        message={message ? message : this.state.message}
        timePassed="7 Days"
        inverted={message ? true : false}
      />
    );
    // console.log(receiving, message);
    !message && sendMessage(this.state.message);
    const { messages: messagesState } = this.state;
    messagesState.push(messages);

    this.setState({ messages: messagesState, message: "" });
  };

  handleChange = (event: any) => {
    this.setState({ [event.target.name as "message"]: event.target.value });
    handleEmployeeStartedTyping("Joe");
  };

  addMessage = () => {
    const { message } = this.state;
    message !== "" && this.createMessage();
  };

  keyPress = (e: any) => {
    if (e.keyCode === 13 && this.state.message !== "" && !e.shiftKey) {
      e.preventDefault();
      this.createMessage();
    }
  };

  render() {
    console.log("user currently typing", this.state.companyUserTyping);
    return (
      <>
        <div ref={node => (this.chatContainer = node)}>
          <ChatHeader />

          {/* <ChatBubble
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
          /> */}

          {this.state.messages.map(amessages => {
            return amessages;
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
          whoIsTyping={
            this.state.companyUserTyping ? this.state.companyUserTyping : null
          }
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
export default Conversations;
