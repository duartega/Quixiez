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
      buttonOnClick
    } = this.props;
    return (
      <>
        {/* <div style={{ marginBottom: "20px" }} /> */}
        <br />
        <br />
        <br />
        <div style={{ position: "fixed", bottom: "0", width: "100%" }}>
          <Row>
            <Col md="5">
              <Input
                placeholder={inputPlaceHolder}
                onChange={inputOnChange}
                name={inputName}
                value={inputValue}
                onKeyDown={inputOnKeyDown}
                autoFocus
                style={inputStyle}
              />
            </Col>
            <Col lg="3">
              <Button onClick={buttonOnClick}>Send</Button>
            </Col>
          </Row>
        </div>
      </>
    );
  }
}
