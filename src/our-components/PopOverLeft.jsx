import React from "react";

import { Button, Popover, PopoverBody, Row, Col } from "reactstrap";

export class PopOverLeft extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isOpen: false
    };
  }

  toggle = () => {
    this.setState({
      isOpen: !this.state.isOpen
    });
  };

  clickedOutSideOfPopOver = event => {
    return this.popOver && !this.popOver.contains(event.target);
  };

  clickedOutSideOfButton = event => {
    return this.buttonRef && !this.buttonRef.contains(event.target);
  };
  handleClickOutSide = event => {
    if (
      this.clickedOutSideOfPopOver(event) &&
      this.clickedOutSideOfButton(event) &&
      this.state.isOpen
    ) {
      this.toggle();
    }
  };

  componentDidMount() {
    document.addEventListener("mousedown", this.handleClickOutSide);
  }
  componentWillUnmount() {
    document.removeEventListener("mousedown", this.handleClickOutSide);
  }

  render() {
    const { idx } = this.props;

    return (
      <>
        <div ref={node => (this.buttonRef = node)}>
          <Button
            color="info"
            id={`pop-${this.props.idx}`}
            onClick={() => this.toggle()}
          >
            Action
          </Button>
        </div>

        <Popover
          placement="left"
          isOpen={this.state.isOpen}
          target={`pop-${this.props.idx}`}
          className="popover-primary"
        >
          <div ref={node => (this.popOver = node)}>
            <PopoverBody>
              <Col>
                <Row>
                  <Button color="link" disabled>
                    <p style={{ color: "#D1CDCD" }}>View Profile</p>
                  </Button>
                </Row>
                <Row>
                  <Button
                    color="link"
                    onClick={() =>
                      this.props.onOrderCompleteClick(this.props.idx)
                    }
                  >
                    <p style={{ color: "black" }}>Order Complete</p>
                  </Button>
                </Row>
                <Row>
                  <Button color="link">
                    <p style={{ color: "black" }}>Cancel Order</p>
                  </Button>
                </Row>
              </Col>
            </PopoverBody>
          </div>
        </Popover>
      </>
    );
  }
}

// export default Popovers;