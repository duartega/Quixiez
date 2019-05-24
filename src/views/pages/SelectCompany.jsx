import React from "react";
import { Redirect } from 'react-router-dom'
// reactstrap components
import { Button } from "reactstrap";
import { selectCompany } from "../../constants/routes";
import Dashboard from "../Dashboard";
import { connect } from "react-redux";
import Axios from "axios";
import { setCompanyUserJWT, setCompanyName } from "redux/actions";
import { axiosPost } from "../../network/ApiCalls";
import Settings from '../pages/GeneralSettings'
import AdminLayout from '../../our-components/Admin';
import Admin from "layouts/Admin/Admin";



class Company extends React.Component {
  state = {
    companiesElementsToRender: [],
    isCompanySelected: false
  };

  componentDidMount() {
    document.body.classList.toggle("pricing-page");
  }

  loadCompaniesComponents() {
    const { companies: propCompanies } = this.props;

    let { companiesElementsToRender: stateCompanies } = this.state;
    const { jwt, setCompanyName, setCompanyUserJWT } = this.props;
    stateCompanies = propCompanies.map((aCompany, idx) => {
      return (
        <Button
          key={idx}
          onClick={e => {
            e.preventDefault();
            // console.log(aCompany.companyName);
            axiosPost(selectCompany, { companyId: aCompany.id }, jwt)
              .then(response => {
                const { jwt } = response.data;
                setCompanyUserJWT(jwt);
                setCompanyName(aCompany.companyName)
                this.setState({ isCompanySelected: true });
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
    });
  }

  componentDidUpdate(prevProps) {
    if (this.props.jwt !== prevProps.jwt) {
      this.loadCompaniesComponents();
    }
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
      return (
        <Redirect to="/admin/dashboard" from="auth" /> 
      );
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
