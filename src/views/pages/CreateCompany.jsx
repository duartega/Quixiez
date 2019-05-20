import Address from "../maps/GooglePlaces";
import React from "react";
import Axios from "axios";
import ReactBSAlert from "react-bootstrap-sweetalert";
import Complete from './RegistrationComplete';
import { createCompany } from '../../constants/routes'
import { connect } from "react-redux";

// reactstrap components
import {
  Button, Card, CardHeader,
  CardBody, CardFooter, CardTitle,
  FormGroup, Form, Input,
  Col,
} from "reactstrap";

class RegularForms extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      companyAddress: "",
      companyName: "",
      alert: null,
      readyToSubmit: false,
      companyNameEmpty: false,
      addressEmpty: false,
    };
  this.handleSubmit = this.handleSubmit.bind(this);
  this.handleChange = this.handleChange.bind(this);
  this.handleCompanyNameChange = this.handleCompanyNameChange.bind(this);
  }

  handleChange(formattedAddress) {
    this.setState({companyAddress: formattedAddress})
  };

  handleCompanyNameChange = event =>
    this.setState({companyName: event.target.value});

  handleSubmit() {
    let createdByCompanyUserId = this.props.companyUserReducer.companyUserId; // Get user id from store
    const { companyName, companyAddress} = this.state;
    let ac = companyAddress['formatted_address'].split(",")

    let address = {
      street: ac[0],
      city: ac[1],
      state: ac[2].split(" ")[1],
      zip: ac[2].split(" ")[2],
      country: ac[3]
    }

    if (this.state.companyAddress === "" ) { 
      this.setState({addressEmpty: true});
      alert("Please enter an address!") 
    }
    if (this.state.companyName === "" ) { 
      this.setState({companyNameEmpty: true});
      alert("Please enter a Company Name!") 
    }

    if (this.state.companyName !== "" && this.state.companyAddress !== "") {
      
      Axios.post(createCompany, {companyName, createdByCompanyUserId, address}).then(result => {
        this.setState({readyToSubmit: true})
      }).catch(err => {
        console.log(err, err.response)
      })
    }
  };

  basicAlert = () => {
    this.setState({
      alert: (
        <ReactBSAlert
          style={{ display: "block", marginTop: "-100px" }}
          title="Here's a message!"
          onConfirm={() => this.hideAlert()}
          onCancel={() => this.hideAlert()}
          confirmBtnBsStyle="success"
          btnSize=""
        />
      )
    });
  };

  hideAlert = () => 
      this.setState({alert: null});



  render() {

    //** TODO */
    let emptyAddress, emptyCompanyName = ""
    let error = "has-danger form-group"
    // Highlight the fields if they are not filled or incorrect
    if (this.state.addressEmpty) { emptyAddress = error; }
      else { emptyAddress = ""; }

    if (this.state.emptyCompanyName) { emptyCompanyName = error; }
      else { emptyCompanyName = ""; }


    if (!this.state.readyToSubmit) {
    return (
      <>
        <div className="content">
          {this.state.alert}
            <Col md="6">
              <Card>
                <CardHeader>
                  <CardTitle tag="h4">Create your company</CardTitle>
                </CardHeader>
                <CardBody>
                  <Form action="#">
                    <label>Company Name</label>
                    <div className={emptyCompanyName}>
                    <FormGroup>
                      <Input type="text"
                      onChange={this.handleCompanyNameChange} 
                      value={this.state.companyName}
                      />
                    </FormGroup>
                    </div>
                    <label>Address</label>
                    <FormGroup>
                    <Address action={this.handleChange} />
                    </FormGroup>
                  </Form>
                </CardBody>
                <CardFooter>
                  <Button className="btn-fill" color="primary" type="submit" onClick={this.handleSubmit}>
                    Submit
                  </Button>
                </CardFooter>
              </Card>
            </Col>
        </div>
      </>
    );}
    else if (this.state.readyToSubmit) {
      return (
        <Complete />
      )
    }
  }
}

// will get the whole store
const mapStateToProps = state => {
  const {companyUserReducer} = state;
  return {
    companyUserReducer
  }
}

// export default RegularForms;
export default connect(mapStateToProps)(RegularForms);
