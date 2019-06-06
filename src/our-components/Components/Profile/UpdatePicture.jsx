import React from 'react';
import { Row, Col, Card, CardBody, Button } from 'reactstrap';
import ReactBSAlert from "react-bootstrap-sweetalert";

export class Picture extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      DL_Image: null
    };
  };



  render() {
    return (
      <Row>
        <Col className="ml-auto" md="3">
          <Card>
            <CardBody className="text-center">
              <Button className="btn-fill" color="info" onClick={this.inputAlert}>
                Try me!
              </Button>
            </CardBody>
          </Card>
        </Col>
      </Row>
    );
  };
}
