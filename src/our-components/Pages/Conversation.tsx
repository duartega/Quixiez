import React from "react";
import { ChatBubble } from "../Components/Chat/ChatBubble";
import { ChatFooter } from "../Components/Chat/ChatFooter";
import { ChatHeader } from "../Components/Chat/ChatHeader";
import { axiosPost, axiosGet } from "../../network/ApiCalls";
import { getAllConversations } from "../../network/routes";
import { connect } from "react-redux";
import { sendMessage } from "../../network/routes";
import {
  joinRoom,
  // sendMessage,
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
import { bigIntLiteral } from "@babel/types";
import { conversation } from "redux/reducers/conversations";

type Props = {
  conversation: any;
  conversationContainerHeight: number;
  history: any;
};

type State = {
  messages: any[];
  message: string;
  companyUserTyping: string | null;
};

class Conversations extends React.Component<Props, State> {
  constructor(props: any) {
    super(props);
    this.state = {
      messages: [],
      message: "",
      companyUserTyping: null
    };
  }

  private key = 1;
  // private chatContainer: HTMLDivElement | null = null;
  private messagesEnd: HTMLDivElement | null = null;
  private innerHeight: any = null;
  private timeout: any = null;

  componentDidMount() {
    const { conversation } = this.props;
    /**
     * If there aren't any conversation to render
     * thats because the page was refreshed and
     * we will reroute the user to the conversation
     * page
     */
    if (!conversation) {
      const { history } = this.props;
      history.replace("/admin/conversations");
    }
    this.handleRenderConversation();

    handleIncomingEmployeeStartedTyping(companyUsername => {
      console.log(
        "Incoming Employee Started Typing (updating the state)",
        companyUsername
      );
      // if (companyUsername !== "Joe") {
      if (this.state.companyUserTyping === null) {
        this.setState({ companyUserTyping: companyUsername });
      }
    });

    handleIncomingEmployeeStoppedTyping(companyUsername => {
      console.log("Incoming STOPPED typing", companyUsername);
      this.setState({ companyUserTyping: null });
    });
  }

  componentWillUnmount() {
    //   stopListening(INCOMING_MESSAGE);
    stopListening(EMPLOYEE_START_TYPING);
    //   stopListening(UPDATED_QUE_TEXT);
  }

  initialScroll = () => {
    console.log("initialScroll called");
    this.messagesEnd && this.messagesEnd.scrollIntoView(true);
  };

  // scroll to bottom of screen when called
  scrollToBottom = () => {
    console.log("scrollToBottom called");
    this.messagesEnd && this.messagesEnd.scrollIntoView({ behavior: "smooth" });
  };

  componentDidUpdate(prevProps: Props, prevState: State) {
    /**
     * Handling state & scrolling
     */
    switch (true) {
      case prevState.messages !== this.state.messages:
        this.initialScroll();
        break;
      case prevState.companyUserTyping !== this.state.companyUserTyping:
        // Do nothing
        break;
      case this.state.companyUserTyping === null:
        // Do nothing
        break;

      default:
      // Do nothing
    }

    /**
     * Handling props & new messages
     */
    switch (true) {
      case prevProps.conversation !== this.props.conversation:
        this.handleRenderConversation();
        break;
      default:
      // Do nothing
    }
  }

  handleRenderConversation = () => {
    const { conversation } = this.props;
    if (
      conversation &&
      conversation.messages &&
      conversation.messages.length > 0
    ) {
      const { messages, consumerUser } = conversation;
      const stateMessages = messages.map((aMessage: any) =>
        this.createMessageBubble(aMessage, consumerUser.firstName)
      );

      this.setState({ messages: stateMessages });
    }
  };

  /**
   * TODO: First name isn't working 100% need to return sentBy from backend
   */
  createMessageBubble = (conversation: any, firstName: string) => {
    const { content } = conversation;
    return (
      <ChatBubble
        key={this.key++}
        badgeColor="info"
        badgeLabel={firstName}
        message={content}
        timePassed="7 Days"
        inverted={true}
      />
    );
  };

  createMessage = (message?: string) => {
    // message && sendMessage(message);
    // will do axiosPost here

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
    // !message && sendMessage(this.state.message);
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

  // addMessage = () => {
  //   const { message } = this.state;
  //   message !== "" && this.createMessage();
  // };

  sendMessage = () => {
    // const { id } = this.props.conversation;
    // const { message } = this.state;
    // if (message !== "") {
    //   axiosPost(sendMessage(id as string), { message: this.state.message });
    //   this.setState({ message: "" });
    // }
    this.createMessage();
  };

  keyPress = (e: any) => {
    if (e.keyCode === 13 && !e.shiftKey) {
      e.preventDefault();
      this.sendMessage();
    }
  };

  render() {
    console.log("user currently typing", this.state.companyUserTyping);
    return (
      <>
        <div className="content">
          <ChatHeader />

          {this.state.messages.map(aMessage => {
            return aMessage;
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
            buttonOnClick={this.sendMessage}
          />
        </div>
      </>
    );
  }
}

const mapStateToProps = ({ conversation }: { conversation: any }) => {
  const { idxOfConversationToRender, allConversations } = conversation;
  if (allConversations && allConversations[idxOfConversationToRender]) {
    return {
      conversation: allConversations[idxOfConversationToRender]
    };
  }
  return {
    conversation: null
  };
};

export default connect(mapStateToProps)(Conversations);
