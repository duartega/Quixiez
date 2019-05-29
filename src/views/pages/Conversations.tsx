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
  stopListening,
  handleIncomingEmployeeStoppedTyping,
  handleEmployeeStoppedTyping,
  handleIncomingQueText
} from "../../sockets/Socket";
import {
  INCOMING_MESSAGE,
  EMPLOYEE_START_TYPING,
  UPDATED_QUE_TEXT
} from "sockets/events/Events";

interface State {
  messages: any[];
  message: string;
  companyUserTyping: string | null;
}

class Conversations extends React.Component<
  { conversationContainerHeight: number },
  State
> {
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
  private innerHeight: any = null;
  private timeout: any = null;

  componentDidMount() {
    this.initialScroll();
    // Joining socket room
    /**
     * Effectively joining the room, but nothing is going
     * on with the room at the moment. All messages are
     * being sent to the namespace right now.
     */
    joinRoom();

    handleIncomingQueText(queText => {
      console.log("updated queText", queText);
    });

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
      if (this.state.companyUserTyping === null) {
        this.setState({ companyUserTyping: companyUsername });
      }
      // }
    });

    handleIncomingEmployeeStoppedTyping(companyUsername => {
      console.log("Incoming STOPPED typing", companyUsername);
      this.setState({ companyUserTyping: null });
    });

    if (false) {
      setInterval(() => {
        this.createMessage();
      }, 2000);
    }

    if (this.chatContainer) {
      console.log("height", this.chatContainer.clientHeight);
    } else {
      console.log("height unavailable");
    }
  }

  componentWillUnmount() {
    stopListening(INCOMING_MESSAGE);
    stopListening(EMPLOYEE_START_TYPING);
    stopListening(UPDATED_QUE_TEXT);
  }

  initialScroll = () => {
    this.messagesEnd && this.messagesEnd.scrollIntoView(true);
  };

  // scroll to bottom of screen when called
  scrollToBottom = () => {
    this.messagesEnd && this.messagesEnd.scrollIntoView({ behavior: "smooth" });
  };

  componentDidUpdate(prevProps: any, prevState: State) {
    /**
     * Stopping the automatic scroll to bottom
     * when the user typing changes
     */
    if (prevState.companyUserTyping !== this.state.companyUserTyping) {
    } else if (this.state.companyUserTyping === null) {
    } else {
      this.scrollToBottom(); // scroll to bottom of screen on mount
    }
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

    if (this.timeout) {
      delete this.timeout;
    }
    this.timeout = setTimeout(() => {
      handleEmployeeStoppedTyping("Joe");
    }, 5000);
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
        <div
          ref={node => (this.chatContainer = node)}
          style={{ height: this.props.conversationContainerHeight }}
        >
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
          {/* <div className="h-75"> */}
          {this.state.messages.map(amessages => {
            return amessages;
          })}
          {/* </div> */}

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
