import React from "react";
import { axiosGet, axiosPut } from "../../network/ApiCalls";
import {
  getAddress,
  getSocialMediaLinks,
  putSocialMediaLinks,
  putAddress,
  getCompanyInfo,
  putCompanyInfo
} from "../../constants/routes";
import { connect } from "react-redux";
import { setCompanyUserJWT } from "../../redux/actions";
import ReactBSAlert from "react-bootstrap-sweetalert";

// reactstrap components
import { Row } from "reactstrap";
import { SocialMedia } from "our-components/Settings/SocialMedia";
import { Address } from "our-components/Settings/Address";
import { General } from "our-components/Settings/General";

class User extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      JWT: "",
      quixiezNumber: "",
      phoneNumber: "",
      email: "",
      websiteUrl: "",
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
      alert: "",
      hasInfoChanged: false,
      method: ""
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleCheck = this.handleCheck.bind(this);
    this.handleCompanyOverviewSave = this.handleCompanyOverviewSave.bind(this);
    this.handleCompanyAddressSave = this.handleCompanyAddressSave.bind(this);
    this.handleCompanySocialMediaSave = this.handleCompanySocialMediaSave.bind(
      this
    );
  }

  componentDidMount() {
    // const jwt = this.props.companyUserReducer.jwt;
    this.setState({ companyName: this.props.companyUserReducer.companyName });
    const authToken = JSON.parse(localStorage.getItem("state.auth.tokens"));

    // Get address information for the settings page
    axiosGet(getAddress, authToken)
      .then(result => {
        const { data } = result;
        delete data.created;
        delete data.updated;
        this.setState({ ...data });
      })
      .catch(err => {
        console.log(err, err.response);
        console.log("Auth token in error: ", authToken)
      });

    // Get social media information for the settings page
    axiosGet(getSocialMediaLinks, authToken)
      .then(socialMedia => {
        this.setState({
          facebook: socialMedia.data["facebookUrl"],
          twitter: socialMedia.data["twitterUsername"],
          snapchat: socialMedia.data["snapChatUsername"],
          instagram: socialMedia.data["instagramUsername"]
        });
      })
      .catch(err => {
        console.log(err, err.response);
      });

    // Get company information such as number and email for the settings page
    axiosGet(getCompanyInfo, authToken)
      .then(result => {
        const { data } = result;
        delete data.created;
        delete data.updated;
        delete data.id;
        delete data.companyName;
        this.setState({ ...data });
      })
      .catch(err => {
        console.log(err, err.response);
      });
  }

  handleChange = event => {
    if (event.target.name === "showStreet") {
      if (this.state.showStreet) {
        this.setState({
          [event.target.name]: event.target.checked,
          hasInfoChanged: true
        });
      } else if (!this.state.showStreet) {
        this.setState({
          [event.target.name]: event.target.checked,
          hasInfoChanged: true
        });
      }
    } else {
      this.setState({
        [event.target.name]: event.target.value,
        hasInfoChanged: true
      });
    }
  };
  handleCheck = event => console.log(event);

  handleCompanyAddressSave() {
    const {
      street,
      city,
      state,
      zip,
      showStreet,
      showCity,
      showState,
      showZip
    } = this.state;
    const jwt = this.props.companyUserReducer.jwt;

    if (this.state.hasInfoChanged) {
      axiosPut(
        putAddress,
        { street, city, state, zip, showStreet, showCity, showState, showZip },
        jwt
      )
        .then(result => {
          this.setState({ alert: "success" });
        })
        .catch(err => {
          this.setState({ alert: "failed" });
          console.log(err, err.response);
        });
      this.setState({ hasInfoChanged: false });
    } else {
      this.setState({ alert: "warning" });
    }
  }

  handleCompanyOverviewSave() {
    const {
      quixiezNumber,
      phoneNumber,
      email,
      websiteUrl,
      companyName
    } = this.state;
    const jwt = this.props.companyUserReducer.jwt;

    if (this.state.hasInfoChanged) {
      axiosPut(
        putCompanyInfo,
        { quixiezNumber, phoneNumber, email, websiteUrl, companyName },
        jwt
      )
        .then(result => {
          this.setState({ alert: "success" });
        })
        .catch(err => {
          this.setState({ alert: "failed" });
          console.log(err, err.response);
        });
      this.setState({ hasInfoChanged: false });
    } else {
      this.setState({ alert: "warning" });
    }
  }

  handleCompanySocialMediaSave() {
    const facebookUrl = this.state.facebook;
    const twitterUsername = this.state.twitter;
    const snapChatUsername = this.state.snapchat;
    const instagramUsername = this.state.instagram;

    // lets create a bool that lets us know if the field has changed so the user doesnt spam the save button
    const jwt = this.props.companyUserReducer.jwt;

    if (this.state.hasInfoChanged) {
      axiosPut(
        putSocialMediaLinks,
        { facebookUrl, twitterUsername, snapChatUsername, instagramUsername },
        jwt
      )
        .then(result => {
          this.setState({ alert: "success" });
        })
        .catch(err => {
          this.setState({ alert: "failed" });
          console.log(err, err.response);
        });
      this.setState({ hasInfoChanged: false });
    } else {
      this.setState({ alert: "warning" });
    }
  }

  hideAlert = () => this.setState({ alert: "" });

  render() {
    if (this.state.alert === "") {
      return (
        <>
          <div className="content">
            <General
              companyNameDefaultValue={this.state.companyName}
              quixiezNumberDefaultValue={this.state.quixiezNumber}
              phoneNumberDefaultValue={this.state.phoneNumber}
              emailDefaultValue={this.state.email}
              websiteUrlDefaultValue={this.state.websiteUrl}
              onChange={this.handleChange}
              onClick={this.handleCompanyOverviewSave}
            />

            <Address
              streetDefaultValue={this.state.street}
              cityDefaultValue={this.state.city}
              stateDefaultValue={this.state.state}
              zipDefaultValue={this.state.zip}
              showStreet={this.state.showStreet}
              onChange={this.handleChange}
              onClick={this.handleCompanyAddressSave}
            />

            <SocialMedia
              facebookDefaultValue={this.state.facebook}
              instagramDefaultValue={this.state.instagram}
              twitterDefaultValue={this.state.twitter}
              snapchatDefaultValue={this.state.snapchat}
              onButtonClick={this.handleCompanySocialMediaSave}
              handleChange={this.handleChange}
            />
          </div>
        </>
      );
    } else if (this.state.alert === "success") {
      return (
        <div>
          <div className="places-sweet-alerts">
            <Row className="mt-5">
              <ReactBSAlert
                success
                style={{ display: "block", marginTop: "-100px" }}
                title="Information saved successfully!"
                onConfirm={() => this.hideAlert()}
                onCancel={() => this.hideAlert()}
                confirmBtnBsStyle="success"
                btnSize=""
              />
            </Row>
          </div>
        </div>
      );
    } else if (this.state.alert === "failed") {
      return (
        <div>
          <div className="places-sweet-alerts">
            <Row className="mt-5">
              <ReactBSAlert
                danger
                style={{ display: "block", marginTop: "-100px" }}
                title="Information failed to save! Please try again in a few moments."
                onConfirm={() => this.hideAlert()}
                onCancel={() => this.hideAlert()}
                confirmBtnBsStyle="danger"
                btnSize=""
              />
            </Row>
          </div>
        </div>
      );
    } else if (this.state.alert === "warning") {
      return (
        <div>
          <div className="places-sweet-alerts">
            <Row className="mt-5">
              <ReactBSAlert
                warning
                style={{ display: "block", marginTop: "-100px" }}
                title="You have not updated your information! Please modify your information to save."
                onConfirm={() => this.hideAlert()}
                onCancel={() => this.hideAlert()}
                confirmBtnBsStyle="warning"
                btnSize=""
              />
            </Row>
          </div>
        </div>
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
)(User);

// export default User;
