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
                  <h2 className="title">General Settings</h2>
                </CardHeader>
                <CardBody>
                  <Form>
                    <Row>
                      <Col className="pr-md-1" md="5">
                        <FormGroup>
                          <label>Company (disabled)</label>
                          <Input
                            defaultValue="Joe's Crab Shack"
                            disabled
                            type="text"
                          />
                        </FormGroup>
                      </Col>
                      <Col className="px-md-1" md="3">
                        <FormGroup>
                          <label>Quixiez Number</label>
                          {/* should change to number */}
                          <Input defaultValue="123-456-7899" type="text" /> 
                        </FormGroup>
                      </Col>
                      <Col className="pl-md-1" md="4">
                        <FormGroup>
                          <label>Bussiness Number</label>
                          <Input defaultValue="541-703-3114" type="text" />
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col className="pr-md-1" md="6">
                        <FormGroup>
                          <label>Business Email</label>
                          <Input defaultValue="support@quixez.com" type="email" />
                        </FormGroup>
                      </Col>
                      <Col className="pl-md-1" md="6">
                        <FormGroup>
                          <label>Business Website</label>
                          <Input defaultValue="www.quixiez.com" type="url" />
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col md="12">
                        <FormGroup>
                          <label>Company Address</label>
                          <Input
                            defaultValue="123 Test Street"
                            placeholder="Business Address"
                            type="text"
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col className="pr-md-1" md="4">
                        <FormGroup>
                          <label>City</label>
                          <Input defaultValue="Rohnert Park" type="text" />
                        </FormGroup>
                      </Col>
                      <Col className="px-md-1" md="4">
                        <FormGroup>
                          <label>State</label>
                          <Input defaultValue="CA" type="text" />
                        </FormGroup>
                      </Col>
                      <Col className="pl-md-1" md="4">
                        <FormGroup>
                          <label>Postal Code</label>
                          <Input placeholder="94928" type="number" />
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                    <Col className="pr-md-1" md="4">
                        <FormGroup>
                          <label>Facebook</label>
                          <Input placeholder="www.facebook.com/" type="url" />
                        </FormGroup>
                      </Col>
                      <Col className="pl-md-1" md="4">
                        <FormGroup>
                          <label>Instagram</label>
                          <Input placeholder="www.instagram.com/" type="url" />
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                    <Col className="pr-md-1" md="4">
                        <FormGroup>
                          <label>Twitter</label>
                          <Input placeholder="www.twitter.com/" type="url" />
                        </FormGroup>
                      </Col>
                      <Col className="pl-md-1" md="4">
                        <FormGroup>
                          <label>Snapchat</label>
                          <Input placeholder="@username" type="url" />
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
