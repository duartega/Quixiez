import React from "react";

// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  FormGroup,
  Form,
  Input,
  Row,
  Col
} from "reactstrap";

class User extends React.Component {
  render() {
    return (
      <>
        <div className="content">
          <Row >
            <Col md="8">
              <Card>
                <CardHeader >
                  <h2 className="title">Invite Employee</h2>
                </CardHeader>
                <CardBody>
                  <Form>
                    <Row>
                      <Col className="pr-md-1" md="4">
                        <FormGroup>
                          <label>Company (disabled)</label>
                          <Input
                            defaultValue="Joe's Crab Shack"
                            disabled
                            type="text"
                          />
                        </FormGroup>
                      </Col>
                      <Col className="pr-md-1" md="4">
                        <FormGroup>
                          <label>Employee Email</label>
                          <Input placeholder="employee@quixez.com" type="email" />
                        </FormGroup>
                      </Col>
                      <Col md="4">
                        <FormGroup>
                          <label>Employee Phone</label>
                          <Input
                            placeholder="123-456-7891"
                            type="text"
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col md="5">
                        <FormGroup>
                          <label>First Name</label>
                          <Input
                            placeholder="Joe"
                            type="text"
                          />
                        </FormGroup>
                      </Col>
                      <Col className="pr-md-1" md="4">
                        <FormGroup>
                          <label>Last Name</label>
                          <Input placeholder="Smith" type="text" />
                        </FormGroup>
                      </Col>
                      </Row>
                      
                  </Form>
                </CardBody>
                <CardFooter>
                  <Button className="btn-fill" color="success" type="submit">
                    Save
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

export default User;
