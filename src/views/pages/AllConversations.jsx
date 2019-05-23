import React from "react";
import { Row, Col } from "reactstrap";
import { Grid } from "@material-ui/core";

import Conversations from "./Conversations";
import BusinessHours from "../tables/BusinessHoursTable";

class AllConversations extends React.Component {
  render() {
    return (
      // <body style={{ height: "100%", margin: "0", overflow: "hidden"}}>
      // <Row className="all-conversations-container">
      <Row>
        {/* <Col>
          <BusinessHours />
        </Col> */}

        {/* <Col
          style={{
            backgroundColor: "green",
            overflowY: "auto",
            maxHeight: "100%",
            maxWidth: "100%"
          }}
        > */}
        <Col style={{ overflowY: "scroll" }}>
          <Conversations />
        </Col>
      </Row>
      // </body>
    );
  }
}

export default AllConversations;
