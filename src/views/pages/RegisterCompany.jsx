import React from "react";
// react plugin used to create switch buttons
import Switch from "react-bootstrap-switch";

// reactstrap components
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardImg,
  ListGroupItem,
  ListGroup,
  Row,
  Col,
} from "reactstrap";

class Widgets extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            createCompany: false,
            registerForCompany: false,
        }
        this.handleContinueCC = this.handleContinueCC.bind(this);
        this.handleContinueRFC = this.handleContinueRFC.bind(this);
    }


    handleContinueCC() {
        // lets render the create company component
    }

    handleContinueRFC() {
        // lets render the register for company component
    }

  render() {
    return (
      <>
        <div className="content ">
        <Row className="col-md-12"> 

            <Col lg="3" md="6">
              <Card className="card-pricing card-primary card-white">
                <CardBody>
                  <CardImg
                    alt="..."
                    src={require("assets/img/card-primary.png")}
                  />
                  <ListGroup>
                    <ListGroupItem>Are you registering for a company?</ListGroupItem>
                  </ListGroup>
                  
                </CardBody>
                <CardFooter className="text-center mb-3 mt-3">
                  <Button className="btn-round btn-just-icon" color="primary" onClick={this.handleContinueCC}>
                    Continue
                  </Button>
                </CardFooter>
              </Card>
            </Col>

            <Col lg="3" md="6">
              <Card className="card-pricing card-primary">
                <CardBody>
                  <CardImg
                    alt="..."
                    src={require("assets/img/card-primary.png")}
                  />
                  <ListGroup>
                    <ListGroupItem>Are you creating a company account?</ListGroupItem>
                  </ListGroup>
                  
                </CardBody>
                <CardFooter className="text-center mb-3 mt-3">
                  <Button className="btn-round btn-just-icon" color="primary" onClick={this.handleContinueRFC}>
                    Continue
                  </Button>
                </CardFooter>
              </Card>
            </Col>
          </Row>
        </div>
      </>
    );
  }
}

export default Widgets;
