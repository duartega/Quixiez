import React from "react";
import { Row, Col } from "reactstrap";
import { Grid } from "@material-ui/core";

import Conversations from "./Conversations";
import BusinessHours from "../tables/BusinessHoursTable";
import C_List from '../../our-components/Tables/ConversationsList';

class AllConversations extends React.Component {
  render() {
    return (
      // <body style={{ height: "100%", margin: "0", overflow: "hidden"}}>
      <Row>
        <Col>
          <C_List />
        </Col>

        <Col
          style={{
            backgroundColor: "green",
            "overflow-y": "auto",
            maxHeight: "100%"
          }}
        >
          <Conversations />
        </Col>
      </Row>
      // </body>
    );
  }
}

export default AllConversations;
