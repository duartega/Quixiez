import React from "react";
// react plugin used to create switch buttons
import Switch from "react-bootstrap-switch";
import { ChatBubble } from "../../our-components/ChatBubble";

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
  constructor() {
    super();
    this.showNormalBubble = false;
  }

  getNormalBubble = () =>
    this.showNormalBubble ? (
      <Row className="mx-xl-xl">
        <Col>
          <Card className="card-timeline  card-plain ">
            <CardBody>
              <ul className="timeline timeline-simple">
                {/* <ul className="our-timeline"> */}
                <li
                  className="timeline-inverted"
                  // style={{ backgroundColor: "red" }}
                >
                  {/** this will invert the message bubble if class name taken out */}
                  <div className="timeline-badge danger"> A </div>
                  {/** For first letter of the persons name */}
                  <div className="timeline-panel">
                    <div className="timeline-heading">
                      <Badge color="danger">Alexis</Badge>
                    </div>
                    <div className="timeline-body">
                      <p>
                        YES, I would like to also get a metal grinder. 1 ounce
                        of blue diesel and 3 grams of grape pie as well.
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
    ) : null;
  render() {
    return (
      <>
        <div className="content">
          {this.getNormalBubble()}
          <div style={{ backgroundColor: "blue" }}>
            <ChatBubble
              badgeColor="warning"
              badgeLabel="Gabe"
              message="A message"
              timePassed="10 hours"
              inverted
            />
            <ChatBubble
              badgeColor="info"
              badgeLabel="Joe"
              message="What's up Gabe?"
              timePassed="7 Days"
            />
            <ChatBubble
              badgeColor="info"
              badgeLabel="Joe"
              message="Hey Man Reply!"
              timePassed="7 Days"
            />
            <ChatBubble
              badgeColor="warning"
              badgeLabel="Gabe"
              message="Hey Joe"
              timePassed="7 Days"
              inverted
            />
          </div>
        </div>
      </>
    );
  }
}

export default Widgets;
