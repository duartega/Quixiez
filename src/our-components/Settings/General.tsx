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
  Col
} from "reactstrap";

interface Props {
  companyNameDefaultValue: string;
  quixiezNumberDefaultValue: string;
  phoneNumberDefaultValue: string;
  emailDefaultValue: string;
  websiteUrlDefaultValue: string;

  onChange: ChangeEventHandler;
  onClick: React.MouseEventHandler<any>;
}

export const General = (props: Props) => {
  const {
    companyNameDefaultValue,
    quixiezNumberDefaultValue,
    phoneNumberDefaultValue,
    emailDefaultValue,
    websiteUrlDefaultValue,
    onChange,
    onClick
  } = props;

  return (
    <Row className="mx-xl-xl">
      <Col>
        <Card>
          <CardHeader>
            <h2 className="title">Company Overview</h2>
          </CardHeader>
          <CardBody>
            <Form>
              <Row>
                <Col className="pr-md-1" md="5">
                  <FormGroup>
                    <label>Company</label>
                    <Input
                      defaultValue={companyNameDefaultValue}
                      type="text"
                      name="companyName"
                      onChange={onChange}
                      placeholder="No Company Name Set"
                    />
                  </FormGroup>
                </Col>
                <Col className="px-md-1" md="3">
                  <FormGroup>
                    <label>Quixiez Number</label>
                    {/* should change to number */}

                    <Input
                      placeholder="No Phone Number Set"
                      defaultValue={quixiezNumberDefaultValue}
                      type="text"
                      name="quixiezNumber"
                      onChange={onChange}
                    />
                  </FormGroup>
                </Col>
                <Col className="pl-md-1" md="4">
                  <FormGroup>
                    <label>Bussiness Number</label>

                    <Input
                      placeholder="No Phone Number Set"
                      defaultValue={phoneNumberDefaultValue}
                      type="text"
                      name="phoneNumber"
                      onChange={onChange}
                    />
                  </FormGroup>
                </Col>
              </Row>
              <Row>
                <Col className="pr-md-1" md="6">
                  <FormGroup>
                    <label>Business Email</label>

                    <Input
                      placeholder="No Email Set"
                      defaultValue={emailDefaultValue}
                      type="email"
                      name="email"
                      onChange={onChange}
                    />
                  </FormGroup>
                </Col>
                <Col className="pl-md-1" md="6">
                  <FormGroup>
                    <label>Business Website</label>

                    <Input
                      placeholder="No Website Set"
                      defaultValue={websiteUrlDefaultValue}
                      type="url"
                      name="websiteUrl"
                      onChange={onChange}
                    />
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
