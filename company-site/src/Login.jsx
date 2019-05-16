import React from "react";
import Axios from "axios";
import { login } from "./constants/routes.ts";
import DashBoard from "./views/Dashboard";
import { connect } from "react-redux";
import { setCompanyUserJWT } from "./redux/actions";

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

class Login extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      JWT: "",
      email: "",
      password: "",
      loggedIn: false
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleChangeEmail = this.handleChangeEmail.bind(this);
  }
  componentDidMount() {
    document.body.classList.toggle("login-page");
    console.log(this.props.reduxState);
  }

  componentWillUnmount() {
    document.body.classList.toggle("login-page");
  }

  handleSubmit() {
    const { email, password } = this.state;

    Axios.post(login, { email, password })
      .then(result => {
        console.log("RES: ", result);
        this.setState({ JWT: result.data["jwt"], loggedIn: true });
      })
      .catch(err => {
        console.log(err.response);
        console.log(err.response.status);
        const { status } = err.response;
        if (status === 401) {
          alert("Wrong username or password");
        } else {
          // else unknown error
          alert("Unknown error has occurred please try again");
        }
      });
  }

  handleChange(event) {
    this.setState({ password: event.target.value });
  }
  handleChangeEmail(event) {
    this.setState({ email: event.target.value });
  }

  render() {
    if (this.state.loggedIn === false) {
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
                      Get Started
                    </Button>
                    <div className="pull-left">
                      <h6>
                        <a
                          className="link footer-link"
                          href="#pablo"
                          onClick={e => e.preventDefault()}
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
    } else {
      return (
        <DashBoard /> /** this needs to change to show more things and pass props */
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
    setCompanyUserJWT: jwt => dispatch(setCompanyUserJWT(jwt))
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Login);
