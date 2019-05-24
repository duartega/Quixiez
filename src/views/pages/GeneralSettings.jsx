import React from "react";
import { axiosPost, axiosGet, axiosPut } from '../../network/ApiCalls';
import {
  getAddress,
  getSocialMediaLinks,
  putSocialMediaLinks,
  putAddress,
  getCompanyInfo,
  putCompanyInfo
} from '../../constants/routes';
import { connect } from 'react-redux';
import { setCompanyUserJWT } from "../../redux/actions";
import Hours from "../pages/BusinessHours";
import ReactBSAlert from "react-bootstrap-sweetalert";

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
  Label,
} from "reactstrap";

class User extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      JWT: "",
      quixiezNumber: "",
      phoneNumber: "",
      email: "",
      websiteUrl: "",
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
      twitter: "",
      companyName: "",
      alert: "",
      hasInfoChanged: false,
      method: "",
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleCheck = this.handleCheck.bind(this);
    this.handleCompanyOverviewSave = this.handleCompanyOverviewSave.bind(this);
    this.handleCompanyAddressSave = this.handleCompanyAddressSave.bind(this);
    this.handleCompanySocialMediaSave = this.handleCompanySocialMediaSave.bind(this);
  }


  componentDidMount() {
    const jwt = this.props.companyUserReducer.jwt;
    this.setState({ companyName: this.props.companyUserReducer.companyName });

    // Get address information for the settings page
    axiosGet(getAddress, jwt).then(result => {
      const { data } = result;
      delete data.created; delete data.updated;
      this.setState({ ...data })
    }).catch(err => {
      console.log(err, err.response)
    })

    // Get social media information for the settings page
    axiosGet(getSocialMediaLinks, jwt).then(socialMedia => {
      this.setState({
        facebook: socialMedia.data['facebookUrl'],
        twitter: socialMedia.data['twitterUsername'],
        snapchat: socialMedia.data['snapChatUsername'],
        instagram: socialMedia.data['instagramUsername'],
      })
    }).catch(err => {
      console.log(err, err.response)
    })

    // Get company information such as number and email for the settings page
    axiosGet(getCompanyInfo, jwt).then(result => {
      const { data } = result;
      console.log(data)
      delete data.created; delete data.updated; delete data.id; delete data.companyName;
      this.setState({ ...data })
    }).catch(err => {
      console.log(err, err.response)
    })
  };

  handleChange = event => {
    if (event.target.name === "showStreet") {
      if (this.state.showStreet) { this.setState({ [event.target.name]: event.target.checked, hasInfoChanged: true }) }
      else if (!this.state.showStreet) { this.setState({ [event.target.name]: event.target.checked, hasInfoChanged: true }) };
    } else {
      this.setState({ [event.target.name]: event.target.value, hasInfoChanged: true });
    }
  }
  handleCheck = event =>
    console.log(event)

  handleCompanyAddressSave() {
    const { street, city, state, zip, showStreet, showCity, showState, showZip } = this.state
    const jwt = this.props.companyUserReducer.jwt;
    console.log("submitted: ", showStreet)

    if (this.state.hasInfoChanged) {
      axiosPut(putAddress, { street, city, state, zip, showStreet, showCity, showState, showZip }, jwt).then(result => {
        // console.log(result);
        this.setState({ alert: "success" });
      }).catch(err => {
        this.setState({ alert: "failed" })
        console.log(err, err.response);
      });
      this.setState({ hasInfoChanged: false });
    } else {
      this.setState({ alert: "warning" });
    }


  }

  handleCompanyOverviewSave() {
    const { quixiezNumber, phoneNumber, email, websiteUrl } = this.state
    const jwt = this.props.companyUserReducer.jwt;

    if (this.state.hasInfoChanged) {
      axiosPut(putCompanyInfo, { quixiezNumber, phoneNumber, email, websiteUrl }, jwt).then(result => {
        this.setState({ alert: "success" });
      }).catch(err => {
        this.setState({ alert: "failed" })
        console.log(err, err.response)
      });
      this.setState({ hasInfoChanged: false });
    } else {
      this.setState({ alert: "warning" });
    }

  }

  handleCompanySocialMediaSave() {
    const facebookUrl = this.state.facebook;
    const twitterUsername = this.state.twitter;
    const snapChatUsername = this.state.snapchat;
    const instagramUsername = this.state.instagram;

    // lets create a bool that lets us know if the field has changed so the user doesnt spam the save button
    const jwt = this.props.companyUserReducer.jwt;

    if (this.state.hasInfoChanged) {
      axiosPut(putSocialMediaLinks, { facebookUrl, twitterUsername, snapChatUsername, instagramUsername }, jwt).then(result => {
        this.setState({ alert: "success" });
      }).catch(err => {
        this.setState({ alert: "failed" })
        console.log(err, err.response)
      });
      this.setState({ hasInfoChanged: false });
    } else {
      this.setState({ alert: "warning" });
    }
  }

  hideAlert = () =>
    this.setState({ alert: "" })

  render() {
    if (this.state.alert === "") {
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
                            <Input
                              defaultValue={this.state.companyName}
                              type="text"
                              name="companyName" onChange={this.handleChange}
                              placeholder="No Company Name Set"
                            />
                          </FormGroup>
                        </Col>
                        <Col className="px-md-1" md="3">
                          <FormGroup>
                            <label>Quixiez Number</label>
                            {/* should change to number */}
                            <Input placeholder="No Phone Number Set" defaultValue={this.state.quixiezNumber} type="text" name="quixiezNumber" onChange={this.handleChange} />
                          </FormGroup>
                        </Col>
                        <Col className="pl-md-1" md="4">
                          <FormGroup>
                            <label>Bussiness Number</label>
                            <Input placeholder="No Phone Number Set" defaultValue={this.state.phoneNumber} type="text" name="phoneNumber" onChange={this.handleChange} />
                          </FormGroup>
                        </Col>
                      </Row>
                      <Row>
                        <Col className="pr-md-1" md="6">
                          <FormGroup>
                            <label>Business Email</label>
                            <Input placeholder="No Email Set" defaultValue={this.state.email} type="email" name="email" onChange={this.handleChange} />
                          </FormGroup>
                        </Col>
                        <Col className="pl-md-1" md="6">
                          <FormGroup>
                            <label>Business Website</label>
                            <Input placeholder="No Website Set" defaultValue={this.state.websiteUrl} type="url" name="websiteUrl" onChange={this.handleChange} />
                          </FormGroup>
                        </Col>
                      </Row>
                    </Form>
                  </CardBody>
                  <CardFooter className="text-right">
                    <Button className="btn-fill" color="success" type="submit" onClick={this.handleCompanyOverviewSave}>
                      Save
                  </Button>
                  </CardFooter>
                </Card>
              </Col>
            </Row>
          </div>

          <div className="content">
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
                            <Input
                              defaultValue={this.state.street}
                              type="text"
                              name="street" onChange={this.handleChange}
                              placeholder="No Address Set"
                            />
                          </FormGroup>
                        </Col>
                      </Row>
                      <Row>
                        <Col className="pr-md-1" md="4">
                          <FormGroup>
                            <label>City</label>
                            <Input placeholder="No City Set" defaultValue={this.state.city} type="text" name="city" onChange={this.handleChange} />
                          </FormGroup>
                        </Col>
                        <Col className="px-md-1" md="4">
                          <FormGroup>
                            <label>State</label>
                            <Input placeholder="No State Set" defaultValue={this.state.state} type="text" name="state" onChange={this.handleChange} />
                          </FormGroup>
                        </Col>
                        <Col className="pl-md-1" md="4">
                          <FormGroup>
                            <label>Postal Code</label>
                            <Input placeholder="No Postal Code Set" defaultValue={this.state.zip} type="number" name="zip" onChange={this.handleChange} />
                          </FormGroup>
                        </Col>
                        <Col className="pl-md-3" md="4">
                          <FormGroup check>
                            <Label check>
                              <Input defaultChecked={this.state.showStreet} type="checkbox" value={this.state.showStreet} name="showStreet" onChange={this.handleChange}  />
                              <span className="form-check-sign" />
                              Show Street Address?
                            </Label>
                          </FormGroup>
                        </Col>
                      </Row>
                    </Form>
                  </CardBody>
                  <CardFooter className="text-right">
                    <Button className="btn-fill" color="success" type="submit" onClick={this.handleCompanyAddressSave}>
                      Save
                  </Button>
                  </CardFooter>
                </Card>
              </Col>
            </Row>
          </div>
          {/* <div className="content">
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
          </div> */}
          {/* <Hours /> */}
        </>
      );
    } else if (this.state.alert === "success") {
      return (
        <div>
          <div className="places-sweet-alerts">

            <Row className="mt-5">

              <ReactBSAlert
                success
                style={{ display: "block", marginTop: "-100px" }}
                title="Information saved successfully!"
                onConfirm={() => this.hideAlert()}
                onCancel={() => this.hideAlert()}
                confirmBtnBsStyle="success"
                btnSize=""
              >
              </ReactBSAlert>

            </Row>
          </div>
        </div>
      )
    } else if (this.state.alert === "failed") {
      return (
        <div>
          <div className="places-sweet-alerts">

            <Row className="mt-5">

              <ReactBSAlert
                danger
                style={{ display: "block", marginTop: "-100px" }}
                title="Information failed to save! Please try again in a few moments."
                onConfirm={() => this.hideAlert()}
                onCancel={() => this.hideAlert()}
                confirmBtnBsStyle="danger"
                btnSize=""
              >
              </ReactBSAlert>

            </Row>
          </div>
        </div>
      )
    } else if (this.state.alert === "warning") {
      return (
        <div>
          <div className="places-sweet-alerts">

            <Row className="mt-5">

              <ReactBSAlert
                warning
                style={{ display: "block", marginTop: "-100px" }}
                title="You have not updated your information! Please modify your information to save."
                onConfirm={() => this.hideAlert()}
                onCancel={() => this.hideAlert()}
                confirmBtnBsStyle="warning"
                btnSize=""
              >
              </ReactBSAlert>

            </Row>
          </div>
        </div>
      )
    }
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
