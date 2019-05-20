import React from "react";
// react component used to create sweet alerts
import ReactBSAlert from "react-bootstrap-sweetalert";
import { Redirect } from "react-router-dom";

// reactstrap components
import { Row } from "reactstrap";

class SweetAlert extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      alert: null,
      exit: false,
    };
  }
  // to stop the warning of calling setState of unmounted component
  componentWillUnmount() {
    var id = window.setTimeout(null, 0);
    while (id--) {
      window.clearTimeout(id);
    }
  }


  successAlert = () => {
    this.setState({
      alert: (
        <ReactBSAlert
          success
          style={{ display: "block", marginTop: "500px" }}
          title="Good job!"
          onConfirm={() => this.hideAlert()}
          onCancel={() => this.hideAlert()}
          confirmBtnBsStyle="success"
          btnSize=""
        >
          You clicked the button!
        </ReactBSAlert>
      )
    });
  };

  hideAlert = () => 
      this.setState({exit: true})

  render() {

    if (!this.state.exit) {
        return (
        <>
            <div className="content">
            {this.state.alert}
            <div className="places-sweet-alerts">

                <Row className="mt-5">
                
                <ReactBSAlert
                    success
                    style={{ display: "block", marginTop: "-100px" }}
                    title="Thank you for signing up!"
                    onConfirm={() => this.hideAlert()}
                    onCancel={() => this.hideAlert()}
                    confirmBtnBsStyle="success"
                    btnSize=""
                    >
                    Your request is pending. Please check your email!
                </ReactBSAlert>
                
                </Row>
            </div>
            </div>
        </>
        );} else if (this.state.exit) {
            return (
                <Redirect to="/auth" />
            );
        }
    }
}

export default SweetAlert;
