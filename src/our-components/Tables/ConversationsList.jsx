import React, { Component } from "react";
import classNames from "classnames";
// react component for creating dynamic tables
import ReactTable from "react-table";
import Pop from '../PopOverRight';

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
  ["Briel Williamson", "Your order has been cancelled.", "8:00 AM", "Cancelled"],
  ["Caesar Vance", "Your order has been rejected.", "7:30 AM", "Rejected"],
];

class ReactTables extends Component {
  constructor(props) {
    super(props);

    this.openPop = this.openPop.bind(this);
    this.state = {
      data: dataTable.map((prop, key) => {
        return {
          id: key,
          name: prop[0],
          message: prop[1],
          received: prop[2],
          status: prop[3],
          actions: (
            // we've added some custom button actions
            <div className="actions-right">
              {/* use this button to add a like kind of action */}
              
              <Button
                onClick={() => {
                  let obj = this.state.data.find(o => o.id === key);
                  console.log(this.state.data.find(o => o.id === key))
                  this.openPop();
                }}
                color="info"
                
              >
                Action {<Pop propId={key}/>}
              </Button>{" "}

              {/* use this button to remove the data row */}
              {/* <Button
                onClick={() => {
                  var data = this.state.data;
                  data.find((o, i) => {
                    if (o.id === key) {
                      // here you should add some custom code so you can delete the data
                      // from this component and from your server as well
                      data.splice(i, 1);
                      console.log(data);
                      return true;
                    }
                    return false;
                  });
                  this.setState({ data: data });
                }}
                color="danger"
                size="sm"
                className={classNames("btn-icon btn-link like", {
                  "btn-neutral": key < 5
                })}
              >
                <i className="tim-icons icon-simple-remove" />
              </Button>{" "} */}
            </div>
          )
        };
      })
    };
  }

  openPop = () =>
      <Pop />

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
                      },
                      {
                        Header: "",
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
          <Pop/>
        </div>
      </>
    );
  }
}

export default ReactTables;
