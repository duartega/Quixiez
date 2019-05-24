import React, { ChangeEventHandler } from "react";

import {
  Button,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  FormGroup,
  Form,
  Input,
  Row,
  Col,
  Label
} from "reactstrap";

interface Props {
  streetDefaultValue: string;
  cityDefaultValue: string;
  stateDefaultValue: string;
  zipDefaultValue: string;
  onChange: ChangeEventHandler;
  onClick: React.MouseEventHandler<any>;
  showStreet: boolean;
}

export const Address = (props: Props) => {
  const {
    streetDefaultValue,
    cityDefaultValue,
    stateDefaultValue,
    zipDefaultValue,
    onChange,
    onClick,
    showStreet
  } = props;
  return (
    <Row className="mx-xl-xl">
      <Col>
        <Card>
          <CardHeader>
            <h2 className="title">Company Address</h2>
          </CardHeader>
          <CardBody>
            <Form>
              <Row>
                <Col className="px-md-3" md="12">
                  <FormGroup>
                    <label>Company Address</label>
                    <Input
                      defaultValue={streetDefaultValue}
                      type="text"
                      name="street"
                      onChange={onChange}
                      placeholder="No Address Set"
                    />
                  </FormGroup>
                </Col>
              </Row>
              <Row>
                <Col className="pr-md-1" md="4">
                  <FormGroup>
                    <label>City</label>
                    <Input
                      placeholder="No City Set"
                      defaultValue={cityDefaultValue}
                      type="text"
                      name="city"
                      onChange={onChange}
                    />
                  </FormGroup>
                </Col>
                <Col className="px-md-1" md="4">
                  <FormGroup>
                    <label>State</label>
                    <Input
                      placeholder="No State Set"
                      defaultValue={stateDefaultValue}
                      type="text"
                      name="state"
                      onChange={onChange}
                    />
                  </FormGroup>
                </Col>
                <Col className="pl-md-1" md="4">
                  <FormGroup>
                    <label>Postal Code</label>
                    <Input
                      placeholder="No Postal Code Set"
                      defaultValue={zipDefaultValue}
                      type="number"
                      name="zip"
                      onChange={onChange}
                    />
                  </FormGroup>
                </Col>
                <Col className="pl-md-3" md="4">
                  <FormGroup check>
                    <Label check>
                      <Input
                        defaultChecked={showStreet}
                        type="checkbox"
                        // value={this.state.showStreet}
                        name="showStreet"
                        onChange={onChange}
                      />
                      <span className="form-check-sign" />
                      Show Street Address?
                    </Label>
                  </FormGroup>
                </Col>
              </Row>
            </Form>
          </CardBody>
          <CardFooter className="text-right">
            <Button
              className="btn-fill"
              color="success"
              type="submit"
              onClick={onClick}
            >
              Save
            </Button>
          </CardFooter>
        </Card>
      </Col>
    </Row>
  );
};
