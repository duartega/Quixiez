import React from "react";
import ReactDOM from "react-dom";
import { createBrowserHistory } from "history";
import { Router, Route, Switch, Redirect } from "react-router-dom";

// import AuthLayout from "layouts/Auth/Auth.jsx";
import AdminLayout from "./our-components/Layout/Admin/Admin";
import RTLLayout from "layouts/RTL/RTL.jsx";
import Test from "../src/our-components/Test/Test";

import "assets/css/nucleo-icons.css";
import "assets/scss/black-dashboard-pro-react.scss?v=1.0.0";
import "assets/demo/demo.css";
import "react-notification-alert/dist/animate.css";
import "assets/css/our-custom.css";
import "routes.js";
import Login from "our-components/Pages/Login";
import store from "./redux/store";
import { Provider } from "react-redux";

import Register from "our-components/Pages/Register";
import RegisterCompany from "our-components/Pages/RegisterCompany";
import RegisterWithCompany from "our-components/Pages/RegisterWithCompany";
import RegisterACompany from "our-components/Pages/CreateCompany";
import Invite from "our-components/Pages/InviteEmployee";

// Testing purposes while the api is down
import AllConvos from './our-components/Pages/AllConversations';
import Convos from './our-components/Components/Conversations List/ConversationList';
import CL from './our-components/Components/Conversations List/ConversationCell';


const hist = createBrowserHistory();

const Root = ({ store }) => (
  <Provider store={store}>
    <Router history={hist}>
      <Switch>
        {/*
         * Auth is for handling login...
         */}
        <Route path="/auth" render={props => <Login {...props} />} />
        {/*
         * HIT THE ADMIN LAYOUT (PRIMARY LAYOUT)
         */}
        <Route path="/admin" render={props => <AdminLayout {...props} />} />

        {/* <Route path="/rtl" render={props => <RTLLayout {...props} />} /> */}
        <Route path="/test" render={props => <Test {...props} />} />
        {/*  */}
        <Route path="/register" render={props => <Register {...props} />} />

        {/* After registering from /register you are directed here */}
        <Route
          path="/registerCompany"
          render={props => <RegisterCompany {...props} />}
        />
        {/* A result of what you pick */}
        <Route
          path="/registerACompany"
          render={props => <RegisterACompany {...props} />}
        />
        {/* A result of what you pick */}
        <Route
          path="/registerWithCompany"
          render={props => <RegisterWithCompany {...props} />}
        />

        {/* TODO: We need to include this in the layout... */}
        <Route path="/invite" render={props => <Invite {...props} />} />

        <Route path="/list" render={props => <CL {...props} />} />
        <Route path="/convos" render={props => <Convos {...props} />} />


        {/* Redirect the user to login */}
        <Redirect from="/" to="/auth" />
      </Switch>
    </Router>
  </Provider>
);

ReactDOM.render(<Root store={store} />, document.getElementById("root"));
