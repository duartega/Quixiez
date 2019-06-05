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
    this.state = {};
  };

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

    return ( 
        <> 
            <br/>
            {labels.map((label, idx) => {
                return (
                <Row key={idx}>
                    {/* This is where you have the input labels on the left */}
                    <Col md="3" style={{backgroundColor: "orange"}}>
                    <label>{label}:</label>
                    </Col>
                    <br/>
                    <br/>
                    <br/>
                    {/* This is where the inputs lie on the right of labels */}
                    <Col md="9" style={{backgroundColor: "green"}}>
                    <Input placeholder={label}>...</Input>
                    </Col>
                </Row>
                )
            })
            } 
        </>
        );
    };
};