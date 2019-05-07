import React from "react";
import ReactDOM from "react-dom";
import { createBrowserHistory } from "history";
import { Router, Route, Switch } from "react-router";
import SingleMessagePage from "views/SingleMessagePage/SingleMessagePage";
import "assets/scss/material-kit-pro-react.scss?v=1.3.0";

// pages for this product

import UploadPage from "views/UploadPage/UploadPage.jsx";
import MessagePage from "views/MessagePage/MessagePage";
var hist = createBrowserHistory();

ReactDOM.render(
  <Router history={hist}>
    <Switch>
      <Route path="/upload" component={UploadPage} />
      {/* <Route exact path="/" component={MessagePage} /> */}
      {/* <Route path="/message" component={SingleMessagePage} /> */}
    </Switch>
  </Router>,
  document.getElementById("root")
);
