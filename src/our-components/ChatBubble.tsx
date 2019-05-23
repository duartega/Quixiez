import React from "react";
import { Row, Col, Card, CardBody, Badge } from "reactstrap";

interface Props {
  badgeColor: "primary" | "info" | "success" | "warning" | "danger";
  badgeLabel: string;
  message: string;
  timePassed: string;
}

class ChatBubble extends React.Component<Props> {
  render() {
    const { badgeColor, badgeLabel, message, timePassed } = this.props;
    return (
      <Row className="mx-xl-xl">
        <Col>
          <Card className="card-timeline  card-plain ">
            <CardBody>
              <div className="timeline-panel our-timeline-inverted">
                <div className="timeline-heading">
                  <Badge color={badgeColor}>{badgeLabel}</Badge>
                </div>
                <div className="timeline-body">
                  <p>{message}</p>
                </div>
                <h6>
                  <i className="ti-time" />
                  {timePassed} ago via quixiez
                </h6>
              </div>
            </CardBody>
          </Card>
        </Col>
      </Row>
    );
  }
}
export default ChatBubble;
