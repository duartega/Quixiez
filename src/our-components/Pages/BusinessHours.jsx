import React from "react";
import BusinessHoursTable from "../../views/tables/BusinessHoursTable";

// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Row,
  Col
} from "reactstrap";

class User extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      MondayOpenTime: "",
      MondayCloseTime: "",
      TuesdayOpenTime: "",
      TuesdayCloseTime: "",
      WednesdayOpenTime: "",
      WednesdayCloseTime: "",
      ThursdayOpenTime: "",
      ThursdayCloseTime: "",
      FridayOpenTime: "",
      FridayCloseTime: "",
      SaturdayOpenTime: "",
      SaturdayCloseTime: "",
      SundayOpenTime: "",
      SundayCloseTime: ""
    };
  }
  render() {
    return (
      <>
        <div className="content">
          <Row>
            <Col md="8">
              <Card>
                <CardHeader>
                  <h2 className="title">Business Hours</h2>
                </CardHeader>
                <CardBody>
                  <BusinessHoursTable />
                </CardBody>
                <CardFooter>
                  <Button className="btn-fill" color="success" type="submit">
                    Save
                  </Button>
                </CardFooter>
              </Card>
            </Col>
          </Row>
        </div>
      </>
    );
  }
}

export default User;
