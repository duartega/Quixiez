import React from "react";
import AutoSuggestion from '../../MaterialUI/Auto-Suggest';
import Axios from "axios";
import { getCompanyId, register } from "../../constants/routes.ts";
import { connect } from "react-redux";
import { setCompanyUserID } from "../../redux/actions";

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
      FirstName: "",
      LastName: "",
      PhoneNumber: "",
      Company: "",
      id: "",
      validCompany: false,
      companyUserId: "",
      readyToSubmit: false,
      wrongPassword: false,
      emptyEmail: false,
      emptyFirstName: false,
      emptyLastName: false,
      emptyPhoneNumber: false,
    }

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
    const {email, password, PhoneNumber, FirstName, LastName } = this.state;
    this.setState({ [event.target.name]: event.target.value });
    if (PhoneNumber !== "") {this.setState({emptyPhoneNumber: false})}
    if (FirstName !== "") {this.setState({emptyFirstName: false})}
    if (LastName !== "") {this.setState({emptyLastName: false})}
    if (email !== "") {this.setState({emptyEmail: false})}
    if (password !== "") {this.setState({wrongPassword: false})}
  }

  handleSubmit(event) {
    const {email, password, confirmPassword, PhoneNumber, FirstName, LastName } = this.state;
    if (PhoneNumber === "") {this.setState({emptyPhoneNumber: true})}
    if (FirstName === "") {this.setState({emptyFirstName: true})}
    if (LastName === "") {this.setState({emptyLastName: true})}
    if (email === "") {this.setState({emptyEmail: true})}

    if (password !== confirmPassword)
    {
      this.setState({wrongPassword: true})
      // alert("Passwords do not match")
    }else {
    if (this.state.company !== ""){
      this.setState({readyToSubmit: true})
      Axios.post(register, {email, password}).then(result =>{
        if (password !== confirmPassword)
        {
          console.log("wrong pass")
        }
        this.props.setCompanyUserID(result.data.id)
      }).catch(err => {
        console.log("err: ", err)
      })
    }
  }
}

  handleCompany (companyName){
    if (companyName.length > 1){
      Axios.get(getCompanyId+companyName).then(result => {
        this.setState({id: result.data[0]['id']})
      }).catch(err=>{
        console.log(err.response)
      })
    }
    this.setState({Company: companyName});
    }

    isCompanyValid = TrueOrFalse =>
      this.setState({end: TrueOrFalse});


  render() {
    let wrongPass, empty_email, empty_FirstName, empty_LastName, empty_PhoneNumber = ""
    let error = "has-danger form-group"
    // Highlight the fields if they are not filled or incorrect
    if (this.state.wrongPassword) { wrongPass = error; }
    else { wrongPass = ""; }
    if (this.state.emptyEmail) { empty_email = error; } 
    else { empty_email = ""}
    if (this.state.emptyFirstName) { empty_FirstName = error;}
    else { empty_FirstName = ""}
    if (this.state.emptyLastName) { empty_LastName = error;}
    else { empty_LastName = ""}
    if (this.state.emptyPhoneNumber) { empty_PhoneNumber = error;}
    else { empty_PhoneNumber = ""}

    if (this.state.readyToSubmit === false){
    return (
      <>
        <div className="content">
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
                      There is also a Fully Customizable CMS Admin Dashboard for
                      this product.
                    </p>
                  </div>
                </div>
              </Col>
              <Col className="mr-auto" md="7">
                <Card className="card-register card-white">
                  <CardHeader>
                    <CardImg
                      alt="..."
                      src={require("assets/img/card-primary.png")}
                    />
                    <CardTitle tag="h4">Register</CardTitle>
                  </CardHeader>
                  <CardBody>
                    <Form className="form">
                    
                    <div className={empty_email}>
                      <InputGroup> {/** email input field */}
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="tim-icons icon-email-85" />
                          </InputGroupText>
                          </InputGroupAddon>
                        <Input placeholder="email*" name="email" onChange={this.handleChange} type="email" />
                      </InputGroup>
                    </div>
                      
                    <div className={wrongPass}>
                      <InputGroup> {/** password input field */}
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="tim-icons icon-lock-circle" />
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input placeholder="password*" name="password" onChange={this.handleChange} type="password" />
                      </InputGroup>
                    </div>

                    <div className={wrongPass}>
                      <InputGroup> {/** confirm password input field */}
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="tim-icons icon-lock-circle" />
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input placeholder="confirm password*" name="confirmPassword" onChange={this.handleChange} type="password" />
                      </InputGroup>
                    </div>

                    <div className={empty_FirstName}>
                      <InputGroup > {/** First name input field */}
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="tim-icons icon-single-02" />
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input placeholder="First Name*" name="FirstName" onChange={this.handleChange} type="text" />
                      </InputGroup>
                    </div>

                    <div className={empty_LastName}>
                      <InputGroup> {/** Last name input field */}
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="tim-icons icon-single-02" />
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input placeholder="Last Name*" name="LastName" onChange={this.handleChange}  type="text" />
                      </InputGroup>
                    </div>

                    <div className={empty_PhoneNumber}>
                      <InputGroup> {/** Phone number input field */}
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="tim-icons icon-mobile" />
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input placeholder="Phone Number*" name="PhoneNumber" onChange={this.handleChange} type="number" />
                      </InputGroup>
                    </div>
                      {/* <InputGroup>  */}
                        {/* <InputGroupAddon addonType="prepend"> */}
                          {/* <InputGroupText> */}
                            {/* <i className="tim-icons icon-bank" /> */}
                          {/* </InputGroupText> */}
                        {/* </InputGroupAddon> */}
                          {/* <AutoSuggestion */}
                            {/* name="Company" */}
                            {/* onChange={this.handleChange} */}
                            {/* action={this.handleCompany} */}
                            {/* isCompanyValid={this.isCompanyValid */}
                            {/* } /> */}
                      {/* </InputGroup> */}
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
    );}
    else if (this.state.readyToSubmit){
      
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
    setCompanyUserID: (companyUserID) => dispatch(setCompanyUserID(companyUserID))
  }
}

// export default Register;
export default connect(mapStateToProps, mapDispatchToProps)(Register);
