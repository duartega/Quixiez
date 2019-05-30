import React from "react";
import AutoSuggestion from "../../MaterialUI/Auto-Suggest";
import { getCompanyId } from "../../network/routes.ts";
import Axios from "axios";
import Complete from "./RegistrationComplete";
import { finishRegister } from "../../network/routes";
import { connect } from "react-redux";

// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  CardTitle,
  FormGroup,
  Form,
  Col
} from "reactstrap";

class RegularForms extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      Company: "",
      id: "",
      readyToSubmit: false,
      isValidCompany: false,
      submit: false
    };

    this.handleCompany = this.handleCompany.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleIsValidCompany = this.handleIsValidCompany.bind(this);
  }

  handleChange = event =>
    this.setState({ [event.target.name]: event.target.value });

  handleIsValidCompany = isValid => this.setState({ isValidCompany: isValid });

  handleSubmit() {
    let companyUserId = this.props.companyUserReducer.companyUserId;
    let companyId = this.state.id;
    Axios.post(finishRegister, { companyUserId, companyId })
      .then(result => {
        console.log("success");
      })
      .catch(err => {
        console.log(err, err.response);
      });
    if (this.state.readyToSubmit) {
      this.setState({ submit: true });
    }
  }

  handleCompany(companyName) {
    if (companyName.length > 1) {
      Axios.get(getCompanyId + companyName)
        .then(result => {
          if (companyName === result.data[0].companyName) {
            this.setState({
              id: result.data[0]["id"],
              Company: companyName,
              readyToSubmit: true
            });
          }
        })
        .catch(err => {
          console.log(err.response);
        });
    }
  }

  render() {
    if (!this.state.submit) {
      return (
        <>
          <div className="content">
            <Col md="6">
              <Card className="card-white">
                <CardHeader>
                  <CardTitle tag="h4">Select your company</CardTitle>
                </CardHeader>
                <CardBody>
                  <Form action="#">
                    <label>Company Name</label>
                    <FormGroup>
                      <AutoSuggestion
                        name="Company"
                        onChange={this.handleChange}
                        action={this.handleCompany}
                        isValid={this.handleIsValidCompany}
                      />
                    </FormGroup>
                  </Form>
                </CardBody>
                <CardFooter>
                  <Button
                    className="btn-fill"
                    color="primary"
                    type="submit"
                    onClick={this.handleSubmit}
                  >
                    Submit
                  </Button>
                </CardFooter>
              </Card>
            </Col>
          </div>
        </>
      );
    } else if (this.state.submit) {
      return <Complete />;
    }
  }
}

// will get the whole store
const mapStateToProps = state => {
  const { companyUserReducer } = state;
  console.log(companyUserReducer);
  return {
    companyUserReducer
  };
};

export default connect(mapStateToProps)(RegularForms); // connects to redux
