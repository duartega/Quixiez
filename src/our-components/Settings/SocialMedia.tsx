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
  facebookDefaultValue: string;
  handleChange: ChangeEventHandler;
  instagramDefaultValue: string;
  twitterDefaultValue: string;
  snapchatDefaultValue: string;
  onButtonClick: React.MouseEventHandler<any>;
}

export const SocialMedia = (props: Props) => {
  const {
    facebookDefaultValue,
    handleChange,
    instagramDefaultValue,
    twitterDefaultValue,
    snapchatDefaultValue,
    onButtonClick
  } = props;
  return (
    <div className="content">
      <Row className="mx-xl-xl">
        <Col>
          <Card>
            <CardHeader>
              <h2 className="title">Social Media Links</h2>
            </CardHeader>
            <CardBody>
              <Form>
                <Row>
                  <Col className="pr-md-1" md="6">
                    <FormGroup>
                      <label>Facebook URL</label>
                      <Input
                        placeholder="www.facebook.com/"
                        defaultValue={facebookDefaultValue}
                        type="url"
                        name="facebook"
                        onChange={handleChange}
                      />
                    </FormGroup>
                  </Col>
                  <Col className="pl-md-1" md="6">
                    <FormGroup>
                      <label>Instagram Username</label>
                      <Input
                        placeholder="www.instagram.com/"
                        defaultValue={instagramDefaultValue}
                        type="url"
                        name="instagram"
                        onChange={handleChange}
                      />
                    </FormGroup>
                  </Col>
                </Row>

                <Row>
                  <Col className="pr-md-1" md="6">
                    <FormGroup>
                      <label>Twitter Username</label>
                      <Input
                        placeholder="www.twitter.com/"
                        defaultValue={twitterDefaultValue}
                        type="url"
                        name="twitter"
                        onChange={handleChange}
                      />
                    </FormGroup>
                  </Col>
                  <Col className="pl-md-1" md="6">
                    <FormGroup>
                      <label>Snapchat Username</label>
                      <Input
                        placeholder="@username"
                        defaultValue={snapchatDefaultValue}
                        type="url"
                        name="snapchat"
                        onChange={handleChange}
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
                onClick={onButtonClick}
              >
                Save
              </Button>
            </CardFooter>
          </Card>
        </Col>
      </Row>
    </div>
  );
};
