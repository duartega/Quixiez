import React from "react";

// reactstrap components
import { Card, CardBody, Row, Col, Table, Input } from "reactstrap";
import { axiosGet } from "../../network/ApiCalls";
import { companyHours as companyHoursEndpoint } from "../../constants/routes";
import { connect } from "react-redux";

let companyHours = {
  created: "2019-05-14T23:44:18.712Z",
  updated: "2019-05-14T23:44:18.712Z",
  id: "a2d299e9-7738-45ec-9625-ceab76419934",
  sundayOpenTime: "06:00:00-08",
  sundayCloseTime: "18:00:00-08",
  isOpenSunday: false,
  mondayOpenTime: null,
  mondayCloseTime: null,
  isOpenMonday: false,
  tuesdayOpenTime: null,
  tuesdayCloseTime: null,
  isOpenTuesday: false,
  wednesdayOpenTime: null,
  wednesdayCloseTime: null,
  isOpenWednesday: false,
  thursdayOpenTime: null,
  thursdayCloseTime: null,
  isOpenThursday: false,
  fridayOpenTime: null,
  fridayCloseTime: null,
  isOpenFriday: false,
  saturdayOpenTime: null,
  saturdayCloseTime: null,
  isOpenSaturday: false
};

let Monday = {
  openTime: "09:00 am",
  closeTime: "5:00 pm"
};

let Tuesday = {
  openTime: "09:00 am",
  closeTime: "10:00 pm"
};

let Wednesday = {
  openTime: "-",
  closeTime: "-"
};

let Thursday = {
  openTime: "1:00 pm",
  closeTime: "7:00 pm"
};

let Friday = {
  openTime: "-",
  closeTime: "-"
};

let Saturday = {
  openTime: "-",
  closeTime: "-"
};

let Sunday = {
  openTime: "-",
  closeTime: "-"
};

// let mapMonday = Monday.map((num) =>
//   console.log(Monday[0].isOpen)
// );

class RegularTables extends React.Component {
  state = {};

  componentDidMount() {
    const { jwt } = this.props;
    // console.log(jwt);
    axiosGet(companyHoursEndpoint, jwt)
      .then(result => {
        const { data } = result;
        if (data !== {}) {
          delete data.created;
          delete data.updated;
          const { sundayCloseUtcTime, created } = data;
          // Create a new data
          const testDate = new Date();
          // set the time in utc
          // time here is 01:05:02
          testDate.setUTCHours(1, 5, 2);
          // will print the locale time
          // 6:05:02 PM
          // console.log(testDate.toLocaleTimeString());

          // console.log(testDate.getTimezoneOffset());
          // console.log(typeof sundayCloseUtcTime);

          this.setState({ ...data });
        }
        // console.log(data);
      })
      .catch(err => {
        console.log("err getting business hours", err);
      });
  }

  render() {
    // console.log(this.state);
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
                        <th>Is Open?</th>
                        <th>DAY</th>
                        <th>OPENS AT</th>
                        <th>CLOSES AT</th>
                      </tr>
                    </thead>

                    <tbody>
                      <tr>
                        <td>Monday</td>
                        <td>
                          <Input defaultValue={Monday.openTime} />
                        </td>
                        <td>
                          <Input defaultValue={Monday.closeTime} />
                        </td>
                      </tr>
                      <tr>
                        <td>Tuesday</td>
                        <td>
                          <Input defaultValue={Tuesday.openTime} />
                        </td>
                        <td>
                          <Input defaultValue={Tuesday.closeTime} />
                        </td>
                      </tr>
                      <tr>
                        <td>Wednesday</td>
                        <td>
                          <Input defaultValue={Wednesday.openTime} />
                        </td>
                        <td>
                          <Input defaultValue={Wednesday.closeTime} />
                        </td>
                      </tr>
                      <tr>
                        <td>Thursday</td>
                        <td>
                          <Input defaultValue={Thursday.openTime} />
                        </td>
                        <td>
                          <Input defaultValue={Thursday.closeTime} />
                        </td>
                      </tr>
                      <tr>
                        <td>Friday</td>
                        <td>
                          <Input defaultValue={Friday.openTime} />
                        </td>
                        <td>
                          <Input defaultValue={Friday.closeTime} />
                        </td>
                      </tr>
                      <tr>
                        <td>Saturday</td>
                        <td>
                          <Input defaultValue={Saturday.openTime} />
                        </td>
                        <td>
                          <Input defaultValue={Saturday.closeTime} />
                        </td>
                      </tr>
                      <tr>
                        <td>Sunday</td>
                        <td>
                          <Input defaultValue={Sunday.openTime} />
                        </td>
                        <td>
                          <Input defaultValue={Sunday.closeTime} />
                        </td>
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

const mapStateToProps = ({ companyUserReducer: { jwt } }) => ({ jwt });
export default connect(mapStateToProps)(RegularTables);
