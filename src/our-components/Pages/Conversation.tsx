import React from "react";
import { ChatBubble } from "../Components/Chat/ChatBubble";
import { ChatFooter } from "../Components/Chat/ChatFooter";
import { ChatHeader } from "../Components/Chat/ChatHeader";
import { axiosPost, axiosGet } from "../../network/ApiCalls";
import { getAllConversations, queTextSingle } from "../../network/routes";
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
import { setCompanyUser } from "redux/actions/companyUserActions";

type Props = {
  conversation: any;
  conversationContainerHeight: number;
  history: any;
  companyUserId: string;
  companyUserTyping: any;
  updateType: string | null;
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
  private chatBubbleContainer: HTMLDivElement | null = null;
  private componentHasConductedInitialRender = false;
  private updatedMessages = false;
  private scrollTimeOut: NodeJS.Timeout | number | undefined;
  private currentUserTypingTimeOut: NodeJS.Timeout | number | undefined;
  private previousClientHeight = 0;

  componentDidMount() {
    const { conversation } = this.props;
    if (conversation) {
      this.handleRenderConversation();
    }

    handleIncomingEmployeeStartedTyping(companyUsername => {
      /**
       * Blocking the current user from seeing his own typing message.
       *
       * TODO: In the backend return the companyUser's first name and id
       * because two people with the same name could be typing
       */
      if (
        this.state.companyUserTyping === null &&
        this.props.companyUserTyping !== companyUsername
      ) {
        this.setState({ companyUserTyping: companyUsername });
      }
    });

    handleIncomingEmployeeStoppedTyping(companyUsername => {
      // console.log("Incoming STOPPED typing", companyUsername);
      this.setState({ companyUserTyping: null });
    });
  }

  componentWillUnmount() {
    clearTimeout(this.scrollTimeOut as number);
    stopListening(EMPLOYEE_START_TYPING);
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

  phaseUpdated = (prevProps: any) => {
    // console.log("prevProps.conversation.phase", prevProps.conversation.phase);
    // console.log("this.props.conversation.phase", this.props.conversation.phase);
    return (
      prevProps.conversation.phase !== this.props.conversation.phase &&
      prevProps.conversation.id === this.props.conversation.id
    );
  };

  getSnapshotBeforeUpdate(prevProps: Props, prevState: State) {
    if (this.chatBubbleContainer) {
      // const height = this.chatBubbleContainer.scrollHeight;
      const clientHeight = this.chatBubbleContainer.clientHeight;
      return clientHeight;
    }
    return null;
  }

  componentDidUpdate(
    prevProps: Props,
    prevState: State,
    snapShot: number | null
  ) {
    /**
     * Handling state & scrolling
     */

    /**
     * Handle initial conversation render
     */
    if (prevProps.conversation !== this.props.conversation) {
      if (prevProps.conversation !== null) {
        // this.handleRenderConversation();
      }
    }
    console.log(snapShot);
    if (snapShot !== null) {
      // if (prevProps.conversation.id !== this.props.conversation.id) {
      if (prevProps.conversation === null && this.props.conversation) {
        this.previousClientHeight = snapShot;
        this.handleRenderConversation();
        return;
      } else if (snapShot > this.previousClientHeight) {
        console.log("snapShot", snapShot);
        console.log("this.previousClientHeight", this.previousClientHeight);
        this.previousClientHeight = snapShot;
        this.handleRenderConversation();

        // this.scrollToBottom();
      } else if (snapShot <= this.previousClientHeight) {
        if (
          prevProps.conversation &&
          prevProps.conversation.id !== this.props.conversation.id
        ) {
          console.log("(snapShot <= this.previousClientHeight)");
          this.previousClientHeight = snapShot;
          this.handleRenderConversation();
        }
      }

      return;
    }
  }

  // }

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
    handleEmployeeStartedTyping(this.props.companyUserTyping);

    if (this.currentUserTypingTimeOut) {
      clearTimeout(this.currentUserTypingTimeOut as number);
    }
    this.currentUserTypingTimeOut = setTimeout(() => {
      handleEmployeeStoppedTyping(this.props.companyUserTyping);
    }, 5000);
  };

  sendMessage = () => {
    const { id } = this.props.conversation;
    const { message } = this.state;
    if (message !== "") {
      axiosPost(sendMessage(id as string), { message: this.state.message });
      this.setState({ message: "" });
    }
  };

  keyPress = (e: any) => {
    if (e.keyCode === 13 && !e.shiftKey) {
      e.preventDefault();
      this.sendMessage();
    }
  };

  mapMessages = () => {
    const { messages } = this.state;
    const messagesToRender = messages.map((aMessage, idx) => {
      return aMessage;
    });

    if (this.scrollTimeOut) {
      clearTimeout(this.scrollTimeOut as number);
    }
    this.scrollTimeOut = setTimeout(() => {
      if (
        this.componentHasConductedInitialRender === false &&
        this.state.messages.length > 0
      ) {
        this.componentHasConductedInitialRender = true;
        // console.log("mapMessages calling scrollToBottom in IF");
        this.scrollToBottom();
      } else if (this.componentHasConductedInitialRender) {
        // Handle this logic to allow the page to scroll
        // better by figuring out a way to call the noted
        // out line below
        // this.initialScroll();
        // console.log("mapMessages calling scrollToBottom in else if");
        this.initialScroll();
      }
    }, 100);

    return messagesToRender;
  };

  render() {
    // console.log("user currently typing", this.state.companyUserTyping);
    return (
      <>
        <div ref={ref => (this.chatBubbleContainer = ref)} className="content">
          <ChatHeader history={this.props.history} />

          {/* {this.state.messages.map(aMessage => {
            return aMessage;
          })} */}
          {this.mapMessages()}

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

const mapStateToProps = ({
  conversation,
  companyUserReducer
}: {
  conversation: any;
  companyUserReducer: any;
}) => {
  const {
    companyUser: { id, firstName }
  } = companyUserReducer;

  const conversationToRender = getConversationToRender(conversation);

  return {
    conversation: conversationToRender,
    companyUserId: id,
    companyUserTyping: firstName,
    updateType: conversation.updateType
  };
};

export default connect(mapStateToProps)(Conversation);
