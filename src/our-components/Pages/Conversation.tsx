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
import { badgeColor } from "our-components/Components/Chat/Types";
import { getTime } from "date-fns";
import { getConversationToRender } from "redux/actions/helpers/conversationsHelpers";
import { setCompanyUser } from 'redux/actions/companyUserActions';

type Props = {
  conversation: any;
  conversationContainerHeight: number;
  history: any;
  companyUserTyping: any;
};

type State = {
  messages: any[];
  message: string;
  companyUserTyping: string | null;
  mappingMessagesDone: boolean;
};

class Conversation extends React.Component<Props, State> {
  constructor(props: any) {
    super(props);
    this.state = {
      messages: [],
      message: "",
      companyUserTyping: null,
      mappingMessagesDone: false
    };
  }

  private key = 1;
  // private chatContainer: HTMLDivElement | null = null;
  private messagesEnd: HTMLDivElement | null = null;
  private innerHeight: any = null;
  private timeout: any = null;
  private initScroll = true;
  private updatedMessages = false;
  private messageTimeStampTime: NodeJS.Timeout | undefined;

  componentDidMount() {
    // console.log("component did mount");
    // const { conversation } = this.props;
    /**
     * If there aren't any conversation to render
     * thats because the page was refreshed and
     * we will reroute the user to the conversation
     * page
     */
    // if (!conversation) {
    //   const { history } = this.props;
    //   history.replace("/admin/conversations");
    // }
    this.handleRenderConversation();
    // this.initialScroll();

    handleIncomingEmployeeStartedTyping(companyUsername => {
      // console.log(
      //   "Incoming Employee Started Typing (updating the state)",
      //   companyUsername
      // );
      // if (companyUsername !== "Joe") {
      if (this.state.companyUserTyping === null) {
        this.setState({ companyUserTyping: companyUsername });
      }
    });

    handleIncomingEmployeeStoppedTyping(companyUsername => {
      // console.log("Incoming STOPPED typing", companyUsername);
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

  newMessageCameIn = (prevProps: Props) => {
    return (
      prevProps.conversation &&
      prevProps.conversation.messages &&
      this.props.conversation.messages.length -
        prevProps.conversation.messages.length ===
        1
    );
  };

  conversationDidUpdate = (prevProps: any) =>
    prevProps.conversation !== this.props.conversation;

  /**
   * TODO: When a conversation changes sometimes
   * the conversation does NOT scroll to the bottom
   * of all the conversation bubbles
   */
  componentDidUpdate(prevProps: Props, prevState: State) {
    /**
     * Handling state & scrolling
     */
    if (prevState.messages !== this.state.messages) {
      // console.log("MESSAGES HAVE CHANGED");
    }

    if (this.initScroll && prevState.messages !== this.state.messages) {
      // this.initialScroll();
      // setTimeout(() => {
      //   this.initialScroll();
      // }, 1000);
      // this.initScroll = false;
    } else if (this.updatedMessages) {
      this.scrollToBottom();
      this.updatedMessages = false;
    } else {
      // console.log(prevState.messages);
      // console.log(this.state.messages);
    }

    /**
     * Handling props & new messages
     */
    switch (true) {
      case prevProps.conversation &&
        this.conversationDidUpdate(prevProps) &&
        this.newMessageCameIn(prevProps):
        // console.log("Conversation has been updated");
        // this.handleRenderConversation();
        // this.scrollToBottom();

        // console.log(
        //   "this.props.conversation.messages.length - prevProps.conversation.messages.length",
        //   this.props.conversation.messages.length -
        //     prevProps.conversation.messages.length
        // );

        const { conversation } = this.props;
        const {
          consumerUser: { firstName }
        } = conversation;
        const lastMessage = this.props.conversation.messages[
          conversation.messages.length - 1
        ];
        const messageBubble = this.createMessageBubble(lastMessage, firstName);
        // const { messages } = this.state;
        const messages = this.state.messages;
        messages.push(messageBubble);
        this.setState({ messages });
        this.updatedMessages = true;

        break;
      case this.conversationDidUpdate(prevProps):
        this.handleRenderConversation();
      default:
      // Do nothing
    }
  }

  handleRenderConversation = () => {
    const { conversation } = this.props;
    // console.log("CONVOS: ", conversation)
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
    const { content, sentBy } = conversation;
    // console.log("conversation", conversation);
    let sentByLabel = null;
    let badgedColor: badgeColor;

    if (sentBy) {
      const { firstName: sentByFirstName } = sentBy;
      sentByLabel = sentByFirstName;
      if (sentByFirstName === "Bot") {
        badgedColor = "info";
      } else {
        badgedColor = "success";
      }
    } else {
      sentByLabel = firstName;
      badgedColor = "warning";
    }

    /**
     * TODO: Handle Hours ago, at a certain point just render the date..
     * - Handle this updating every minute...
     */
    // let timePassed;
    // timePassed = this.getTimePassedValue(conversation.created);

    // this.messageTimeStampTime = setInterval(() => {
    //   console.log("called");
    //   timePassed = this.getTimePassedValue(conversation.created);
    // }, 1000);

    // let timePassedStr = timePassed === -1 ? `NOW` : `${timePassed} minutes ago`;
    return (
      <ChatBubble
        key={this.key++}
        badgeColor={badgedColor}
        badgeLabel={sentByLabel}
        message={content}
        // timePassed={timePassedStr}
        conversationCreated={conversation.created}
        inverted={sentBy ? false : true}
      />
    );
  };

  handleChange = (event: any) => {
    this.setState({ [event.target.name as "message"]: event.target.value });
    handleEmployeeStartedTyping(this.props.companyUserTyping.companyUser.firstName);

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
    const { id } = this.props.conversation;
    const { message } = this.state;
    if (message !== "") {
      axiosPost(sendMessage(id as string), { message: this.state.message });
      this.setState({ message: "" });
    }
    // this.createMessage();
  };

  keyPress = (e: any) => {
    if (e.keyCode === 13 && !e.shiftKey) {
      e.preventDefault();
      this.sendMessage();
    }
  };

  mapMessages = (callback: () => void) => {
    const { messages } = this.state;
    const messagesToRender = messages.map((aMessage, idx) => {
      return aMessage;
    });

    /**
     * TODO: Consider handle scrolling differently?
     */
    setTimeout(() => {
      callback();
    }, 100);

    return messagesToRender;
  };

  render() {
    // console.log("user currently typing", this.state.companyUserTyping);
    return (
      <>
        <div className="content">
          <ChatHeader history={this.props.history} />

          {/* {this.state.messages.map(aMessage => {
            return aMessage;
          })} */}
          {this.mapMessages(this.scrollToBottom)}

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

const mapStateToProps = ({ conversation, companyUserReducer }: { conversation: any, companyUserReducer: any }) => {
  const conversationToRender = getConversationToRender(conversation);
  

  return {
    conversation: conversationToRender,
    companyUserTyping: companyUserReducer
  };
};

export default connect(mapStateToProps)(Conversation);
