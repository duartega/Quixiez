import React from "react";

// reactstrap components
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardImg,
  CardTitle,
  ListGroupItem,
  ListGroup,
  Progress,
  Container,
  Row,
  Col
} from "reactstrap";

class Pricing extends React.Component {
  componentDidMount() {
    document.body.classList.toggle("pricing-page");
  }
  componentWillUnmount() {
    document.body.classList.toggle("pricing-page");
  }
  render() {
    const companies = this.props;
    // console.log(companies['companies']) // gets array of companies
    let c = companies['companies'];
    c.map((result) => console.log(result) ); // gets each company individually
    

    return (

        <div className="content ">
            {}
        <Row className="col-md-12"> 

            <Col lg="3" md="6">
              <Card className="card-pricing card-primary card-white" onClick={e => {
                  e.preventDefault();
                  console.log("clicked")
              }}>
              {/* <Button className="btn-round btn-just-icon" color="primary" onClick={e => {
                  e.preventDefault();
                  console.log("clicked")
              }}> */}
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
                  
                    Continue
                  
                </CardFooter>
                {/* </Button> */}
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
  }
}

export default Pricing;
