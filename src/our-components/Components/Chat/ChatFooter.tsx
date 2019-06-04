import React, { Component } from "react";
import { Row, Col, Input, Button } from "reactstrap";
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
}

export class ChatFooter extends Component<Props> {
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
