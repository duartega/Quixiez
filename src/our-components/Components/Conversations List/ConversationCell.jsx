// This is a dumb component for the conversation cell
// on the conversation list
import React from "react";
import { Card, Row, Col, CardBody } from "reactstrap";

import { connect } from "react-redux";

class ConversationCell extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      active: false
    };
  }

  componentDidMount() {
    /**
     * When the component does initially mount
     * ConversationList is giving the idxOfConversationToRender
     * and we need to set that ConversationCell to be active.
     */
    if (
      this.state.active === false &&
      this.props.idxOfConversationToRender === this.props.idx
    ) {
      this.setState({ active: true });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    // console.log("CONVERSATION CELL DID UPDATE");
    if (
      this.state.active === false &&
      this.props.idxOfConversationToRender === this.props.idx
    ) {
      this.setState({ active: true });
    } else if (
      this.state.active &&
      this.props.idxOfConversationToRender !== this.props.idx
    ) {
      this.setState({ active: false });
    }
  }

  render() {
    const { props } = this.props;
    let readIndicator = props.unread;

    return (
      <>
        <Card
          className="card-cell"
          style={{
            background: this.state.active ? "orange" : "",
            marginBottom: "0px",
            boxShadow: "0 0px 0px 0px rgba(0, 0, 0, 0)"
          }}
        >
          <Row
            style={{ marginLeft: "0px" }}
            onClick={() => {
              this.props.renderConvo(props.id);
              // this.setState({ active: true });
            }}
          >
            <Row className="messageListContainer">
              <div className="nameCircle">{props.firstInitial}</div>
            </Row>

            {/** right side of messagelist */}
            <Col>
              <Row style={{ paddingTop: "30px", marginRight: "15px" }}>
                <Col md="7">
                  {readIndicator ? <span className="newMessageDot" /> : null}
                  <p style={{ display: "inline-block" }}>{props.name}</p>
                </Col>
                <Col md="5" style={{ paddingRight: "0px", textAlign: "right" }}>
                  <i className="ti-time" /> {props.time}
                </Col>
              </Row>
              <Row>
                <CardBody
                  style={{
                    paddingTop: "0px",
                    paddingLeft: "15px"
                  }}
                >
                  <p>{props.message}</p>
                </CardBody>
              </Row>
            </Col>
          </Row>
        </Card>
        {/** row seperator */}
        <Card
          style={{
            backgroundColor: "#303245",
            marginBottom: "0px",
            boxShadow: "0 0px 0px 0px rgba(0, 0, 0, 0)"
          }}
        >
          <CardBody style={{ padding: "2px" }} />
        </Card>
      </>
    );
  }
}

const mapStateToProps = ({ conversation: { idxOfConversationToRender } }) => ({
  idxOfConversationToRender
});

export default connect(mapStateToProps)(ConversationCell);
