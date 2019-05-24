import React, { Component } from "react";
import classNames from "classnames";
// react component for creating dynamic tables
import ReactTable from "react-table";
import { PopOverLeft } from "../PopOverLeft";

import {
  Card,
  CardBody,
  CardHeader,
  CardTitle,
  Row,
  Col,
  Button
} from "reactstrap";

const dataTable = [
  ["Joe Missamore", "Order Delivered.", "10:20 AM", "Pending"],
  ["Alexis Solano", "Order Delivered.", "10:00 AM", "Complete"],
  ["Ashton Cox", "Order Delivered.", "9:50 AM", "Complete"],
  ["Bradley Greer", "Thank you for your order.", "9:30 AM", "Complete"],
  ["Brenden Wagner", "Your order has been cancelled.", "9:29 AM", "Cancelled"],
  [
    "Briel Williamson",
    "Your order has been cancelled.",
    "8:00 AM",
    "Cancelled"
  ],
  ["Caesar Vance", "Your order has been rejected.", "7:30 AM", "Rejected"]
];

class ReactTables extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: dataTable.map((prop, idx) => {
        return {
          orderStatus: "IN_COMPLETE",
          id: idx,
          name: prop[0],
          message: prop[1],
          received: prop[2],
          status: (
            <Button className="btn-simple" color="success" disabled>
              {prop[3]}
            </Button>
          ),
          actions: (
            // we've added some custom button actions
            <div className="actions-right">
              <PopOverLeft
                idx={idx}
                onOrderCompleteClick={this.handleOrderComplete}
              />
            </div>
          )
        };
      })
    };
  }

  handleOrderComplete = idx => {
    const { data } = this.state;
    data[idx].status = "COMPLETE";
    this.setState({ data });
  };

  renderStatus = idx => {
    if (
      this.state &&
      this.state.data &&
      this.state.data[idx].orderStatus !== "INCOMPLETE"
    ) {
      return <p>COMPLETE</p>;
    }
    return <p>Incomplete</p>;
  };

  centerTableHeaderName = name => {
    return <div style={{ textAlign: "center" }}>{name}</div>;
  };

  render() {
    return (
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
                        // Header: "Actions",
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
    );
  }
}

export default ReactTables;
