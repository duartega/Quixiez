import React from "react";
import { Row, Col } from "reactstrap";
export class ChatHeader extends React.Component {
  render() {
    return (
      <Row className="chat-header-container">
        {/* <Col style={{ display: "flex" }}> */}

        {/* <Col className="align-middle align-items-center"> */}
        <Col className="header-col">
          <h3 className="text-center align-self-center">Test</h3>
        </Col>
        <br />
        <br />
        <br />
      </Row>
    );
  }
}
