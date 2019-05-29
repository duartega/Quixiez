import React, { Component } from "react";
// react component for creating dynamic tables
import ReactTable from "react-table";
import { PopOverLeft } from "../PopOverLeft";
import { axiosPost, axiosGet } from "../../network/ApiCalls";
import { getAllConversations } from "../../constants/routes";
import { format, getMinutes, getHours } from "date-fns";

import {
  Card,
  CardBody,
  CardHeader,
  CardTitle,
  Row,
  Col,
  Button
} from "reactstrap";

class ReactTables extends Component {
  constructor(props) {
    super(props);

    this.state = {
      conversations: [],
      data: null
    };
  }

  handleOrderComplete = idx => {
    // Temporarily set the status to complete. Will change when we use axiosPut
    const { data } = this.state;
    let statusValue = this.changeStatusMessage("COMPANY_COMPLETE", "success");
    data[idx].status = (
      <Button className="btn-simple" color={statusValue[1]} disabled>
      {statusValue[0]}
    </Button>
    )
    this.setState({ data });
  };

  // renderStatus = idx => {
  //   if (
  //     this.state &&
  //     this.state.data &&
  //     this.state.data[idx].orderStatus !== "INCOMPLETE"
  //   ) {
  //     return <p>COMPLETE</p>;
  //   }
  //   return <p>Incomplete</p>;
  // };

  // centerTableHeaderName = name => {
  //   return <div style={{ textAlign: "center" }}>{name}</div>;
  // };

  componentDidMount() {
    // Get all conversations for the company
    axiosGet(getAllConversations)
      .then(result => {
        sessionStorage.setItem("messages", JSON.stringify(result.data));
      })
      .catch(err => {
        console.log(err, err.response);
      });

    // Store the messages in the session storage
    let messagesArrStorage = sessionStorage.getItem("messages");
    if (messagesArrStorage) {
      this.setState({ conversations: JSON.parse(messagesArrStorage) });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    // Map our conversations to the table
    if (prevState.conversations !== this.state.conversations) {
      this.mapConversationsToTable();
    }
  }

  changeStatusMessage = (status, statusColor) => {
    // Set the status message and the status color
    if (status === "CONSTRUCT_ORDER") {
      status = "PENDING";
      statusColor = "primary";
    } else if (status === "COMPLETE") {
      status = "NEW ORDER";
      statusColor = "success";
    } else if (status === "IN_PROGRESS") {
      status = "IN PROGRESS";
      statusColor = "warning";
    } else if (status === "CONSUMER_CANCELLED") {
      status = "CANCELLED";
      statusColor = "warning";
    } else if (status === "COMPANY_REJECTED") {
      status = "REJECTED";
      statusColor = "danger";
    } else if (status === "COMPANY_COMPLETE") {
      status = "COMPLETE";
      statusColor = "success";
    } else {
      status = "ERROR";
    };
    return [status, statusColor];
  }

  mapConversationsToTable = () => {
    let conversationsArray = [];
    const { conversations } = this.state;

    // Create an array for our conversations
    conversationsArray = conversations.map((aConversation, idx) => {
      let { consumerUser, messages } = aConversation;
      let fname = consumerUser.firstName + " " + consumerUser.lastName;
      let lastMessage = messages[messages.length - 1].content;
      let timeRecieved = messages[messages.length - 1].created;
      let status = aConversation.phase;

      // Set the status message and the status color
      let statusColor = "";
      let statusValue = this.changeStatusMessage(status, statusColor);
      status = statusValue[0]; 
      statusColor = statusValue[1];

      // Using Date-FNS, it automatically converts the UTC to your local time zone
      let hour = getHours(new Date(timeRecieved));
      let minutes = getMinutes(new Date(timeRecieved));

      let amPm = false;
      // Set the PM tag to true if it is 12 PM
      if (hour > 11) {
        amPm = true;
      }

      // Convert the time format to 12 hour format
      if (hour > 12) {
        hour %= 12;
      }

      // Format minutes to show 10:07 instead of 10:7
      minutes = format(new Date(timeRecieved), "mm");

      // Finally put together the timestamp
      let time = hour + ":" + minutes;

      // Append the AM or PM based on the time bool
      if (amPm) {
        time += " PM";
      } else {
        time += " AM";
      }

      return {
        id: idx,
        name: fname,
        message: lastMessage,
        received: time,
        status: (
          // Add the status for each conversation
          <Button className="btn-simple" color={statusColor} disabled>
            {status}
          </Button>
          
        ),
        actions: (
          // We've added some custom button actions
          <div className="actions-right">
            <PopOverLeft
              idx={idx}
              onOrderCompleteClick={this.handleOrderComplete}
            />
          </div>
        )
      };
    });

    // Set the state so we can render our conversations
    this.setState({ data: conversationsArray });
  };

  render() {
    console.log("render called");
    return this.state.data ? (
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
                    data={this.state.data}
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

export default ReactTables;
