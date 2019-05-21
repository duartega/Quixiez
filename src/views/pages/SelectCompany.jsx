import React from "react";

// reactstrap components
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardImg,
  CardTitle,
  ListGroupItem,
  ListGroup,
  Progress,
  Container,
  Row,
  Col
} from "reactstrap";
import { selectCompany } from "../../constants/routes";

import { connect } from "react-redux";
import Axios from "axios";
import { setCompanyUserJWT } from "redux/actions";
import { axiosPost } from "../../network/ApiCalls";
class Pricing extends React.Component {
  state = {
    companiesElementsToRender: []
    // companiesResponse: []
  };

  componentDidMount() {
    document.body.classList.toggle("pricing-page");
    // console.log(this.props.companyUserReducer);
  }

  loadCompaniesComponents() {
    const { companies: propCompanies } = this.props;

    // console.log(propCompanies);
    let { companiesElementsToRender: stateCompanies } = this.state;
    const { jwt } = this.props;
    console.log("jwt", jwt);
    stateCompanies = propCompanies.map((aCompany, idx) => {
      console.log(aCompany);

      return (
        <Button
          key={idx}
          onClick={e => {
            e.preventDefault();
            // console.log(e);
            console.log(aCompany);
            axiosPost(selectCompany, { companyId: aCompany.id }, jwt)
              .then(result => {
                console.log(result);
              })
              .catch(err => {
                console.log(err);
              });
          }}
        >
          <div key={idx}>
            <p>{aCompany.companyName}</p>
          </div>
        </Button>
      );
    });

    this.setState({
      companiesElementsToRender: stateCompanies
      //   companiesResponse: propCompanies
    });
  }
  componentDidUpdate(prevProps) {
    if (this.props.jwt !== prevProps.jwt) {
      this.loadCompaniesComponents();
    }
    // const { jwt } = this.props;
    // console.log(jwt);
    //   console.log();
    //   const companies =
  }

  componentWillUnmount() {
    document.body.classList.toggle("pricing-page");
  }
  render() {
    // const companies = this.props;
    // console.log(companies['companies']) // gets array of companies
    // let c = companies["companies"];
    // c.map(result => console.log(result)); // gets each company individually
    const { companiesElementsToRender } = this.state;

    return (
      <div className="content ">
        {companiesElementsToRender}
        <Row className="col-md-12">
          <Col lg="3" md="6">
            <Card className="card-pricing card-primary card-white">
              {/* <Button className="btn-round btn-just-icon" color="primary" onClick={e => {
                  e.preventDefault();
                  console.log("clicked")
              }}> */}
              <CardBody>
                <CardImg
                  alt="..."
                  src={require("assets/img/card-primary.png")}
                />
                <ListGroup>
                  <ListGroupItem>
                    Are you registering for a company?
                  </ListGroupItem>
                </ListGroup>
              </CardBody>
              <CardFooter className="text-center mb-3 mt-3">
                Continue
              </CardFooter>
              {/* </Button> */}
            </Card>
          </Col>

          <Col lg="3" md="6">
            <Card className="card-pricing card-secondary">
              <CardBody>
                <CardImg
                  alt="..."
                  src={require("assets/img/card-primary.png")}
                />
                <ListGroup>
                  <ListGroupItem>
                    Are you creating a company account?
                  </ListGroupItem>
                </ListGroup>
              </CardBody>
              <CardFooter className="text-center mb-3 mt-3">
                <Button
                  className="btn-round btn-just-icon"
                  color="primary"
                  onClick={this.handleContinueCC}
                >
                  Continue
                </Button>
              </CardFooter>
            </Card>
          </Col>
        </Row>
      </div>
    );
  }
}

const mapStateToProps = ({ companyUserReducer: { jwt } }) => ({ jwt });
const mapDispatchToProps = dispatch => ({
  setCompanyUserJWT: jwt => dispatch(setCompanyUserJWT(jwt))
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Pricing);
