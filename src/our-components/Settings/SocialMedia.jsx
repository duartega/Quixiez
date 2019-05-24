import React from 'react';
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
  Col,
} from "reactstrap";

export class SocialMedia extends React.Component {

  render() {
    return (
      <div className="content">
            <Row className="mx-xl-xl">
              <Col md="8">
                <Card>
                  <CardHeader>
                    <h2 className="title">Social Media Links</h2>
                  </CardHeader>
                  <CardBody>
                    <Form>
                      <Row>
                        <Col className="pr-md-1" md="6">
                          <FormGroup>
                            <label>Facebook URL</label>
                            <Input
                              placeholder="www.facebook.com/"
                              defaultValue={this.state.facebook}
                              type="url"
                              name="facebook"
                              onChange={this.handleChange} />
                          </FormGroup>
                        </Col>
                        <Col className="pl-md-1" md="6">
                          <FormGroup>
                            <label>Instagram Username</label>
                            <Input
                              placeholder="www.instagram.com/"
                              defaultValue={this.state.instagram}
                              type="url"
                              name="instagram"
                              onChange={this.handleChange} />
                          </FormGroup>
                        </Col>
                      </Row>

                      <Row>
                        <Col className="pr-md-1" md="6">
                          <FormGroup>
                            <label>Twitter Username</label>
                            <Input
                              placeholder="www.twitter.com/"
                              defaultValue={this.state.twitter}
                              type="url"
                              name="twitter"
                              onChange={this.handleChange}
                            />
                          </FormGroup>
                        </Col>
                        <Col className="pl-md-1" md="6">
                          <FormGroup>
                            <label>Snapchat Username</label>
                            <Input
                              placeholder="@username"
                              defaultValue={this.state.snapchat}
                              type="url"
                              name="snapchat"
                              onChange={this.handleChange}
                            />
                          </FormGroup>
                        </Col>
                      </Row>
                    </Form>
                  </CardBody>
                  <CardFooter className="text-right">
                    <Button className="btn-fill" color="success" type="submit" onClick={this.handleCompanySocialMediaSave}>
                      Save
                  </Button>
                  </CardFooter>
                </Card>
              </Col>
            </Row>
          </div>
    )
  }
}