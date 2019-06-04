import React from "react";
import ConversationCell from "./ConversationCell";
import testData from "./testData";
import { connect } from "react-redux";
import { setConversationToRender } from "../../../redux/actions/conversations";
import * as StatusInfo from "../../Tables/StatusInfo";
import { PopOverLeft } from "../PopOverLeft";
import { Button } from "reactstrap";

class ConversationList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      name: "",
      time: "",
      message: "",
      firstInitial: "",
      tableData: []
    };

    this.initialRenderOfMessages = false;
  }

  handleInitialRender = () => {
    this.handleViewConversation(0);
    this.initialRenderOfMessages = true;
  };

  componentDidMount() {
    const { allConversations } = this.props;
    if (allConversations) {
      this.mapConversationsToTable();

      !this.initialRenderOfMessages && this.handleInitialRender();
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.allConversations !== this.props.allConversations) {
      this.mapConversationsToTable();
    }
    !this.initialRenderOfMessages && this.handleInitialRender();
  }

  mapConversationsToTable = () => {
    let conversationsArray = [];

    const { allConversations } = this.props;

    // Create an array for our conversations
    conversationsArray = allConversations.map((aConversation, idx) => {
      let { consumerUser, messages } = aConversation;
      let fname = consumerUser.firstName + " " + consumerUser.lastName;
      let lastMessage = messages[messages.length - 1].content;
      let timeRecieved = messages[messages.length - 1].created;
      let firstInitial = fname.charAt(0);

      let time = StatusInfo.calculateTime(timeRecieved);

      return {
        id: idx,
        name: fname,
        message: lastMessage,
        time: time,
        firstInitial: firstInitial
      };
    });
    // console.log("THIS IS THE ARRAY: ", conversationsArray);
    // Set the state so we can render our conversations
    this.setState({ tableData: conversationsArray });
  };

  handleViewConversation = idx => {
    const { setConversationToRender } = this.props;
    setConversationToRender(idx);
  };

  render() {
    return (
      <>
        <div className="content">
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

const mapStateToProps = ({ conversation: { allConversations } }) => ({
  allConversations
});

const mapDispatchToProps = dispatch => ({
  setConversationToRender: idx => dispatch(setConversationToRender(idx))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ConversationList);
