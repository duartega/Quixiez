import React from "react";
import { Row, Col, Card, CardBody, Badge } from "reactstrap";

interface Props {
  badgeColor: "primary" | "info" | "success" | "warning" | "danger";
  badgeLabel: string;
  message: string;
  timePassed: string;
  inverted: boolean;
}

export const ChatBubble = (props: Props) => {
  const { badgeColor, badgeLabel, message, timePassed, inverted } = props;
  return (
    <Row className="mx-xl-xl">
      <Col>
        <Card className="card-timeline card-plain card-no-margin">
          <CardBody>
            <div
              className={
                inverted
                  ? "timeline-panel our-timeline-inverted"
                  : "timeline-panel our-timeline"
              }
            >
              <div className="timeline-heading">
                <Badge color={badgeColor} className="bubble-badge">
                  {badgeLabel}
                </Badge>
              </div>
              <div className="timeline-body">
                <p>{message}</p>
              </div>
              <h6>
                <i className="ti-time" />
                {timePassed} ago
              </h6>
            </div>
          </CardBody>
        </Card>
      </Col>
    </Row>
  );
};

// class ChatBubble extends React.Component<Props> {
//   render() {
//     const {
//       badgeColor,
//       badgeLabel,
//       message,
//       timePassed,
//       inverted
//     } = this.props;
//     return (
//       <Row className="mx-xl-xl">
//         <Col>
//           <Card className="card-timeline card-plain card-no-margin">
//             <CardBody>
//               <div
//                 className={
//                   inverted
//                     ? "timeline-panel our-timeline-inverted"
//                     : "timeline-panel our-timeline"
//                 }
//               >
//                 <div className="timeline-heading">
//                   <Badge color={badgeColor} className="bubble-badge">
//                     {badgeLabel}
//                   </Badge>
//                 </div>
//                 <div className="timeline-body">
//                   <p>{message}</p>
//                 </div>
//                 <h6>
//                   <i className="ti-time" />
//                   {timePassed} ago
//                 </h6>
//               </div>
//             </CardBody>
//           </Card>
//         </Col>
//       </Row>
//     );
//   }
// }
// export default ChatBubble;
