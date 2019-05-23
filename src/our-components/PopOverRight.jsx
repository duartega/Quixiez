import React from "react";

import { Button, Popover, PopoverBody, Row, Col } from "reactstrap";

class Popovers extends React.Component {
  constructor(props) {
    super(props);
    this.toggle = this.toggle.bind(this);
    this.state = {
      popover0: false,
      popover1: false,
      popover2: false,
      popover3: false,
    };
  }
  toggle(popover) {
    console.log("Popp")
    this.setState({
      [popover]: !this.state[popover]
    });
  }
  render() {
    console.log("POP!")
    const { propId } = this.props;
    const popOver = "popover" + propId;
    const st = "this.state.popover" + propId;
    console.log(popOver, st)
    return (
      <>
        <Button id="popover2" onClick={() => this.toggle("popover2")}>
          Action
        </Button>

        <Popover
          placement="right"
          isOpen={this.state.popover2}
          target="popover2"
          className="popover-primary"
        >

          <PopoverBody>
            <Col>
              <Row>
                <Button color="link" disabled>
                  <p style={{color:"#D1CDCD"}}>View Profile</p>
                </Button>
              </Row>
              <Row>
                <Button color="link">
                  <p style={{color:"black"}}>Order Complete</p>
                </Button>
              </Row>
              <Row>
                <Button color="link">
                  <p style={{color:"black"}}>Cancel Order</p>
                </Button>
              </Row>
            </Col>
          </PopoverBody>
        </Popover>


      </>
    );
  }
}

export default Popovers;