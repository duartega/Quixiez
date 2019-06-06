import React from 'react';
import { UncontrolledTooltip, Button, Row, Col, Input } from 'reactstrap';
import ReactBSAlert from "react-bootstrap-sweetalert";
import NullImg from '../../../Images/nullImg.PNG';
import ImageUpload from "./UploadModule";

export class IdentificationInformation extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
          DL_Number: "",
          DL_Expiration: "",
          MedNumber: "",
          MedExpiration: "",
          RecImage: null,
          MedImage: null,
          nullImg: NullImg,
          alert: null
        };
  };
  
  handleChange = event =>
    this.setState({[event.target.name]: event.target.value})

    render() {
        return(
          <>
            {this.state.alert}
            <br />
            <Row style={{justifyContent: "center"}}><h3>Identification Information</h3></Row>
                <br/>
                {/* The start of the left side of the Identification Information page for images */}
                <Col md="12" >
                  <Row>
                    <Col md="4">
                      <Button style={{ padding: 0 }} id="DL" onClick={this.inputAlert}>
                        {this.state.RecImage ? (<img src={this.state.RecImage} alt="Drivers License"/> ): (<img src={this.state.nullImg} alt="Drivers License"/> )}
                      </Button>
                    <UncontrolledTooltip placement="left" target="DL" delay={0}>
                        Click to zoom or edit picture
                    </UncontrolledTooltip>
                    </Col>
                    <Col md="2">
                      <br/>
                      <Row style={{marginRight: "10px"}}>
                        <label>D. L . Number :</label>
                      </Row>
                      <br/><br/>
                      <Row style={{marginRight: "10px"}}>
                        <label>D. L . Expiration :</label>
                      </Row>
                    </Col>
                      
                    <Col md="6">
                      
                      <Row style={{paddingTop: "15px" }}>
                        <Input 
                          name="DL_Number"
                          value={this.state.DL_Number}
                          placeholder="D.L. Number..."
                          onChange={this.handleChange} 
                        />
                      </Row>
                      
                      <Row style={{paddingTop: "25px" }}>
                        <Input 
                          name="DL_Expiration" 
                          value={this.state.DL_Expiration} 
                          placeholder="D.L. Expiration..."
                          onChange={this.handleChange}
                        />
                      </Row>
                    </Col>
                  </Row>
              
                  <br/>
                  <br />
                  
                  {/* The start of the Right side of the Identification Information page for input fields */}
                  <Row>
                    <Col>
                      <Button style={{padding: 0}} id="Med">
                        {this.state.MedImage ? (<img src={this.state.MedImage} alt="Medical Card"/> ): (<img src={this.state.nullImg} alt="Medical Card"/> )}
                      </Button>
                      <UncontrolledTooltip placement="left" target="Med" delay={0}>
                        Click to zoom or edit picture
                      </UncontrolledTooltip>
                    </Col>
                    <Col md="2">
                      <br/>
                      <Row style={{marginRight: "10px"}}>
                        <label>Medical Number :</label>
                      </Row>
                      <br/><br/>
                      <Row style={{marginRight: "10px"}}>
                        <label>Medical Card Expiration :</label>
                      </Row>
                    </Col>
                      
                    <Col md="6">
                      
                      <Row style={{paddingTop: "15px" }}>
                        <Input
                          name="MedNumber"
                          value={this.state.MedNumber} 
                          placeholder="Medical Number..."
                          onChange={this.handleChange}
                          />
                      </Row>
                      
                      <Row style={{paddingTop: "35px" }}>
                        <Input
                          name="MedExpiration"
                          value={this.state.MedExpiration} 
                          placeholder="Medical Card Expiration..."
                          onChange={this.handleChange}
                          />
                      </Row>
                      
                    </Col>
                  </Row>
                </Col>
            </>
        );
  };
  

  inputAlert = () => {
    this.setState({
      alert: (
        <ReactBSAlert
          showCancel
          style={{ display: "block" }}
          title="Drivers License Image"
          onConfirm={e => this.inputConfirmAlert(e)}
          onCancel={() => this.hideAlert()}
          confirmBtnBsStyle="success"
          cancelBtnBsStyle="danger"
          btnSize=""
          confirmBtnText="Update Picture"
          
        >
          <ImageUpload />
        </ReactBSAlert>
      )
    });
  };

  inputConfirmAlert = e => {
    this.setState({ alert: e });
    setTimeout(this.inputConfirmAlertNext, 200);
  };

  hideAlert = () => {
    this.setState({
      alert: null
    });
  };

  inputConfirmAlertNext = () => {
    const inputValue = this.state.alert;
    this.setState({
      alert: (
        <ReactBSAlert
          success
          style={{ display: "block", marginTop: "-100px" }}
          onConfirm={() => this.hideAlert()}
          onCancel={() => this.hideAlert()}
          confirmBtnBsStyle="success"
          btnSize=""
          title="You entered: "
        >
          <b>{inputValue}</b>
        </ReactBSAlert>
      )
    });
  };
};

{/* <label>Last Name:</label>
<label>Phone Number:</label>
<label>Delivery Address:</label>
<label>Alternate Delivery Address:</label>
<label>Consumer Type:</label>
<label>Banned:</label> */}