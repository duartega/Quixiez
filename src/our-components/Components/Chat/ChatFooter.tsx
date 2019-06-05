import React, { Component } from "react";
import { Row, Col, Input, Button } from "reactstrap";
import { connect } from "react-redux";
import { getConversationToRender } from "redux/actions/helpers/conversationsHelpers";
import { QueTextPhase } from "our-components/Types/QueTextPhase";

interface Props {
  inputPlaceHolder: string; //
  inputName?: string; //
  inputValue: string; //
  inputOnChange: (event: any) => void; //
  inputOnKeyDown: (event: React.KeyboardEvent<HTMLInputElement>) => void; //
  inputStyle?: React.CSSProperties; //
  /**
   * Button
   */
  buttonOnClick?: (event: React.MouseEvent<any, MouseEvent>) => void;
  whoIsTyping: string | null;
  phase: QueTextPhase | null;
}

class ChatFooter extends Component<Props> {
  shouldBeDisabled = () => {
    const { phase } = this.props;
    return phase !== "COMPLETE" && phase !== "IN_PROGRESS";
  };

  render() {
    const {
      inputPlaceHolder,
      inputName,
      inputValue,
      inputOnChange,
      inputOnKeyDown,
      inputStyle,
      buttonOnClick,
      whoIsTyping
    } = this.props;

    return (
      <>
        <br />
        <br />
        <br />

        <Row className="chat-footer-container  w-100">
          <div className="w-50 align-items-center chat-box-container">
            {/* <div> */}
            <Row>
              <Col style={{ height: "26px" }}>
                <p>{whoIsTyping ? `${whoIsTyping} is typing...` : ""}</p>
              </Col>
            </Row>
            {/* </div> */}
            <Row>
              <Col className="md-9">
                <Input
                  placeholder={inputPlaceHolder}
                  onChange={inputOnChange}
                  name={inputName}
                  value={inputValue}
                  onKeyDown={inputOnKeyDown}
                  autoFocus
                  style={inputStyle}
                  type="textarea"
                  className="px-2"
                  disabled={this.shouldBeDisabled()}
                />
              </Col>
              <Col
                lg={{ size: 3 }}
                className="d-flex justify-content-center align-items-center h-100"
              >
                <Col className="p-0">
                  <Button onClick={buttonOnClick} className="mt-0 ">
                    <Row className="align-item-center">
                      Send
                      <i className="tim-icons icon-send pl-1 " />
                    </Row>
                  </Button>
                </Col>
              </Col>
            </Row>
          </div>
        </Row>
      </>
    );
  }
}

const mapStateToProps = ({ conversation }: { conversation: any }) => {
  const conversationToRender = getConversationToRender(conversation);
  if (conversationToRender) {
    return {
      phase: conversationToRender.phase
    };
  }
  return {
    phase: null
  };
};

const exportChatFooter = connect(mapStateToProps)(ChatFooter);

export { exportChatFooter as ChatFooter };
