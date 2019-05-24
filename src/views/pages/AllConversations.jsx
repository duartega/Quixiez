import React from "react";
import { Row, Col } from "reactstrap";
import { Grid } from "@material-ui/core";
import { ChatFooter } from "../../our-components/ChatFooter";
import Conversations from "./Conversations";
import BusinessHours from "../tables/BusinessHoursTable";
import ConversationsList from "../../our-components/Tables/ConversationsList";
class AllConversations extends React.Component {
  render() {
    return (
      <Row style={{ overflow: "hidden", maxHeight: "100%" }}>
        <Col>
          <ConversationsList />
        </Col>

        <Col style={{ overflow: "scroll" }}>
          <Conversations />
          <ChatFooter
            inputPlaceHolder="Enter Message"
            // inputOnChange={this.handleChange}
            inputName="message"
            // inputValue={this.state.message}
            // inputOnKeyDown={this.keyPress}
            inputStyle={{ backgroundColor: "#27293d" }}
          />
        </Col>
      </Row>
    );
  }
}

export default AllConversations;
