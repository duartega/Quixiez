import React from "react";
import ReactDOM from "react-dom";
import { createBrowserHistory } from "history";
import { Router, Route, Switch, Redirect } from "react-router-dom";

// import AuthLayout from "layouts/Auth/Auth.jsx";
import AdminLayout from "layouts/Admin/Admin.jsx";
import RTLLayout from "layouts/RTL/RTL.jsx";
import Test from "layouts/Test/Test.jsx";

import "assets/css/nucleo-icons.css";
import "assets/scss/black-dashboard-pro-react.scss?v=1.0.0";
import "assets/demo/demo.css";
import "react-notification-alert/dist/animate.css";
import "routes.js";
import Login from "Login";
import store from "./redux/store";
import { Provider } from "react-redux";

import Register from "views/pages/Register";
import RegisterCompany from 'views/pages/RegisterCompany'
import RegisterWithCompany from 'views/pages/RegisterWithCompany'
import RegisterACompany from 'views/pages/CreateCompany'
import DashBoard from "views/Dashboard";
import Settings from "views/pages/GeneralSettings";
import Invite from "views/pages/InviteEmployee";
import Hours from "views/pages/BusinessHours";
<<<<<<< Updated upstream



=======
import Conversations from "views/pages/Conversations";
import AllConversations from "views/pages/AllConversations";
import ConversationsList from './our-components/Tables/ConversationsList';
>>>>>>> Stashed changes

const hist = createBrowserHistory();

const Root = ({ store }) => (
  <Provider store={store}>
    <Router history={hist}>
      <Switch>
        <Route path="/auth" render={props => <Login {...props} />} />
        <Route path="/admin" render={props => <AdminLayout {...props} />} />
        <Route path="/rtl" render={props => <RTLLayout {...props} />} />
        <Route path="/test" render={props => <Test {...props} />} />
        <Route path="/register" render={props => <Register {...props} />} />
        <Route path="/registerCompany" render={props => <RegisterCompany {...props} />} />
        <Route path="/registerACompany" render={props => <RegisterACompany {...props} />} />
        <Route path="/registerWithCompany" render={props => <RegisterWithCompany {...props} />} />
        <Route path="/dashboard" render={props => <DashBoard {...props} />} />
        <Route path="/settings" render={props => <Settings {...props} />} />
        <Route path="/hours" render={props => <Hours {...props} />} />
        <Route path="/invite" render={props => <Invite {...props} />} />
        <Route
          path="/conversations"
          render={props => <Conversations {...props} />}
        />
        <Route
          path="/allconversations"
          render={props => <AllConversations {...props} />}
        />

        <Route
          path="/list"
          render={props => <ConversationsList {...props} />}
        />

        {/* <Route path="/registerWithCompany" render={props => <RegisterCompany {...props} />} /> */}
        <Redirect from="/" to="/admin/dashboard" />

        <Route path="/auth" render={props => <Login />} />
      </Switch>
    </Router>
  </Provider>
);

ReactDOM.render(<Root store={store} />, document.getElementById("root"));
