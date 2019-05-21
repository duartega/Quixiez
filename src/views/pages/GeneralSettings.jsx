import React from "react";
import { axiosPost, axiosGet } from "../../network/ApiCalls";
import { getAddress, getSocialMediaLinks } from "../../constants/routes";
import { connect } from "react-redux";
import { setCompanyUserJWT } from "../../redux/actions";
import Hours from "../pages/BusinessHours";

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
  Col,
  Label
} from "reactstrap";

class User extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      JWT: "",
      street: "",
      city: "",
      state: "",
      zip: "",
      showStreet: false,
      showCity: false,
      showState: false,
      showZip: false,
      addressID: "",
      facebook: "",
      snapchat: "",
      instagram: "",
      twitter: ""
    };
  }

  componentDidMount() {
    const jwt = this.props.companyUserReducer.jwt;
    axiosGet(getAddress, jwt)
      .then(result => {
        this.setState({
          street: result.data["street"],
          city: result.data["city"],
          state: result.data["state"],
          zip: result.data["zip"],
          showStreet: result.data["showStreet"],
          showCity: result.data["showCity"],
          showState: result.data["showState"],
          showZip: result.data["showZip"]
        });
      })
      .catch(err => {
        console.log(err, err.response);
      });
    axiosGet(getSocialMediaLinks, jwt)
      .then(result => {
        this.setState({
          facebook: result.data["facebookUrl"],
          twitter: result.data["twitterUsername"],
          snapchat: result.data["snapChatUsername"],
          instagram: result.data["instagramUsername"]
        });
      })
      .catch(err => {
        console.log(err, err.response);
      });
  }

  render() {
    return (
      <>
        <div className="content">
          <Row className="mx-xl-xl">
            <Col md="8">
              <Card>
                <CardHeader>
                  <h2 className="title">Company Overview</h2>
                </CardHeader>
                <CardBody>
                  <Form>
                    <Row>
                      <Col className="pr-md-1" md="5">
                        <FormGroup>
                          <label>Company</label>
                          <Input defaultValue="Joe's Crab Shack" type="text" />
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
                          <Input
                            defaultValue="support@quixez.com"
                            type="email"
                          />
                        </FormGroup>
                      </Col>
                      <Col className="pl-md-1" md="6">
                        <FormGroup>
                          <label>Business Website</label>
                          <Input defaultValue="www.quixiez.com" type="url" />
                        </FormGroup>
                      </Col>
                    </Row>
                  </Form>
                </CardBody>
                <CardFooter className="text-right">
                  <Button className="btn-fill" color="success" type="submit">
                    Save
                  </Button>
                </CardFooter>
              </Card>
            </Col>
          </Row>
        </div>

        <div>
          <Row className="mx-xl-xl">
            <Col md="8">
              <Card>
                <CardHeader>
                  <h2 className="title">Company Address</h2>
                </CardHeader>
                <CardBody>
                  <Form>
                    <Row>
                      <Col className="px-md-3" md="12">
                        <FormGroup>
                          <label>Company Address</label>
                          <Input defaultValue={this.state.street} type="text" />
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col className="pr-md-1" md="4">
                        <FormGroup>
                          <label>City</label>
                          <Input defaultValue={this.state.city} type="text" />
                        </FormGroup>
                      </Col>
                      <Col className="px-md-1" md="4">
                        <FormGroup>
                          <label>State</label>
                          <Input defaultValue={this.state.state} type="text" />
                        </FormGroup>
                      </Col>
                      <Col className="pl-md-1" md="4">
                        <FormGroup>
                          <label>Postal Code</label>
                          <Input defaultValue={this.state.zip} type="number" />
                        </FormGroup>
                      </Col>
                    </Row>
                  </Form>
                </CardBody>
                <CardFooter className="text-right">
                  <Button className="btn-fill" color="success" type="submit">
                    Save
                  </Button>
                </CardFooter>
              </Card>
            </Col>
          </Row>
        </div>
        <div>
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
                          />
                        </FormGroup>
                      </Col>
                      <Col className="pl-md-1" md="6">
                        <FormGroup>
                          <label>Instagram Username</label>
                          <Input
                            placeholder="www.instagram.com/"
                            defaultValue={this.state.instagram}
                            type="url"
                          />
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
                          />
                        </FormGroup>
                      </Col>
                      {/* <FormGroup radio>
                          <Label radio>
                            <Input type="radio" />
                            <span className="form-radio-sign" />
                            Unchecked
                        </Label>
                        </FormGroup> */}
                    </Row>
                  </Form>
                </CardBody>
                <CardFooter className="text-right">
                  <Button className="btn-fill" color="success" type="submit">
                    Save
                  </Button>
                </CardFooter>
              </Card>
            </Col>
          </Row>
        </div>
        <Hours />
      </>
    );
  }
}

const mapStateToProps = ({ companyUserReducer }) => ({ companyUserReducer });

const mapDispatchToProps = dispatch => {
  return {
    setCompanyUserJWT: jwt => dispatch(setCompanyUserJWT(jwt))
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(User);

// export default User;
