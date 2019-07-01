import React from "react";
import ConversationCell from "./ConversationCell";
import testData from "./testData";
import { connect } from "react-redux";
import {
  setConversationToRender,
  setConversationRead
} from "../../../redux/actions/conversations";
import * as StatusInfo from "../../Tables/StatusInfo";
import { PopOverLeft } from "../PopOverLeft";
import { Button, Spinner } from "reactstrap";
import { getTimeValue } from "../../../redux/actions/conversations";
//@ts-ignore
import ReactBSAlert from "react-bootstrap-sweetalert"; // For a popup that shows we are loading the info
import { axiosGet, axiosPut } from "network/ApiCalls";
import { queTextSingleEdit } from "network/routes";
import { unreadType } from "../../../redux/types/conversationTypes";
//@ts-ignore
import { QueTextI } from "Types/Interfaces/QueText";
import { Dispatch } from "redux";
type Props = {
  unread: unreadType;
  allConversations: QueTextI[];
  idxOfConversationToRender: null | number;

  /** DispatchToProps */
  setConversationToRender: (idx: number) => void;
  setConversationRead: (conversationId: string) => void;
};

type State = {
  name: string;
  time: string;
  message: string;
  firstInitial: string;
  tableData: any[];
  loading: null | typeof ReactBSAlert;
};

