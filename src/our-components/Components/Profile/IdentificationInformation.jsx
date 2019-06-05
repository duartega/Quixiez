import React from 'react';
import {Button, Row, Col, Card, Media, Input} from 'reactstrap';

export class IdentificationInformation extends React.Component {

    constructor(props) {
        super(props);
        this.state = {

        };
    };

    render() {
        return(
            <>
                <br/>
                {/* The start of the right side of page for images */}
                <Col md="12" style={{backgroundColor: "white"}}>
                    <Row>
                        this is the DL user information layout 
                    </Row>
                    <Row>
                        this is the Med user information layout
                    </Row>
                </Col>
            </>
        );
    };
};

{/* <label>Last Name:</label>
<label>Phone Number:</label>
<label>Delivery Address:</label>
<label>Alternate Delivery Address:</label>
<label>Consumer Type:</label>
<label>Banned:</label> */}