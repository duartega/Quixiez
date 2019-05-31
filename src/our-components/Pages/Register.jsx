import React from "react";
import Axios from "axios";
import { getCompanyId, register } from "../../network/routes.ts";
import { connect } from "react-redux";
import { setCompanyUserID } from "../../redux/actions";
import { Redirect } from "react-router-dom";
import { Logo } from "../Components/Logo";

// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  CardImg,
  CardTitle,
  Label,
  FormGroup,
  Form,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Container,
  Row,
  Col
} from "reactstrap";

class Register extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      confirmPassword: "",
      firstName: "",
      lastName: "",
      phoneNumber: "",
      Company: "",
      id: "",
      validCompany: false,
      companyUserId: "",
      readyToSubmit: false,
      wrongPassword: false,
      emptyEmail: false,
      emptyfirstName: false,
      emptylastName: false,
      emptyphoneNumber: false,
      emptyPassword: false,
      emptyConfirmPassword: false,
      registerErrorMessage: "",
      passwordErrorMesssage: "",
      passwordsMatch: false
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleCompany = this.handleCompany.bind(this);
    this.isCompanyValid = this.isCompanyValid.bind(this);
  }

  componentDidMount() {
    document.body.classList.toggle("register-page");
  }
  componentWillUnmount() {
    document.body.classList.toggle("register-page");
  }

  handleChange(event) {
    const {
      email,
      password,
      confirmPassword,
      phoneNumber,
      firstName,
      lastName
    } = this.state;
    this.setState({ [event.target.name]: event.target.value });
    if (phoneNumber !== "") {
      this.setState({ emptyphoneNumber: false });
    }
    if (firstName !== "") {
      this.setState({ emptyfirstName: false });
    }
    if (lastName !== "") {
      this.setState({ emptylastName: false });
    }
    if (email !== "") {
      this.setState({ emptyEmail: false });
    }
    if (password !== "") {
      this.setState({ wrongPassword: false });
    }
    if (confirmPassword !== "") {
      this.setState({ emptyConfirmPassword: false });
    }

    if (password === confirmPassword) {
      this.setState({
        wrongPassword: false,
        passwordsMatch: true,
        passwordErrorMesssage: ""
      })
    }
  }

  handleSubmit(event) {
    const {
      email,
      password,
      confirmPassword,
      phoneNumber,
      firstName,
      lastName
    } = this.state;

    if (phoneNumber === "") {
      this.setState({ emptyphoneNumber: true });
    }
    if (firstName === "") {
      this.setState({ emptyfirstName: true });
    }
    if (lastName === "") {
      this.setState({ emptylastName: true });
    }
    if (email === "") {
      this.setState({ emptyEmail: true });
    }
    if (password === "") {
      this.setState({ emptyPassword: true });
    }
    if (confirmPassword === "") {
      this.setState({ emptyConfirmPassword: true });
    }

    if (password !== confirmPassword) {
      this.setState({
        wrongPassword: true,
        passwordErrorMesssage: "Passwords do not match",
        passwordsMatch: false
      });
    } else if (
      (email || password || confirmPassword || phoneNumber || firstName || lastName) !== "") {
      Axios.post(register, {
        email,
        password,
        firstName,
        lastName,
        phoneNumber
      })
        .then(result => {
          this.setState({ readyToSubmit: true });
          this.props.setCompanyUserID(result.data.id);
        })
        .catch(err => {
          if (err.response.status === 400) {
            this.setState({ errorCodeEmail: true });
          }
          console.log("err: ", err.response);
          this.setState({ registerErrorMessage: err.response.data.error });
        });
    }
  }

  handleCompany(companyName) {
    if (companyName.length > 1) {
      Axios.get(getCompanyId + companyName)
        .then(result => {
          this.setState({ id: result.data[0]["id"] });
        })
        .catch(err => {
          console.log(err.response);
        });
    }
    this.setState({ Company: companyName });
  }

  isCompanyValid = TrueOrFalse => this.setState({ end: TrueOrFalse });

  render() {
    let wrongPass,
      empty_email,
      empty_firstName,
      empty_lastName,
      empty_phoneNumber = "";
    let error = "has-danger form-group";
    // Highlight the fields if they are not filled or incorrect
    if (this.state.wrongPassword) {
      wrongPass = error;
    } else {
      wrongPass = "";
    }
    if (this.state.emptyEmail) {
      empty_email = error;
    } else {
      empty_email = "";
    }
    if (this.state.emptyfirstName) {
      empty_firstName = error;
    } else {
      empty_firstName = "";
    }
    if (this.state.emptylastName) {
      empty_lastName = error;
    } else {
      empty_lastName = "";
    }
    if (this.state.emptyphoneNumber) {
      empty_phoneNumber = error;
    } else {
      empty_phoneNumber = "";
    }
    if (this.state.emptyPassword) {
      wrongPass = error;
    } else {
      wrongPass = "";
    }
    if (this.state.emptyConfirmPassword) {
      wrongPass = error;
    } else {
      wrongPass = "";
    }

    let registerErrorMessage,
      passwordErrorMesssage = "";
    if (this.state.registerErrorMessage !== "") {
      registerErrorMessage = this.state.registerErrorMessage;
      empty_email = error;
    } else {
      registerErrorMessage = "";
    }

    if (this.state.passwordErrorMesssage !== "") {
      passwordErrorMesssage = this.state.passwordErrorMesssage;
      wrongPass = error;
    } else {
      passwordErrorMesssage = "";
    }

    if (this.state.readyToSubmit === false) {
      return (
        <>
          {/* <div className="content"> */}
          <div className="vh-100 align-items-center d-flex">
            <Container>
              <Row>
                <Col className="ml-auto" md="5">
                  <div className="info-area info-horizontal mt-5">
                    <div className="icon icon-warning">
                      <i className="tim-icons icon-wifi" />
                    </div>
                    <div className="description">
                      <h3 className="info-title">Marketing</h3>
                      <p className="description">
                        We've created the marketing campaign of the website. It
                        was a very interesting collaboration.
                      </p>
                    </div>
                  </div>
                  <div className="info-area info-horizontal">
                    <div className="icon icon-primary">
                      <i className="tim-icons icon-triangle-right-17" />
                    </div>
                    <div className="description">
                      <h3 className="info-title">Fully Coded in HTML5</h3>
                      <p className="description">
                        We've developed the website with HTML5 and CSS3. The
                        client has access to the code using GitHub.
                      </p>
                    </div>
                  </div>
                  <div className="info-area info-horizontal">
                    <div className="icon icon-info">
                      <i className="tim-icons icon-trophy" />
                    </div>
                    <div className="description">
                      <h3 className="info-title">Built Audience</h3>
                      <p className="description">
                        There is also a Fully Customizable CMS Admin Dashboard
                        for this product.
                      </p>
                    </div>
                  </div>
                </Col>
                <Col className="mr-auto" md="7">
                  <Card className="card-register card-white">
                    <CardHeader>
                      <CardTitle tag="h4" style={{ color: "#344675" }}>
                        Register <Logo />
                      </CardTitle>
                    </CardHeader>
                    <CardBody>
                      <Form className="form">
                        <div className={empty_email}>
                          <InputGroup>
                            {" "}
                            {/** email input field */}
                            <InputGroupAddon addonType="prepend">
                              <InputGroupText>
                                <i className="tim-icons icon-email-85" />
                              </InputGroupText>
                            </InputGroupAddon>
                            <Input
                              placeholder="email*"
                              name="email"
                              onChange={this.handleChange}
                              type="email"
                            />
                          </InputGroup>
                        </div>
                        {registerErrorMessage}
                        <div className={wrongPass}>
                          <InputGroup>
                            {" "}
                            {/** password input field */}
                            <InputGroupAddon addonType="prepend">
                              <InputGroupText>
                                <i className="tim-icons icon-lock-circle" />
                              </InputGroupText>
                            </InputGroupAddon>
                            <Input
                              placeholder="password*"
                              name="password"
                              onChange={this.handleChange}
                              type="password"
                            />
                          </InputGroup>
                        </div>
                        {passwordErrorMesssage}
                        <div className={wrongPass}>
                          <InputGroup>
                            {" "}
                            {/** confirm password input field */}
                            <InputGroupAddon addonType="prepend">
                              <InputGroupText>
                                <i className="tim-icons icon-lock-circle" />
                              </InputGroupText>
                            </InputGroupAddon>
                            <Input
                              placeholder="confirm password*"
                              name="confirmPassword"
                              onChange={this.handleChange}
                              type="password"
                            />
                          </InputGroup>
                        </div>
                        {passwordErrorMesssage}
                        <div className={empty_firstName}>
                          <InputGroup>
                            {" "}
                            {/** First name input field */}
                            <InputGroupAddon addonType="prepend">
                              <InputGroupText>
                                <i className="tim-icons icon-single-02" />
                              </InputGroupText>
                            </InputGroupAddon>
                            <Input
                              placeholder="First Name*"
                              name="firstName"
                              onChange={this.handleChange}
                              type="text"
                            />
                          </InputGroup>
                        </div>

                        <div className={empty_lastName}>
                          <InputGroup>
                            {" "}
                            {/** Last name input field */}
                            <InputGroupAddon addonType="prepend">
                              <InputGroupText>
                                <i className="tim-icons icon-single-02" />
                              </InputGroupText>
                            </InputGroupAddon>
                            <Input
                              placeholder="Last Name*"
                              name="lastName"
                              onChange={this.handleChange}
                              type="text"
                            />
                          </InputGroup>
                        </div>

                        <div className={empty_phoneNumber}>
                          <InputGroup>
                            {" "}
                            {/** Phone number input field */}
                            <InputGroupAddon addonType="prepend">
                              <InputGroupText>
                                <i className="tim-icons icon-mobile" />
                              </InputGroupText>
                            </InputGroupAddon>
                            <Input
                              placeholder="Phone Number*"
                              name="phoneNumber"
                              onChange={this.handleChange}
                              type="number"
                            />
                          </InputGroup>
                        </div>

                        <FormGroup check className="text-left">
                          <Label check>
                            <Input type="checkbox" />
                            <span className="form-check-sign" />I agree to the{" "}
                            <a href="#pablo" onClick={e => e.preventDefault()}>
                              terms and conditions
                            </a>
                            .
                          </Label>
                        </FormGroup>
                      </Form>
                    </CardBody>
                    <CardFooter>
                      <Button
                        className="btn-round"
                        color="primary"
                        href="#pablo"
                        onClick={this.handleSubmit}
                        size="lg"
                      >
                        Submit
                      </Button>
                    </CardFooter>
                  </Card>
                </Col>
              </Row>
            </Container>
          </div>
        </>
      );
    } else if (this.state.readyToSubmit) {
      return (
        // <RegisterCompany />
        <Redirect to="/registerCompany" />
      );
    }
  }
}

const mapStateToProps = state => {
  return {
    reduxState: state
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setCompanyUserID: companyUserID => dispatch(setCompanyUserID(companyUserID))
  };
};

// export default Register;
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Register);
