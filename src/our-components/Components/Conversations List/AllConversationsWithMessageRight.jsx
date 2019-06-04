import React from 'react';
import ConversationList from '../Conversations List/ConversationList';
import {Row, Col} from 'reactstrap';
import Conversation from '../../Pages/Conversation';

class AllConversations extends React.Component {

  constructor(props) {
    super(props);

    this.state = {};

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
    this.conversationHeight = window.innerHeight - this.customHeight - this.headerHeightWithPadding;
    this.conversationHeight1 = window.outterHeight - this.customHeight - this.headerHeightWithPadding;

  }

  render() {
    return (
      <div className="content">
        <Row>
          <Col sm="4" style={{
            overflow: "auto",
            height: this.conversationHeight
          }}>
            <ConversationList/>
          </Col>
          <Col sm="1"/> {/* Making a divider */}
          <Col
            md="7"
            style={{
            overflow: "auto",
            height: this.conversationHeight
          }}>
            <Conversation/>
          </Col>
        </Row>
      </div>
    )
  };
};

export default AllConversations;