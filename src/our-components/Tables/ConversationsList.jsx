import React, { Component } from "react";
// react component for creating dynamic tables
import ReactTable from "react-table";
import { PopOverLeft } from "../PopOverLeft";
import { axiosPost, axiosGet, axiosPut } from "../../network/ApiCalls";
import { getAllConversations, updatePhase } from "../../network/routes";
import { format, getMinutes, getHours, getTime } from "date-fns";
import { connect } from "react-redux";
import { setConversationToRender } from "../../redux/actions/conversations";
import * as StatusInfo from "../Tables/StatusInfo";
import {
  Card,
  CardBody,
  CardHeader,
  CardTitle,
  Row,
  Col,
  Toast
} from "reactstrap";
import { handleIncomingQueText } from "sockets/Socket";

class ReactTables extends Component {
  constructor(props) {
    super(props);

    this.state = {
      tableData: null
    };
  }

  handleOrderActionButton = (idx, status) => {
    // Temporarily set the status to complete. Will change when we use axiosPut
    const { tableData } = this.state;

    const messages = JSON.parse(sessionStorage.getItem("messages"));
    const quetextID = messages[idx].id;

    let statusValue = StatusInfo.changeStatusMessage(status);
    tableData[idx].status = StatusInfo.updateButton(statusValue);
    console.log(statusValue[0]);

    axiosPut(updatePhase(quetextID), { phase: status })
      .then(result => {
        console.log(result.data);
      })
      .catch(err => {
        console.log(err, err.response);
      });

    this.setState({ tableData });
  };

  componentDidMount() {
    const { allConversations } = this.props;
    console.log("allConversations in componentDidMount", allConversations);
    if (allConversations) {
      this.mapConversationsToTable();
    }
  }

  componentWillUnmount() {
    console.log("conversationList WILL UNMOUNT");
  }
  // component
  renderInitialConversation = idx => {
    const { setConversationToRender } = this.props;
    setConversationToRender(idx);
  };

  componentDidUpdate(prevProps, prevState) {
    // Map our conversations to the table
    /**
     * All the conversations are coming from redux
     */
    if (prevProps.allConversations !== this.props.allConversations) {
      this.mapConversationsToTable();
    }
  }

  mapConversationsToTable = () => {
    let conversationsArray = [];
    // const { conversations } = this.state;
    const { allConversations } = this.props;

    // Create an array for our conversations
    conversationsArray = allConversations.map((aConversation, idx) => {
      let { consumerUser, messages } = aConversation;
      let fname = consumerUser.firstName + " " + consumerUser.lastName;
      let lastMessage = messages[messages.length - 1].content;
      let timeRecieved = messages[messages.length - 1].created;
      let status = aConversation.phase;

      // Set the status message and the status color
      let statusValue = StatusInfo.changeStatusMessage(status);
      status = statusValue[0];
      let statusColor = statusValue[1];

      let time = StatusInfo.calculateTime(timeRecieved);

      return {
        id: idx,
        name: fname,
        message: lastMessage,
        received: time,
        status: StatusInfo.updateButton(statusValue),
        actions: (
          // We've added some custom button actions
          <div className="actions-right">
            <PopOverLeft
              idx={idx}
              onViewConversationClick={this.handleViewConversation}
              onOrderActionClick={this.handleOrderActionButton}
            />
          </div>
        )
      };
    });

    // Set the state so we can render our conversations
    this.setState({ tableData: conversationsArray });
  };

  handleViewConversation = idx => {
    const { setConversationToRender } = this.props;
    setConversationToRender(idx);
    // const messages = sessionStorage.getItem("messages");
    // const messagesJSON = JSON.parse(messages);

    // setConversation(messagesJSON[idx]);
  };

  render() {
    console.log("render called");
    return this.state.tableData ? (
      <>
        <div className="content">
          <Row className="mt-5">
            <Col xs={12} md={12}>
              <Card>
                <CardHeader>
                  <CardTitle tag="h4">Inbox</CardTitle>
                </CardHeader>
                <CardBody>
                  <ReactTable
                    data={this.state.tableData}
                    sortable={false}
                    resizable={false}
                    columns={[
                      {
                        Header: "Name",
                        accessor: "name"
                      },
                      {
                        Header: "Message",
                        accessor: "message"
                      },
                      {
                        Header: "Received",
                        accessor: "received"
                      },
                      {
                        Header: "Status",
                        accessor: "status"
                        // For Centering header text
                        // headerClassName: "text-center"
                      },
                      {
                        accessor: "actions",
                        sortable: false,
                        filterable: false
                      }
                    ]}
                    defaultPageSize={5}
                    showPaginationTop
                    showPaginationBottom={false}
                    className="-striped -highlight"
                  />
                </CardBody>
              </Card>
            </Col>
          </Row>
        </div>
      </>
    ) : null;
  }
}

const mapStateToProps = ({ conversation: { allConversations } }) => ({
  allConversations
});

const mapDispatchToProps = dispatch => ({
  setConversationToRender: idx => dispatch(setConversationToRender(idx))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ReactTables);
