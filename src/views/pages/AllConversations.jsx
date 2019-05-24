import React from "react";
import { Row, Col } from "reactstrap";
import { Grid } from "@material-ui/core";

import Conversations from "./Conversations";
import BusinessHours from "../tables/BusinessHoursTable";
import ConversationsList from "../../our-components/Tables/ConversationsList";
class AllConversations extends React.Component {

  componentWillMount() {
    console.log(window.innerHeight)
  }
  render() {
    return (
      <Row style={{overflow: "hidden"}} className="content">
        <Col>
          <ConversationsList />
        </Col>

        <Col style={{overflow: "auto", height: window.innerHeight-50 }}>
          <Conversations />
        </Col>
      </Row>
    );
  }
}

export default AllConversations;
