import React from "react";
import { axiosPost, axiosGet, axiosPut } from '../../network/ApiCalls';
import { getAddress, getSocialMediaLinks, putSocialMediaLinks, putAddress } from '../../constants/routes';
import { connect } from 'react-redux';
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
      quixiezNumber: "",
      businessNumber: "",
      businessEmail: "",
      businessWebsite: "",
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
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleCompanyOverviewSave = this.handleCompanyOverviewSave.bind(this);
    this.handleCompanyAddressSave = this.handleCompanyAddressSave.bind(this);
    this.handleCompanySocialMediaSave = this.handleCompanySocialMediaSave.bind(this);
  }

  componentDidMount() {
    const jwt = this.props.companyUserReducer.jwt;
    this.setState({companyName: this.props.companyUserReducer.companyName });
    axiosGet(getAddress, jwt).then(result => {
      this.setState({
        street: result.data['street'],
        city: result.data['city'],
        state: result.data['state'],
        zip: result.data['zip'],
        showStreet: result.data['showStreet'],
        showCity: result.data['showCity'],
        showState: result.data['showState'],
        showZip: result.data['showZip'],
      })
    }).catch(err => {
      console.log(err, err.response)
    })
    axiosGet(getSocialMediaLinks, jwt).then(result => {
      this.setState({
        facebook: result.data['facebookUrl'],
        twitter: result.data['twitterUsername'],
        snapchat: result.data['snapChatUsername'],
        instagram: result.data['instagramUsername'],
      })
    }).catch(err => {
      console.log(err, err.response)
    })
  };

  handleChange = event =>
    this.setState({ [event.target.name]: event.target.value });
    
  handleCompanyAddressSave() {
    const { street, city, state, zip, showStreet, showCity, showState, showZip } = this.state
    const jwt = this.props.companyUserReducer.jwt;
    axiosPut(putAddress, { street, city, state, zip, showStreet, showCity, showState, showZip }, jwt).then(result => {
      console.log(result);
    }).catch(err => {
      console.log(err, err.response);
    });
  }

  handleCompanyOverviewSave() {

  }

  handleCompanySocialMediaSave() {
    const facebookUrl = this.state.facebook;
    const twitterUsername = this.state.twitter;
    const snapChatUsername = this.state.snapchat;
    const instagramUsername = this.state.instagram;

    // lets create a bool that lets us know if the field has changed so the user doesnt spam the save button
    const jwt = this.props.companyUserReducer.jwt;
    axiosPut(putSocialMediaLinks, { facebookUrl, twitterUsername, snapChatUsername, instagramUsername }, jwt).then(result => {
      console.log(result)
    }).catch(err => {
      console.log(err, err.response)
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
                          <Input
                            defaultValue={this.state.companyName}
                            type="text"
                            name="companyName" onChange={this.handleChange}
                          />
                        </FormGroup>
                      </Col>
                      <Col className="px-md-1" md="3">
                        <FormGroup>
                          <label>Quixiez Number</label>
                          {/* should change to number */}
                          <Input defaultValue="123-456-7899" type="text" name="quixiezNumber" onChange={this.handleChange}/>
                        </FormGroup>
                      </Col>
                      <Col className="pl-md-1" md="4">
                        <FormGroup>
                          <label>Bussiness Number</label>
                          <Input defaultValue="541-703-3114" type="text" name="businessNumber" onChange={this.handleChange}/>
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col className="pr-md-1" md="6">
                        <FormGroup>
                          <label>Business Email</label>
                          <Input defaultValue="support@quixez.com" type="email" name="businessEmail" onChange={this.handleChange}/>
                        </FormGroup>
                      </Col>
                      <Col className="pl-md-1" md="6">
                        <FormGroup>
                          <label>Business Website</label>
                          <Input defaultValue="www.quixiez.com" type="url" name="businessWebsite" onChange={this.handleChange}/>
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
                          <Input
                            defaultValue={this.state.street}
                            type="text"
                            name="street" onChange={this.handleChange}
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col className="pr-md-1" md="4">
                        <FormGroup>
                          <label>City</label>
                          <Input defaultValue={this.state.city} type="text" name="city" onChange={this.handleChange}/>
                        </FormGroup>
                      </Col>
                      <Col className="px-md-1" md="4">
                        <FormGroup>
                          <label>State</label>
                          <Input defaultValue={this.state.state} type="text" name="state" onChange={this.handleChange}/>
                        </FormGroup>
                      </Col>
                      <Col className="pl-md-1" md="4">
                        <FormGroup>
                          <label>Postal Code</label>
                          <Input defaultValue={this.state.zip} type="number" name="zip" onChange={this.handleChange}/>
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
                  <Button className="btn-fill" color="success" type="submit" onClick={this.handleCompanySocialMediaSave}>
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
