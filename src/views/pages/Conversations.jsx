import React from "react";
// react plugin used to create switch buttons
import Switch from "react-bootstrap-switch";

// reactstrap components
import {
  Badge,
  Button,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  CardImg,
  CardTitle,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
  Label,
  FormGroup,
  Input,
  ListGroupItem,
  ListGroup,
  Table,
  Row,
  Col,
  UncontrolledTooltip
} from "reactstrap";

class Widgets extends React.Component {
  render() {
    return (
      <>
        <div className="content">
          <Row className="mx-xl-xl">
            <Col lg="3" >
              <Card className="card-timeline  card-plain ">
                <CardBody>
                  <ul className="timeline timeline-simple">
                    <li className="timeline-inverted" style={{backgroundColor: "red"}}> {/** this will invert the message bubble if class name taken out */}
                      <div className="timeline-badge danger"> A </div> {/** For first letter of the persons name */}
                      <div className="timeline-panel">
                        <div className="timeline-heading">
                          <Badge color="danger">Alexis</Badge>
                        </div>
                        <div className="timeline-body">
                          <p>
                            YES, I would like to also get a metal grinder.
                            1 ounce of blue diesel and 3 grams of grape pie as well.
                          </p>
                        </div>
                        <h6>
                          <i className="ti-time" />
                          11 hours ago via quixiez
                        </h6>
                      </div>
                    </li>
                    
                  </ul>
                </CardBody>
              </Card>
            </Col>
            </Row>

            <Row className="mx-xl-xl">
            <Col lg="6" > 

              <Card className="card-timeline  card-plain  ">
                <CardBody >
                  <ul className="timeline">
                    <li className=""> {/** this will invert the message bubble if class name taken out */}
                      <div className="timeline-badge success"> B </div> {/** For first letter of the persons name */}
                      <div className="timeline-panel">
                        <div className="timeline-heading">
                          <Badge color="success">Bot</Badge>
                        </div>
                        <div className="timeline-body">
                          <p>
                            YES, I would like to also get a metal grinder.
                            1 ounce of blue diesel and 3 grams of grape pie as well.
                          </p>
                        </div>
                        <h6>
                          <i className="ti-time" />
                          11 hours ago via quixiez
                        </h6>
                      </div>
                    </li>
                    <li>
                      <div className="timeline-badge info"> J </div>
                      <div className="timeline-panel">
                        <div className="timeline-heading">
                          <Badge color="info">Joe</Badge>
                        </div>
                        <div className="timeline-body">
                          <p>
                            Great! We will add that to your order. Would you like to order anything else?
                            Text YES or CANCEL or SUBMIT ORDER.
                          </p>
                        </div>
                      </div>
                    </li>
                  </ul>
                </CardBody>
              </Card>
            </Col>
          </Row>

        </div>
      </>
    );
  }
}

export default Widgets;
