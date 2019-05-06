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

class UploadPage extends React.Component {
  constructor(props) {
    super(props);
    this.imageUploader = React.createRef();
  }
  componentDidMount() {
    window.scrollTo(0, 0);
    document.body.scrollTop = 0;
  }
  render() {
    const { classes } = this.props;
    return (
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
                <ImageUpload ref={this.imageUploader} />
              </Grid>
            </GridContainer>
            <GridContainer
              container
              direction="row"
              justify="center"
              alignItems="center"
            >
              <Grid item>
                <Button
                  onClick={() => this.imageUploader.current.handleSubmit()}
                >
                  Submit
                </Button>
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
    );
  }
}

export default withStyles(uploadPageStyle)(UploadPage);
