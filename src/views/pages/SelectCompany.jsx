import React from "react";
import { Redirect } from "react-router-dom";
// reactstrap components
import { Button } from "reactstrap";
import { selectCompany } from "../../constants/routes";
import { connect } from "react-redux";
import { setCompanyUserJWT, setCompanyName } from "redux/actions";
import { axiosPost } from "../../network/ApiCalls";
import TestLogo from "../../Images/testlogo.png";
import GPF from "../../Images/gpf.png";
import G from "../../Images/good.png";
import S from "../../Images/s.jpg";

let images = [TestLogo, G, S, GPF];

class Company extends React.Component {
  state = {
    companiesElementsToRender: [],
    isCompanySelected: false
  };

  componentDidMount() {
    this.loadCompaniesComponents();
  }

  loadCompaniesComponents() {
    const { companies: propCompanies } = this.props;

    let { companiesElementsToRender: stateCompanies } = this.state;
    const { setCompanyName, setCompanyUserJWT } = this.props;

    stateCompanies = propCompanies.map((aCompany, idx) => {
      return (
        <Button
          key={idx}
          onClick={e => {
            e.preventDefault();
            // console.log(aCompany.companyName);
            axiosPost(selectCompany, { companyId: aCompany.id })
              .then(response => {
                const { jwt } = response.data;
                // setCompanyUserJWT(jwt);
                // Updating the jwt token in local storage
                localStorage.setItem("jwt", jwt);
                setCompanyName(aCompany.companyName);
                this.setState({ isCompanySelected: true });
              })
              .catch(err => {
                console.log(err);
              });
          }}
        >
          <div key={idx}>
            <img src={images[idx]} alt="Test" />
            <p>{aCompany.companyName}</p>
          </div>
        </Button>
      );
    });

    this.setState({
      companiesElementsToRender: stateCompanies
    });
  }

  componentDidUpdate(prevProps) {
    // Waiting for the JWT token to come in
    // from Redux.
    // if (this.props.jwt !== prevProps.jwt) {
    // this.loadCompaniesComponents();
    // }
  }

  componentWillUnmount() {
    document.body.classList.toggle("pricing-page");
  }
  render() {
    const { companiesElementsToRender } = this.state;

    if (!this.state.isCompanySelected) {
      return (
        <div className="content ">
          <h2 align="center">Please select a company to continue</h2>
          {companiesElementsToRender}
        </div>
      );
    } else if (this.state.isCompanySelected) {
      // return <AdminLayout layout="/admin" path="/dashboard" pathname="/admin/dashboard"/>;
      return <Redirect to="/admin/dashboard" from="auth" />;
    }
  }
}

const mapStateToProps = ({ companyUserReducer: { jwt } }) => ({ jwt });
const mapDispatchToProps = dispatch => ({
  setCompanyUserJWT: jwt => dispatch(setCompanyUserJWT(jwt)),
  setCompanyName: companyName => dispatch(setCompanyName(companyName))
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Company);
