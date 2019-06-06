import React from "react";
import { Row, Col } from "reactstrap";
import { Profile } from '../Chat/LinkToProfile';

interface props {
  history: any;
};

export class ChatHeader extends React.Component<props> {
  render() {
    return (
      <Row className="chat-header-container">
        {/* <Col style={{ display: "flex" }}> */}

        {/* <Col className="align-middle align-items-center"> */}
        {/* <Col className="header-col">
          <h3 className="text-center align-self-center">Test</h3>
        </Col> */}
        <Profile history={this.props.history}/>
        <br />
        <br />
        <br />
      </Row>
    );
  }
}
