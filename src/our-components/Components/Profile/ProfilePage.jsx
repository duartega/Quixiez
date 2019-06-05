import React from 'react';
import { UserInformation } from './UserInformation';
import { Button, Row, Col, Card } from 'reactstrap';
import { IdentificationInformation } from './IdentificationInformation';

export class ProfilePage extends React.Component {

  constructor(props) {
    super(props);
    this.state = {};
  };

  goBacktoConversation = () => {
    this.props.history.goBack();
    // This is the same thing
    // this.props.history.replace('/admin/conversations');
    console.log(this.props.history);
  }

  render() {
    return (
      <div className="content">
        <Card>
        {/* Header */}
          <Row style={{margin: "15px"}}>
            {/* this is the back button layout */}
            <Button color="primary" style={{margin: 0}} onClick={this.goBacktoConversation}>
                Back
            </Button>
          </Row>

          {/* Center */}
          <Row style={{margin: "15px"}}>
            {/* Left Center */}
            <Col>
                <UserInformation />
            </Col>

            {/* Right Center */}
            <Col>
                <IdentificationInformation /> 
            </Col>
          </Row>


          {/* Footer */}
          <Row style={{margin: "15px"}}>
          {/* <Col md="9"/>           */}
          <Col md="12" style={{paddingRight: "0px", textAlign: "right"}}>
            <Button color="primary">
                Order History
            </Button>
            <Button color="primary">
                Save
            </Button>
          </Col>

          </Row>
        </Card>
      </div>
    );
  };
};