class ConversationList extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      name: "",
      time: "",
      message: "",
      firstInitial: "",
      tableData: [],
      loading: null
    };
  }

  private initialRenderOfMessages = false;
  private loadTimeOut: NodeJS.Timeout | null | number = null;
  private markInitialMessageAsReadTimeOut:
    | NodeJS.Timeout
    | null
    | number = null;
  private idxToWatch: number = 0;

  handleInitialRender = () => {
    this.handleViewConversation(0);
    this.initialRenderOfMessages = true;
    this.setTimeOutOnMarkingInitMessageAsRead();
  };

  componentDidMount() {
    this.showLoadingAlert();
    const { allConversations } = this.props;
    if (allConversations) {
      this.mapConversationsToTable();

      !this.initialRenderOfMessages && this.handleInitialRender();

      this.loadTimeOut = setTimeout(this.hideLoadingAlert, 1500);
    }
  }

  showLoadingAlert = () => {
    this.setState({
      loading: (
        <ReactBSAlert
          style={{ display: "block", marginTop: "-100px" }}
          title="Your conversations are loading..."
          onConfirm={() => this.hideLoadingAlert()}
          showConfirm={false}
        >
          <div className="loading-spinner" />
          This may take a few seconds...
        </ReactBSAlert>
      )
    });
  };

  hideLoadingAlert = () => {
    this.setState({
      loading: null
    });
  };

  componentDidUpdate(prevProps: Props, prevState: State) {
    // const { updateType } = this.props;
    const { idxOfConversationToRender, allConversations } = this.props;

    // console.log(idxOfConversationToRender);
    // if a new message came in
    if (
      idxOfConversationToRender !== null &&
      prevProps.allConversations &&
      prevProps.allConversations[idxOfConversationToRender] !==
        allConversations[idxOfConversationToRender]
    ) {
      this.checkIfMessageNeedsToBeMarkedAsRead();
    }
    // Get last
    // const

    // if (
    //   prevProps.idxOfConversationToRender !==
    //   this.props.idxOfConversationToRender
    // ) {
    //   this.checkIfMessageNeedsToBeMarkedAsRead();
    // }

    if (prevProps.allConversations !== this.props.allConversations) {
      // console.log("Map Updated");
      this.mapConversationsToTable();
    }
    !this.initialRenderOfMessages && this.handleInitialRender();

    if (this.loadTimeOut) {
      clearTimeout(this.loadTimeOut as number);
    }
    this.loadTimeOut = setTimeout(this.hideLoadingAlert, 1500);
  }

  componentWillUnmount() {
    if (this.loadTimeOut) {
      clearTimeout(this.loadTimeOut as number);
    }
    if (this.markInitialMessageAsReadTimeOut) {
      clearTimeout(this.markInitialMessageAsReadTimeOut as number);
    }
  }

  mapConversationsToTable = () => {
    let conversationsArray = [];

    const { allConversations, unread } = this.props;
    // console.log("unread", unread);

    // Create an array for our conversations
    conversationsArray = allConversations.map((aConversation, idx) => {
      let { consumerUser, messages } = aConversation;
      let fname = consumerUser.firstName + " " + consumerUser.lastName;
      let lastMessage = messages[messages.length - 1].content;
      let timeReceived = messages[messages.length - 1].created;
      let firstInitial = fname.charAt(0);

      let time = StatusInfo.calculateTime(timeReceived);

      // NOT DOING ANYTHING WITH THIS YET...
      let timeValue = getTimeValue(timeReceived);
      // console.log(aConversation.id);
      const { id } = aConversation;
      // console.log(unread[id]);
      return {
        id: idx,
        name: fname,
        message: lastMessage,
        time: time,
        firstInitial: firstInitial,
        timeValue: timeValue,
        unread: unread[id]
      };
    });

    this.setState({ tableData: conversationsArray });
  };

  checkIfMessageNeedsToBeMarkedAsRead = () => {
    const { unread, allConversations, idxOfConversationToRender } = this.props;
    // console.log("checkIfMessageNeedsToBeMarkedAsRead before if");
    // console.log(
    //   "unread",
    //   unread,
    //   "allConversations",
    //   allConversations,
    //   "idxOfConversationToRender",
    //   idxOfConversationToRender
    // );
    if (!unread || !allConversations || idxOfConversationToRender === null) {
      return;
    }

    // console.log("checkIfMessageNeedsToBeMarkedAsRead after if");
    // Get the appropriate conversation
    const conversation = allConversations[idxOfConversationToRender];
    const conversationId = conversation.id;

    if (unread[conversationId]) {
      this.idxToWatch = idxOfConversationToRender;
      this.setTimeOutOnMarkingInitMessageAsRead();
    }
  };

  setTimeOutOnMarkingInitMessageAsRead = () => {
    console.log("setTimeOutOnMarkingInitMessageAsRead");
    if (this.markInitialMessageAsReadTimeOut) {
      clearTimeout(this.markInitialMessageAsReadTimeOut as number);
    }

    this.markInitialMessageAsReadTimeOut = setTimeout(() => {
      const { idxOfConversationToRender } = this.props;

      if (
        typeof idxOfConversationToRender === "number" &&
        idxOfConversationToRender === this.idxToWatch
      ) {
        // console.log("calling markConversationMessagesAsRead");
        this.markConversationMessagesAsRead(0);
      }
    }, 7000);
  };

  handleViewConversation = (idx: number) => {
    const { setConversationToRender, unread, allConversations } = this.props;
    this.markConversationMessagesAsRead(idx);

    setConversationToRender(idx);
  };

  markConversationMessagesAsRead = (idx: number) => {
    const { unread, allConversations } = this.props;
    // console.log(allConversations);
    if (allConversations) {
      const { id } = allConversations[idx];
      const messageIsUnread = unread[id];
      if (messageIsUnread) {
        axiosPut(queTextSingleEdit(id, "READ", "true")).then(() => {
          const { setConversationRead } = this.props;

          setConversationRead(id);
        });
      }
    }
  };

  render() {
    return (
      <>
        <div className="content">
          {this.state.loading}
          {this.state.tableData.map((data, idx) => (
            <ConversationCell
              key={idx}
              idx={idx}
              props={data}
              renderConvo={this.handleViewConversation}
            />
          ))}
          {/* {testData.map((data, idx)=>
                    <ConversationCell key={idx} props={data} renderConvo={this.handleViewConversation} />
                )} */}
        </div>
      </>
    );
  }
}

// export default ConversationList;

const mapStateToProps = ({
  conversation: {
    allConversations,
    unread,
    // updateType,
    idxOfConversationToRender
  }
}: {
  conversation: {
    allConversations: QueTextI[];
    unread: unreadType;
    // updateType:
    idxOfConversationToRender: number;
  };
}) => {
  if (allConversations === null) {
    return {
      allConversations,
      unread,
      // updateType,
      idxOfConversationToRender
    };
  }

  return {
    allConversations: [...allConversations],
    unread,
    // updateType,
    idxOfConversationToRender
  };
};

const mapDispatchToProps = (dispatch: any) => ({
  setConversationToRender: (idx: number) =>
    dispatch(setConversationToRender(idx)),
  setConversationRead: (id: string) => dispatch(setConversationRead(id))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ConversationList);
