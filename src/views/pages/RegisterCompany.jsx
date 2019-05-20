import React from "react";
import { Redirect } from "react-router-dom";

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


    handleContinueCC = () =>
        // lets render the create company component
        this.setState({createCompany: true});
        

      handleContinueRFC = () => 
        // lets render the register for company component
        this.setState({registerForCompany: true});

  render() {
    if (!this.state.createCompany && !this.state.registerForCompany) {
    return (

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
                  <Button className="btn-round btn-just-icon" color="primary" onClick={this.handleContinueRFC}>
                    Continue
                  </Button>
                </CardFooter>
              </Card>
            </Col>

            <Col lg="3" md="6">
              <Card className="card-pricing card-secondary">
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
                  <Button className="btn-round btn-just-icon" color="primary" onClick={this.handleContinueCC}>
                    Continue
                  </Button>
                </CardFooter>
              </Card>
            </Col>
          </Row>
        </div>

    
    );
  } else if (this.state.createCompany){
      return ( <Redirect from='/registerCompany' to="/registerACompany" /> );
  } else if (this.state.registerForCompany) {
    console.log("This")
      return ( 
        <Redirect from='/registerCompany' to="/registerWithCompany" /> 
      ) }
 }
}

export default Widgets;
