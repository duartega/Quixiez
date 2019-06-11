import React from "react";
import { Row, Col, Card, CardBody, Badge } from "reactstrap";
import Slide from "@material-ui/core/Slide";
import { badgeColor } from "./Types";
import { getTimePassedValue } from "./ChatBubbleTimeStampHelpers";

interface Props {
  badgeColor: badgeColor;
  badgeLabel: string;
  message: string;
  inverted?: boolean;
  conversationCreated: string;
}

interface State {
  // conversationCreated: number;
  conversationCreatedString: string;
}

export class ChatBubble extends React.Component<Props, State> {
  state = {
    // conversationCreated: 0,
    conversationCreatedString: ""
  };

  /**
   * Time Interval that updates the timer.
   */
  private timeInterval: number | NodeJS.Timeout | undefined;
  /**
   * The timeout value.
   *
   * Right now its every 60 seconds.
   */
  private intervalTime: number = 60000;

  setTimeAgo = (conversationCreated: string) => {
    let timePassed = getTimePassedValue(conversationCreated);
    this.setState({
      // conversationCreated: timePassed,
      conversationCreatedString: timePassed as string
    });
  };

  componentDidMount() {
    const { conversationCreated } = this.props;

    this.setTimeAgo(conversationCreated);

    this.timeInterval = setInterval(() => {
      this.setTimeAgo(conversationCreated);
    }, this.intervalTime);
  }

  componentWillUnmount() {
    this.timeInterval && clearInterval(this.timeInterval as number);
  }

  render() {
    const {
      badgeColor,
      badgeLabel,
      message,
      // timePassed,
      inverted
    } = this.props;
    const className = "timeline-panel our-timeline";
    return (
      <Slide direction="up" in={true} mountOnEnter>
        {/* <Row className="mx-xl-xl"> */}
        <Row className="mx-2">
          <Col>
            <Card className="card-timeline card-plain card-no-margin">
              <CardBody>
                <div className={inverted ? `${className}-inverted` : className}>
                  <div className="timeline-heading">
                    <Badge color={badgeColor} className="bubble-badge">
                      {badgeLabel}
                    </Badge>
                  </div>
                  <div className="timeline-body">
                    {/* this is to render new lines in text */}
                    {message.split("\n").map((i, idx) => (
                      <p key={idx}>
                        {i}
                        <br />
                      </p>
                    ))}
                  </div>
                  <h6>
                    <i className="ti-time" />
                    {this.state.conversationCreatedString}
                  </h6>
                </div>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Slide>
    );
  }
}
