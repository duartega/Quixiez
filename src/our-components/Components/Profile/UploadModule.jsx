import React from "react";
// used for making the prop types of this component
import PropTypes from "prop-types";

import { Button } from "reactstrap";

import defaultImage from "assets/img/image_placeholder.jpg";
import defaultAvatar from "assets/img/placeholder.jpg";
import ReactBSAlert from "react-bootstrap-sweetalert";

class ImageUpload extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      file: null,
      imagePreviewUrl: this.props.avatar ? defaultAvatar : defaultImage,
      count: 0,
      alert: null
    };
    this.handleImageChange = this.handleImageChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleRemove = this.handleRemove.bind(this);
  }
  handleImageChange(e) {
    e.preventDefault();
    let reader = new FileReader();
    let file = e.target.files[0];
    reader.onloadend = () => {
      this.setState({
        file: file,
        imagePreviewUrl: reader.result
      });
    };
    reader.readAsDataURL(file);
  }
  handleSubmit() {
    // this.state.file is the file/image uploaded

    // TODO: This is where you will use the axiosPost to submit the images to the DB
    // this.autoCloseAlert(); // Call this when axios is done resloving
    // setTimeout(this.hideAlert, 2000); // Example of auto close



  }

  errorInUploading = () => {
    this.setState({
      alert: (
        <ReactBSAlert
          danger
          style={{ display: "block", marginTop: "-100px" }}
          title="There was an error with your upload..."
          onConfirm={() => this.hideAlert()}
          showConfirm={false}
        >
          Please try again in a few seconds...
        </ReactBSAlert>
      )
    });
  };

  autoCloseAlert = () => {
    this.setState({
      alert: (
        <ReactBSAlert
          loading
          style={{ display: "block", marginTop: "-100px" }}
          title="Your image is uploading..."
          onConfirm={() => this.hideAlert()}
          showConfirm={false}
        >
        
          This may take a few seconds...
        </ReactBSAlert>
      )
    });
  };

  hideAlert = () => {
    this.setState({
      alert: null
    });
  };

  handleClick() {
    this.refs.fileInput.click();
  }

  handleRemove() {
    this.setState({
      file: null,
      imagePreviewUrl: this.props.avatar ? defaultAvatar : defaultImage
    });
    this.refs.fileInput.value = null;
  }
  render() {
    if (this.state.file && this.state.count === 0) {
      this.handleSubmit();
    }

    
    return (
      <div className="fileinput text-center">
      {this.state.alert}
        <input type="file" onChange={this.handleImageChange} ref="fileInput" />
        <div className={"thumbnail" + (this.props.avatar ? " img-circle" : "")}>
          <img src={this.state.imagePreviewUrl} style={{maxWidth: "50%"}} alt="..." />
        </div>
        <div>
          {this.state.file === null ? (
            <Button
              color={this.props.addBtnColor}
              className={this.props.addBtnClasses}
              onClick={() => this.handleClick()}
            >
              {this.props.avatar ? "Add Photo" : "Select image"}
            </Button>
          ) : (
            <span>
              <Button
                color={this.props.changeBtnColor}
                className={this.props.changeBtnClasses}
                onClick={() => this.handleClick()}
              >
                Change
              </Button>
              {this.props.avatar ? <br /> : null}
              <Button
                color={this.props.removeBtnColor}
                className={this.props.removeBtnClasses}
                onClick={() => this.handleRemove()}
              >
                <i className="fa fa-times" /> Remove
              </Button>
            </span>
          )}
        </div>
      </div>
    );
  }
}

ImageUpload.defaultProps = {
  avatar: false,
  removeBtnClasses: "btn-round",
  removeBtnColor: "danger",
  addBtnClasses: "btn-round",
  addBtnColor: "primary",
  changeBtnClasses: "btn-round",
  changeBtnColor: "primary"
};

ImageUpload.propTypes = {
  avatar: PropTypes.bool,
  removeBtnClasses: PropTypes.string,
  removeBtnColor: PropTypes.oneOf([
    "default",
    "primary",
    "secondary",
    "success",
    "info",
    "warning",
    "danger",
    "link"
  ]),
  addBtnClasses: PropTypes.string,
  addBtnColor: PropTypes.oneOf([
    "default",
    "primary",
    "secondary",
    "success",
    "info",
    "warning",
    "danger",
    "link"
  ]),
  changeBtnClasses: PropTypes.string,
  changeBtnColor: PropTypes.oneOf([
    "default",
    "primary",
    "secondary",
    "success",
    "info",
    "warning",
    "danger",
    "link"
  ])
};

export default ImageUpload;
