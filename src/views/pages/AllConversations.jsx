import React from "react";
import { Row, Col } from "reactstrap";
import Conversations from "./Conversations";
import ConversationsList from "../../our-components/Tables/ConversationsList";

class AllConversations extends React.Component {
  constructor(props) {
    super(props);
    /** Our custom height we are taking out */
    this.customHeight = 50;
    /**
     * Taking into account the header total size
     *
     * header height = 46
     * header padding top = 10
     * header padding bottom = 10
     *
     * total height = 66
     */

    this.headerHeightWithPadding = 66;
  }

  render() {
    return (
      <Row style={{ overflow: "hidden" }} className="content">
        <Col>
          <ConversationsList />
        </Col>

        <Col
          style={{
            overflow: "auto",
            height:
              window.innerHeight -
              this.customHeight -
              this.headerHeightWithPadding
          }}
        >
          <Conversations />
        </Col>
      </Row>
    );
  }
}

export default AllConversations;
