import React from "react";
import Axios from "axios";
import { login } from "./constants/routes.ts";
import SelectCompany from "./views/pages/SelectCompany";
import { connect } from "react-redux";
import { setCompanyUserJWT } from "./redux/actions";
import { Redirect } from "react-router-dom";

// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  CardTitle,
  Form,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Container,
  Col
} from "reactstrap";
import { axiosPost } from "./network/ApiCalls";

const TESTING = true;
class Login extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      JWT: "",
      email: "joemissamore@live.com",
      password: "testtest",
      loggedIn: false,
      alert: "",
      unkown: "",
      failed: 0,
      emptyUsername: false,
      emptyPassword: false,
      error: "has-danger form-group",
      register: false,
      allCompanies: []
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleChangeEmail = this.handleChangeEmail.bind(this);
    this.createAccount = this.createAccount.bind(this);
  }
  componentDidMount() {
    document.body.classList.toggle("login-page");
    TESTING && console.log(this.props.companyUserReducer);
  }

  componentWillUnmount() {
    document.body.classList.toggle("login-page");
  }

  handleSubmit() {
    const { email, password } = this.state;
    if (email === "") {
      this.setState({ emptyUsername: true });
      return;
    }
    if (password === "") {
      this.setState({ emptyPassword: true });
      return;
    }

    axiosPost(login, { email, password })
      .then(result => {
        const { jwt, companies } = result.data;
        const { setCompanyUserJWT } = this.props;

        this.setState({
          JWT: jwt,
          loggedIn: true,
          allCompanies: companies
        });
        setCompanyUserJWT(jwt);
      })
      .catch(err => {
        console.log(err.response);
        console.log(err.response.status);
        const { status } = err.response;
        if (status === 401) {
          this.setState({
            alert: "Wrong username or password",
            failed: 1
          });
          // alert("Wrong username or password");
        } else {
          // else unknown error
          alert("Unknown error has occurred please try again");
        }
      });
  }

  handleChange(event) {
    const { email, password } = this.state;
    this.setState({ password: event.target.value });

    if (email !== "") {
      this.setState({ emptyUsername: false });
    }
    if (password !== "") {
      this.setState({ emptyPassword: false });
    }
  }
  handleChangeEmail(event) {
    this.setState({ email: event.target.value });
  }

  createAccount() {
    this.setState({ register: true });
  }

  render() {
    let empty_Username,
      empty_Password = "";
    if (this.state.emptyUsername) {
      empty_Username = this.state.error;
    } else {
      empty_Username = "";
    }
    if (this.state.emptyPassword) {
      empty_Password = this.state.error;
    } else {
      empty_Password = "";
    }

    if (this.state.loggedIn === false && this.state.register === false) {
      return (
        <div className="content">
          <Container>
            <Col className="ml-auto mr-auto" lg="4" md="6">
              <Form className="form">
                <Card className="card-login card-white">
                  <CardHeader>
                    <img
                      alt="..."
                      src={require("assets/img/card-primary.png")}
                    />
                    <CardTitle tag="h1">sign-in</CardTitle>
                  </CardHeader>
                  <CardBody>
                    <div className={empty_Username}>
                      <InputGroup>
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="tim-icons icon-email-85" />
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input
                          placeholder="Email"
                          type="text"
                          value={this.state.email}
                          onChange={this.handleChangeEmail}
                        />
                      </InputGroup>
                    </div>

                    <div className={empty_Password}>
                      <InputGroup>
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="tim-icons icon-lock-circle" />
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input
                          placeholder="Password"
                          type="password"
                          value={this.state.password}
                          onChange={this.handleChange}
                        />
                      </InputGroup>
                    </div>
                  </CardBody>
                  <CardFooter>
                    <Button
                      block
                      className="mb-3"
                      color="primary"
                      href="#pablo"
                      onClick={this.handleSubmit}
                      size="lg"
                    >
                      Signin
                    </Button>
                    <div className="pull-left">
                      <h6>
                        <a
                          className="link footer-link"
                          href="#pablo"
                          onClick={this.createAccount}
                        >
                          Create Account
                        </a>
                      </h6>
                    </div>
                    <div className="pull-right">
                      <h6>
                        <a
                          className="link footer-link"
                          href="#pablo"
                          onClick={e => e.preventDefault()}
                        >
                          Need Help?
                        </a>
                      </h6>
                    </div>
                  </CardFooter>
                </Card>
              </Form>
            </Col>
          </Container>
        </div>
      );
    } else if (this.state.loggedIn === true) {
      return (
        <SelectCompany
          companies={this.state.allCompanies}
        /> /** this needs to change to show more things and pass props */
      );
    } else if (this.state.register) {
      return (
        // <Register />
        <Redirect to="/register" />
      );
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
)(Login);
