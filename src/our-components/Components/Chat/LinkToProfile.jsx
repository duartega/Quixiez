import React from 'react';
import { Card, Row, Col, Button } from 'reactstrap';

export class Profile extends React.Component {

  render() {
    return (
        <> 
            <Card style={{padding: "10px", backgroundColor: "inherit"}}>
                <Row className="headerButtons">
                    <Col lg="8" style={{display: "flex", justifyContent: "center", alignItems: "center"}}>    
                        <h3 style={{margin: "0"}}>John</h3>
                    </Col>
                    <Col lg="2" style={{paddingLeft: "0", paddingRight: "0" }}>
                        <Row className="headerButtons">
                            <Button className="btn-simple" color="success" style={{paddingRight: "15px", color: "#FFFFFF"}}>
                                Action
                                <i style={{paddingLeft: "20px" }} className="tim-icons icon-pencil"/>
                            </Button>
                        </Row>
                    </Col>
                    <Col lg="2" style={{paddingLeft: "0", paddingRight: "0" }}>
                        <Row className="headerButtons">
                            <Button className="btn-simple" color="success" style={{color: "#FFFFFF"}}>
                                Profile
                                <i style={{paddingLeft: "20px"}} className = "tim-icons icon-single-02" />
                            </Button>
                        </Row>
                    </Col>
                </Row>
            </Card>
        </>
    );
  };
};