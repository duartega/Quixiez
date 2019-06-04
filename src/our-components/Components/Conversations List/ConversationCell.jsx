// This is a dumb component for the conversation cell
// on the conversation list
import React from 'react';
import {Card, Row, Col, CardHeader, CardBody, Badge} from 'reactstrap';
import { read } from 'fs';

class ConversationCell extends React.Component {

  render() {
    const {props} = this.props;

    let readIndicator= props.unread;
    console.log("Unread: ", readIndicator)
    

    return ( <> <Row style={{marginLeft: "0px"}}>
      <Card className="card-timeline" style={{
        marginBottom: "0px",
        boxShadow: "0 0px 0px 0px rgba(0, 0, 0, 0)"
      }}>
        <ul
          className="timeline timeline-simple"
          style={{
          marginBottom: "0px",
          paddingBottom: "0px",
          paddingTop: "0px"
        }}>
          <li
            className="timeline-inverted"
            style={{
            marginBottom: "0px"
          }}>
            <div className="timeline-badge info">
              {props.firstInitial}
            </div>

            <div
              className="timeline-panel"
              style={{
              boxShadow: "0 0px 0px 0px rgba(0, 0, 0, 0)",
              float: "none",
              marginLeft: "auto",
              marginRight: "auto",
              marginBottom: "0px"
            }}>

              <div className="timeline-body">
                <CardHeader
                  style={{
                  paddingTop: "0px",
                  paddingLeft: "0px"
                }}>
                  <Row>
                    <Col>
                    {readIndicator ? <span className="newMessageDot"></span> : null}
                      {props.name}
                    </Col>
                    <h6>
                      <i className="ti-time"/> {props.time}
                    </h6>
                  </Row>
                </CardHeader>
                <CardBody>
                  <p>
                    {props.message}
                  </p>
                </CardBody>
              </div>
            </div>
          </li>
        </ul>
      </Card>
      <Card style={{backgroundColor: '#303245', marginBottom: "0px",
        boxShadow: "0 0px 0px 0px rgba(0, 0, 0, 0)"}} >
        <CardBody style={{padding: "2px"}}></CardBody> 
      </Card>
    </Row> </>
        );
    }
}

export default ConversationCell;