import React from "react";

// reactstrap components
import { Card, CardBody, Row, Col, Table, Input } from "reactstrap";

let companyHours = {
  "created": "2019-05-14T23:44:18.712Z",
  "updated": "2019-05-14T23:44:18.712Z",
  "id": "a2d299e9-7738-45ec-9625-ceab76419934",
  "sundayOpenTime": "06:00:00-08",
  "sundayCloseTime": "18:00:00-08",
  "isOpenSunday": false,
  "mondayOpenTime": null,
  "mondayCloseTime": null,
  "isOpenMonday": false,
  "tuesdayOpenTime": null,
  "tuesdayCloseTime": null,
  "isOpenTuesday": false,
  "wednesdayOpenTime": null,
  "wednesdayCloseTime": null,
  "isOpenWednesday": false,
  "thursdayOpenTime": null,
  "thursdayCloseTime": null,
  "isOpenThursday": false,
  "fridayOpenTime": null,
  "fridayCloseTime": null,
  "isOpenFriday": false,
  "saturdayOpenTime": null,
  "saturdayCloseTime": null,
  "isOpenSaturday": false
}

let Monday = {
  openTime: "09:00 am",
  closeTime: "5:00 pm"
}

let Tuesday = {
  openTime: "09:00 am",
  closeTime: "10:00 pm"
}

let Wednesday = {
  openTime: "-",
  closeTime: "-"
}

let Thursday = {
  openTime: "1:00 pm",
  closeTime: "7:00 pm"
}

let Friday = {
  openTime: "-",
  closeTime: "-"
}

let Saturday = {
  openTime: "-",
  closeTime: "-"
}

let Sunday = {
  openTime: "-",
  closeTime: "-"
}

// let mapMonday = Monday.map((num) =>
//   console.log(Monday[0].isOpen)
// );

class RegularTables extends React.Component {
  render() {
    return (
      <>

        <div className="content">
          <Row>
            <Col className="mb-5" md="12">
              <Card>
                
                <CardBody>
                  <Table>
                   <thead className="text-primary">
                      <tr>
                        <th>DAY</th>
                        <th>OPENS AT</th>
                        <th>CLOSES AT</th>
                      </tr>
                    </thead>

                    <tbody>
                      <tr>
                        <td>Monday</td>
                        <td><Input defaultValue={Monday.openTime}></Input></td>
                        <td><Input defaultValue={Monday.closeTime}></Input></td>
                      </tr>                      
                      <tr>
                        <td>Tuesday</td>
                        <td><Input defaultValue={Tuesday.openTime}></Input></td>
                        <td><Input defaultValue={Tuesday.closeTime}></Input></td>
                      </tr>
                      <tr>
                        <td>Wednesday</td>
                        <td><Input defaultValue={Wednesday.openTime}></Input></td>
                        <td><Input defaultValue={Wednesday.closeTime}></Input></td>
                      </tr>
                      <tr>
                        <td>Thursday</td>
                        <td><Input defaultValue={Thursday.openTime}></Input></td>
                        <td><Input defaultValue={Thursday.closeTime}></Input></td>
                      </tr>
                      <tr>
                        <td>Friday</td>
                        <td><Input defaultValue={Friday.openTime}></Input></td>
                        <td><Input defaultValue={Friday.closeTime}></Input></td>
                      </tr>
                      <tr>
                        <td>Saturday</td>
                        <td><Input defaultValue={Saturday.openTime}></Input></td>
                        <td><Input defaultValue={Saturday.closeTime}></Input></td>
                      </tr>
                      <tr>
                        <td>Sunday</td>
                        <td><Input defaultValue={Sunday.openTime}></Input></td>
                        <td><Input defaultValue={Sunday.closeTime}></Input></td>
                      </tr>
                      </tbody>
                  </Table>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </div>
      </>
    );
  }
}

export default RegularTables;
