import React from 'react';
import {IdentificationInformation} from './IdentificationInformation';
import {
  Button,
  Row,
  Col,
  Card,
  Media,
  Input
} from 'reactstrap';

export class UserInformation extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      firstName: "",
      lastName: "",
      phoneNumber: "",
      deliveryAddress: "",
      alternateDeliveryAddress: "",
      consumerType: "",
      banned: false
    };
  };

  handleChange = event =>
    this.setState({[event.target.name]: event.target.value})

  render() {
    let labels = [
      "First Name",
      "Last Name",
      "Phone Number",
      "Delivery Address",
      "Alternate Delivery Address",
      "Consumer Type",
      "Banned"
    ];

    let stateNames = [
      "firstName",
      "lastName",
      "phoneNumber",
      "deliveryAddress",
      "alternateDeliveryAddress",
      "consumerType",
      "banned"
    ]

    return ( 
        <> 
        <br />
        <Row style={{"justify-content": "center"}}><h3>User Information</h3></Row>
            {labels.map((label, idx) => {
                return (
                <Row key={idx}>
                    {/* This is where you have the input labels on the left */}
                    <Col md="2">
                    <label>{label}{" "}:</label>
                    </Col>
                    <br/>
                    <br/>
                    <br/>
                    {/* This is where the inputs lie on the right of labels */}
                    <Col md="8">
                    <Input name={stateNames[idx]} placeholder={label + "..."} onChange={this.handleChange} />
                    </Col>
                </Row>
                )
            })
            } 
        </>
        );
    };
};