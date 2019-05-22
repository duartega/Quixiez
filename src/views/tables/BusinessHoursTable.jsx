import React from "react";

// reactstrap components
import { Card, CardBody, Row, Col, Table, Input, FormGroup } from "reactstrap";
import { axiosGet } from "../../network/ApiCalls";
import { companyHours as companyHoursEndpoint } from "../../constants/routes";
import { connect } from "react-redux";
import moment from "moment";
import DateTime from "react-datetime";

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
  state = {
    isLoading: true
  };

  componentDidMount() {
    const { jwt } = this.props;
    console.log(jwt);
    let timeObj = {};
    axiosGet(companyHoursEndpoint, jwt)
      .then(result => {
        const { data } = result;
        if (data !== {}) {
          delete data.created;
          delete data.updated;
          for (let key in data) {
            /**
             * If the last 4 letters of the key are
             * time we know that its a time property
             * and we will format the time
             */
            if (
              key.slice(key.length - 4).toLowerCase() === "time" &&
              data[key]
            ) {
              /**
               * Moment will format the time to an acceptable
               * string for Date()
               */
              timeObj[key] = new Date(
                // Moment formats the value
                moment(data[key], "HH:mm:ss")
                  // Tell moment that it's a UTC time
                  .utc(true)
                  // Convert the UTC time to local time
                  .local()
                  // Format it to a string
                  .format()
              );
            } else {
              /**
               * Else it's another property
               * as of writing this now the only
               * other properties returned from
               * this api response is isOpen<day_of_week>
               */
              timeObj[key] = data[key];
            }
          }

          // Set the state
          this.setState({ time: timeObj, isLoading: false });
        }
        console.log(this.state);
      })
      .catch(err => {
        console.log("err getting business hours", err);
      });
  }

  render() {
    console.log(this.state);
    /**
     * If this.state.time exists
     * destructor all of the values
     * returned from the api call.
     *
     * IMPORTANT!!
     * All of these are of type Date()
     */
    if (this.state.time) {
      var {
        fridayCloseUtcTime,
        fridayOpenUtcTime,
        id,
        isOpenFriday,
        isOpenMonday,
        isOpenSaturday,
        isOpenSunday,
        isOpenThursday,
        isOpenTuesday,
        isOpenWednesday,
        mondayCloseUtcTime,
        mondayOpenUtcTime,
        saturdayCloseUtcTime,
        saturdayOpenUtcTime,
        sundayCloseUtcTime,
        sundayOpenUtcTime,
        thursdayCloseUtcTime,
        thursdayOpenUtcTime,
        tuesdayCloseUtcTime,
        tuesdayOpenUtcTime,
        wednesdayCloseUtcTime,
        wednesdayOpenUtcTime
      } = this.state.time;
      // For debugging prints out the time from the
      // Date() object
      // console.log(sundayCloseUtcTime.toTimeString());
    }
    const { isLoading } = this.state;
    return isLoading ? null : (
      <>
        {/* THIS WORKS OUTSIDE THE FORM
        THE FORM IS STYLING PART OF THIS COMPONENT */}
        <DateTime
          dateFormat={false}
          inputProps={{
            className: "form-control",
            placeholder: "Select Time"
          }}
          onChange={val => console.log("changed", val)}
        />
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
                          {/* <Input defaultValue={Monday.openTime} /> */}

                          <DateTime
                            dateFormat={false}
                            inputProps={{
                              className: "form-control",
                              placeholder: "Select Time"
                            }}
                            onChange={val => console.log("changed", val)}
                          />
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
