import React from "react";
import ConversationCell from "./ConversationCell";
import testData from "./testData";
import { connect } from "react-redux";
import { setConversationToRender } from "../../../redux/actions/conversations";
import * as StatusInfo from "../../Tables/StatusInfo";
import { PopOverLeft } from "../PopOverLeft";
import { Button, Spinner } from "reactstrap";
import { getTimeValue } from "../../../redux/actions/conversations";
import ReactBSAlert from "react-bootstrap-sweetalert"; // For a popup that shows we are loading the info

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
  }

  handleInitialRender = () => {
    this.handleViewConversation(0);
    this.initialRenderOfMessages = true;
  };

  componentDidMount() {
    this.showLoadingAlert();    
    const { allConversations } = this.props;
    if (allConversations) {
      this.mapConversationsToTable();

      !this.initialRenderOfMessages && this.handleInitialRender();
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
        <div class="loading-spinner"></div>
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
    if (prevProps !== this.props) {
      console.log("ConversationList UPDATED!!");
    }
    

    if (prevProps.allConversations !== this.props.allConversations) {
      console.log("Map Updated");
      this.mapConversationsToTable();
    }
    !this.initialRenderOfMessages && this.handleInitialRender();
    setTimeout(this.hideLoadingAlert, 1500);
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

      // NOT DOING ANYTHING WITH THIS YET...
      let timeValue = getTimeValue(timeRecieved);

      return {
        id: idx,
        name: fname,
        message: lastMessage,
        time: time,
        firstInitial: firstInitial,
        timeValue: timeValue
      };
    });

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

const mapStateToProps = ({ conversation: { allConversations } }) => {
  if (allConversations === null) {
    return {
      allConversations
    };
  }
  // return {
  //   allConversations
  // };
  return {
    allConversations: [...allConversations]
  };
};

const mapDispatchToProps = dispatch => ({
  setConversationToRender: idx => dispatch(setConversationToRender(idx))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ConversationList);
