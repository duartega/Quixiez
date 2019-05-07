import React from "react";
// nodejs library that concatenates classes
import classNames from "classnames";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Grid from "@material-ui/core/Grid";

// core components
import Header from "components/Theme/Header/Header";
import HeaderLinks from "components/Theme/Header/HeaderLinks";
import Parallax from "components/Theme/Parallax/Parallax";
import Footer from "components/Theme/Footer/Footer";
import GridContainer from "components/Theme/Grid/GridContainer";
import GridItem from "components/Theme/Grid/GridItem";
import Button from "components/Theme/CustomButtons/Button";
import ImageUpload from "components/Theme/CustomUpload/ImageUpload";

import uploadPageStyle from "assets/jss/styles/uploadPageStyle";
import { userImageUploadUrl } from "routes/endpoints";

class UploadPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      file: null,
      validParams: null
    };
    this.urlParams = new URLSearchParams(window.location.search);
  }

  componentDidMount() {
    // window.scrollTo(0, 0);
    // document.body.scrollTop = 0;
    this.verifyUrlParams();
  }

  verifyUrlParams = () => {
    const user_id = this.urlParams.get("user_id");
    const image_type = this.urlParams.get("image_type");

    /**
     * dl_image
     * rec_image
     */
    if (
      (user_id && image_type && image_type === "dl_image") ||
      image_type === "rec_image"
    ) {
      const validParams = { image_type, user_id };
      this.setState({ validParams });
    } else {
      this.setState({ validParams: false });
    }
  };

  fileCallback = file => {
    this.setState({ file });
  };

  /**
     * handleSubmit = async () => {
    this.setState({ loading: true });
    const formData = new FormData();
    if (this.state.file) {
      formData.append("image", this.state.file);
    }
    try {
      const response = await fetch(imageUploadUri, {
        body: formData,
        method: "POST"
      });
      console.log(await response.json());
    } catch (e) {
      console.warn(e);
    }

    this.setState({ loading: false });
};
     */
  handleSubmit = async e => {
    e.preventDefault();
    const {
      file,
      validParams: { user_id, image_type }
    } = this.state;
    const formData = new FormData();
    if (file) {
      formData.append("image", file);
      try {
        const response = await fetch(userImageUploadUrl(user_id, image_type), {
          body: formData,
          method: "POST"
        });
        const responseJson = await response.json();
        console.log(responseJson);
        alert("Image uploaded");
      } catch (e) {
        console.log("error", e);
      }
    }
  };

  render() {
    const { classes } = this.props;
    return this.state.validParams !== false ? (
      <div>
        <Header
          brand="Material Kit PRO React"
          links={<HeaderLinks dropdownHoverColor="info" />}
          fixed
          color="transparent"
          changeColorOnScroll={{
            height: 400,
            color: "info"
          }}
        />
        <Parallax
          image={require("assets/img/bg4.jpg")}
          className={classes.parallax}
        >
          <div className={classes.container}>
            <GridContainer
              container
              direction="row"
              justify="center"
              alignItems="center"
            >
              <Grid item>
                <ImageUpload fileCallback={this.fileCallback} />
              </Grid>
            </GridContainer>
            <GridContainer
              container
              direction="row"
              justify="center"
              alignItems="center"
            >
              <Grid item>
                <Button onClick={e => this.handleSubmit(e)}>Submit</Button>
              </Grid>
            </GridContainer>
          </div>
        </Parallax>

        <Footer
          theme="white"
          content={
            <div>
              <div className={classes.left}>
                <a
                  href="https://www.creative-tim.com/product/material-kit-pro-react"
                  className={classes.footerBrand}
                >
                  Material Kit PRO React
                </a>
              </div>
              <div className={classes.pullCenter}>
                <List className={classes.list}>
                  <ListItem className={classes.inlineBlock}>
                    <a
                      href="https://www.creative-tim.com/"
                      className={classes.block}
                    >
                      Creative Tim
                    </a>
                  </ListItem>
                  <ListItem className={classes.inlineBlock}>
                    <a
                      href="https://www.creative-tim.com/presentation"
                      className={classes.block}
                    >
                      About us
                    </a>
                  </ListItem>
                  <ListItem className={classes.inlineBlock}>
                    <a
                      href="//blog.creative-tim.com/"
                      className={classes.block}
                    >
                      Blog
                    </a>
                  </ListItem>
                  <ListItem className={classes.inlineBlock}>
                    <a
                      href="https://www.creative-tim.com/license"
                      className={classes.block}
                    >
                      Licenses
                    </a>
                  </ListItem>
                </List>
              </div>
              <div className={classes.rightLinks}>
                <ul>
                  <li>
                    <Button
                      href="https://twitter.com/CreativeTim"
                      color="twitter"
                      justIcon
                      simple
                    >
                      <i className="fab fa-twitter" />
                    </Button>
                  </li>
                  <li>
                    <Button
                      href="https://dribbble.com/creativetim"
                      color="dribbble"
                      justIcon
                      simple
                    >
                      <i className="fab fa-dribbble" />
                    </Button>
                  </li>
                  <li>
                    <Button
                      href="https://instagram.com/CreativeTimOfficial"
                      color="instagram"
                      justIcon
                      simple
                    >
                      <i className="fab fa-instagram" />
                    </Button>
                  </li>
                </ul>
              </div>
            </div>
          }
        />
      </div>
    ) : (
      <h1>Invalid url</h1>
    );
  }
}

export default withStyles(uploadPageStyle)(UploadPage);
