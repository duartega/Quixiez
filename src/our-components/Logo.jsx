import React from 'react';

export class Logo extends React.Component {
  render() {
    return (
      <img
      alt="..."
      src={require("../assets/img/logo.svg")}
      // this doesnt work on centering the image. I also tried this on the cardheader
      style = {{display: "block", width: "50%", justifyContent: "center", alignContent: "center"}}
    />
    )
  };
}