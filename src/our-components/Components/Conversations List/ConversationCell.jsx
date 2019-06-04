// This is a dumb component for the conversation cell
// on the conversation list
import React from 'react';
import { Card, Row, Col, CardHeader, CardBody } from 'reactstrap';

class ConversationCell extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      rowColor: "",
      active: false
    };
  }

  render() {
    const {props} = this.props;
    let readIndicator = props.unread;    

    return ( <> 
      <Card className="card-cell" style={{
        background: this.state.active ? "orange": "", 
        marginBottom: "0px",
        boxShadow: "0 0px 0px 0px rgba(0, 0, 0, 0)"
      }}> 
      <Row style={{marginLeft: "0px"}} onClick={() => { this.props.renderConvo(props.id); this.setState({active: true})}}>

          <Row className="messageListContainer">
              <div className="nameCircle">
                {props.firstInitial}
              </div>
          </Row>

          {/** right side of messagelist */}
          <Col >
            <Row style={{ paddingTop: "30px", marginRight: "15px"}}>
                    <Col md="7" >
                    {readIndicator ? <span className="newMessageDot"></span> : null}
                      <p>
                        {props.name}
                      </p>
                    </Col>
                    <Col md="5" style={{paddingRight: "0px", textAlign: "right"}}>
                      <i className="ti-time"/> {props.time}
                    </Col>
                  </Row>
                <Row>
                  <CardBody style={{
                    paddingTop: "0px",
                    paddingLeft: "15px"
                  }}>
                    <p>
                      {props.message}
                    </p>
                  </CardBody>
                </Row>
        </Col>
        </Row>
      </Card>
      {/** row seperator */}
      <Card style={{backgroundColor: '#303245', marginBottom: "0px",
        boxShadow: "0 0px 0px 0px rgba(0, 0, 0, 0)"}} >
        <CardBody style={{padding: "2px"}}></CardBody> 
      </Card>
     </>
        );
    }
}

export default ConversationCell;