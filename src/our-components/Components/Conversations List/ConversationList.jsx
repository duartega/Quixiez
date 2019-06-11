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
import ReactBSAlert from "react-bootstrap-sweetalert"; // For a popup that shows we are loading the info
import { axiosGet } from "network/ApiCalls";
import { queTextSingle } from "network/routes";

class ConversationList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      name: "",
      time: "",
      message: "",
      firstInitial: "",
      tableData: [],
      loading: null
    };

    this.initialRenderOfMessages = false;
    this.loadTimeOut = null;
    this.markInitialMessageAsReadTimeOut = null;
  }

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

  componentDidUpdate(prevProps, prevState) {
    // const { updateType } = this.props;

    if (prevProps.allConversations !== this.props.allConversations) {
      // console.log("Map Updated");
      this.mapConversationsToTable();
    }
    !this.initialRenderOfMessages && this.handleInitialRender();

    if (this.loadTimeOut) {
      clearTimeout(this.loadTimeOut);
    }
    this.loadTimeOut = setTimeout(this.hideLoadingAlert, 1500);
  }

  componentWillUnmount() {
    if (this.loadTimeOut) {
      clearTimeout(this.loadTimeOut);
    }
    if (this.markInitialMessageAsReadTimeOut) {
      clearTimeout(this.markInitialMessageAsReadTimeOut);
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
      let timeRecieved = messages[messages.length - 1].created;
      let firstInitial = fname.charAt(0);

      let time = StatusInfo.calculateTime(timeRecieved);

      // NOT DOING ANYTHING WITH THIS YET...
      let timeValue = getTimeValue(timeRecieved);
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

  setTimeOutOnMarkingInitMessageAsRead = () => {
    this.markInitialMessageAsReadTimeOut = setTimeout(() => {
      const { idxOfConversationToRender } = this.props;

      if (
        typeof idxOfConversationToRender === "number" &&
        idxOfConversationToRender === 0
      ) {
        console.log("calling markConversationMessagesAsRead");
        this.markConversationMessagesAsRead(0);
      }
    }, 7000);
  };

  handleViewConversation = idx => {
    const { setConversationToRender, unread, allConversations } = this.props;
    this.markConversationMessagesAsRead(idx);

    setConversationToRender(idx);
  };

  markConversationMessagesAsRead = idx => {
    const { unread, allConversations } = this.props;
    // console.log(allConversations);
    if (allConversations) {
      const { id } = allConversations[idx];
      const messageIsUnread = unread[id];
      if (messageIsUnread) {
        axiosGet(queTextSingle(id, "READ", "true")).then(() => {
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
    updateType,
    idxOfConversationToRender
  }
}) => {
  if (allConversations === null) {
    return {
      allConversations,
      unread,
      updateType,
      idxOfConversationToRender
    };
  }

  return {
    allConversations: [...allConversations],
    unread,
    updateType,
    idxOfConversationToRender
  };
};

const mapDispatchToProps = dispatch => ({
  setConversationToRender: idx => dispatch(setConversationToRender(idx)),
  setConversationRead: id => dispatch(setConversationRead(id))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ConversationList);
