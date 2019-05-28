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
    this.conversationHeight =
      window.innerHeight - this.customHeight - this.headerHeightWithPadding;
  }

  render() {
    console.log("conversation height", this.conversationHeight);
    return (
      <Row style={{ overflow: "hidden" }} className="content">
        <Col>
          <ConversationsList />
        </Col>

        <Col
          style={{
            overflow: "auto",
            height: this.conversationHeight
          }}
        >
          <Conversations
            /**
             * For right now this is ok.
             * We are setting the conversations container height
             * To push down the footer.
             * - 80 is the height of the footer (for now, the height
             * of the footer might change)
             */
            conversationContainerHeight={this.conversationHeight - 80}
          />
        </Col>
      </Row>
    );
  }
}

export default AllConversations;
