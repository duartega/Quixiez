import React from "react";
import { Route, Switch } from "react-router-dom";
// javascript plugin used to create scrollbars on windows
import PerfectScrollbar from "perfect-scrollbar";
// react plugin for creating notifications over the dashboard
import NotificationAlert from "react-notification-alert";

// core components
import AdminNavbar from "components/Navbars/AdminNavbar.jsx";
// import Footer from "components/Footer/Footer.jsx";
import Sidebar from "our-components/Layout/Admin/Sidebar";
// This is the settings button on the side
import FixedPlugin from "components/FixedPlugin/FixedPlugin.jsx";

import routes from "./routes";

import logo from "assets/img/react-logo.png";
import {
  // receiveMessage,
  handleIncomingQueText,
  stopListening,
  handleIncomingMessagesMarkedRead
} from "sockets/Socket";
import { axiosGet } from "../../../network/ApiCalls";
import { getAllConversations, getQueTextUnread } from "../../../network/routes";
/**
 * Redux imports
 */

import { connect } from "react-redux";
import {
  setAllConversations,
  updateConversations,
  setConversationReadUnread,
  // updateConversationsReadBy
  setConversationRead
} from "../../../redux/actions/conversations";
import { INCOMING_QUE_TEXT } from "sockets/events/Events";
import { setCompanyUser } from "redux/actions";

var ps;

class Admin extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeColor: "blue",
      sidebarMini: true,
      opacity: 0,
      sidebarOpened: false
    };
  }
  componentDidMount() {
    // console.log("OUR ADMIN LAYOUT WILL MOUNT");
    if (navigator.platform.indexOf("Win") > -1) {
      document.documentElement.className += " perfect-scrollbar-on";
      document.documentElement.classList.remove("perfect-scrollbar-off");
      ps = new PerfectScrollbar(this.refs.mainPanel);
      let tables = document.querySelectorAll(".table-responsive");
      for (let i = 0; i < tables.length; i++) {
        ps = new PerfectScrollbar(tables[i]);
      }
    }
    window.addEventListener("scroll", this.showNavbarButton);

    const { updateConversations } = this.props;

    handleIncomingMessagesMarkedRead(queText => {
      console.log("handleIncomingMessagesMarkedRead");
      // console.log(queText);
      // Not working
      console.log(queText);
      // setConversationRead(queText);
    });

    handleIncomingQueText(queText => {
      console.log("INCOMING QUETEXT...");

      updateConversations(queText, alertType => {
        if (alertType === "NEW_MESSAGE") {
          let options = {};
          options = {
            place: "tr",
            message: "New Message!",
            type: "primary",
            icon: "tim-icons icon-bell-55",
            autoDismiss: 7
          };

          this.refs.notificationAlert.notificationAlert(options);
        } else if (alertType === "NEW_ORDER") {
          let options = {};
          options = {
            place: "tr",
            message: "New Order!",
            type: "primary",
            icon: "tim-icons icon-bell-55",
            autoDismiss: 7
          };

          this.refs.notificationAlert.notificationAlert(options);
        }
      });
    });

    axiosGet(getAllConversations)
      .then(result => {
        const { data } = result;
        const { setAllConversations, updateConversations } = this.props;

        setAllConversations(data);
        console.log(data);
      })
      .catch(err => {
        console.log(err, err.response);
      });

    axiosGet(getQueTextUnread)
      .then(result => {
        const { data } = result;
        const { setConversationReadUnread } = this.props;
        setConversationReadUnread(data);
      })
      .catch(err => {
        console.log("err getting unread", err);
      });

    this.props.setCompanyUser();
  }
  componentWillUnmount() {
    console.log("OUR ADMIN LAYOUR WILL UNMOUNT");
    stopListening(INCOMING_QUE_TEXT);
    if (navigator.platform.indexOf("Win") > -1) {
      ps.destroy();
      document.documentElement.className += " perfect-scrollbar-off";
      document.documentElement.classList.remove("perfect-scrollbar-on");
    }
    window.removeEventListener("scroll", this.showNavbarButton);
  }
  componentDidUpdate(e) {
    if (e.location.pathname !== e.history.location.pathname) {
      if (navigator.platform.indexOf("Win") > -1) {
        let tables = document.querySelectorAll(".table-responsive");
        for (let i = 0; i < tables.length; i++) {
          ps = new PerfectScrollbar(tables[i]);
        }
      }
      document.documentElement.scrollTop = 0;
      document.scrollingElement.scrollTop = 0;
      this.refs.mainPanel.scrollTop = 0;
    }
  }
  showNavbarButton = () => {
    if (
      document.documentElement.scrollTop > 50 ||
      document.scrollingElement.scrollTop > 50 ||
      this.refs.mainPanel.scrollTop > 50
    ) {
      this.setState({ opacity: 1 });
    } else if (
      document.documentElement.scrollTop <= 50 ||
      document.scrollingElement.scrollTop <= 50 ||
      this.refs.mainPanel.scrollTop <= 50
    ) {
      this.setState({ opacity: 0 });
    }
  };
  getRoutes = routes => {
    return routes.map((prop, key) => {
      if (prop.collapse) {
        return this.getRoutes(prop.views);
      }
      if (prop.layout === "/admin") {
        return (
          <Route
            exact={prop.exact ? prop.exact : false}
            path={prop.layout + prop.path}
            component={prop.component}
            key={key}
          />
        );
      } else {
        return null;
      }
    });
  };
  getActiveRoute = routes => {
    let activeRoute = "Joe's Super Cool Company";
    for (let i = 0; i < routes.length; i++) {
      if (routes[i].collapse) {
        let collapseActiveRoute = this.getActiveRoute(routes[i].views);
        if (collapseActiveRoute !== activeRoute) {
          return collapseActiveRoute;
        }
      } else {
        if (
          window.location.pathname.indexOf(
            routes[i].layout + routes[i].path
          ) !== -1
        ) {
          return routes[i].name;
        }
      }
    }
    return activeRoute;
  };
  handleActiveClick = color => {
    this.setState({ activeColor: color });
  };
  handleMiniClick = () => {
    let notifyMessage = "Sidebar mini ";
    if (document.body.classList.contains("sidebar-mini")) {
      this.setState({ sidebarMini: false });
      notifyMessage += "deactivated...";
    } else {
      this.setState({ sidebarMini: true });
      notifyMessage += "activated...";
    }
    let options = {};
    options = {
      place: "tr",
      message: notifyMessage,
      type: "primary",
      icon: "tim-icons icon-bell-55",
      autoDismiss: 7
    };
    this.refs.notificationAlert.notificationAlert(options);
    document.body.classList.toggle("sidebar-mini");
  };
  toggleSidebar = () => {
    this.setState({
      sidebarOpened: !this.state.sidebarOpened
    });
    document.documentElement.classList.toggle("nav-open");
  };
  closeSidebar = () => {
    this.setState({
      sidebarOpened: false
    });
    document.documentElement.classList.remove("nav-open");
  };
  render() {
    return (
      <div className="wrapper">
        <div className="rna-container">
          <NotificationAlert ref="notificationAlert" />
        </div>
        <div
          className="navbar-minimize-fixed"
          style={{ opacity: this.state.opacity }}
        >
          <button
            className="minimize-sidebar btn btn-link btn-just-icon"
            onClick={this.handleMiniClick}
          >
            <i className="tim-icons icon-align-center visible-on-sidebar-regular text-muted" />
            <i className="tim-icons icon-bullet-list-67 visible-on-sidebar-mini text-muted" />
          </button>
        </div>
        <Sidebar
          {...this.props}
          routes={routes}
          activeColor={this.state.activeColor}
          logo={{
            outterLink:
              "https://demos.creative-tim.com/black-dashboard-pro-react/?&_ga=2.12442612.1976718851.1558454868-563319751.1556902745#/documentation/tutorial",
            text: "Documentation",
            imgSrc: logo
          }}
          closeSidebar={this.closeSidebar}
        />
        <div
          className="main-panel"
          ref="mainPanel"
          data={this.state.activeColor}
        >
          <AdminNavbar
            {...this.props}
            handleMiniClick={this.handleMiniClick}
            brandText={this.getActiveRoute(routes)}
            sidebarOpened={this.state.sidebarOpened}
            toggleSidebar={this.toggleSidebar}
          />
          <Switch>{this.getRoutes(routes)}</Switch>
          {/* {// we don't want the Footer to be rendered on full screen maps page
          this.props.location.pathname.indexOf("full-screen-map") !==
          -1 ? null : (
            <Footer fluid />
          )} */}
        </div>
        <FixedPlugin
          activeColor={this.state.activeColor}
          sidebarMini={this.state.sidebarMini}
          handleActiveClick={this.handleActiveClick}
          handleMiniClick={this.handleMiniClick}
        />
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  setAllConversations: conversations =>
    dispatch(setAllConversations(conversations)),

  updateConversations: (conversation, callback, updateType) =>
    dispatch(updateConversations(conversation, callback, updateType)),

  setCompanyUser: () => dispatch(setCompanyUser()),

  setConversationReadUnread: queTextUnread =>
    dispatch(setConversationReadUnread(queTextUnread))

  // updateConversationsReadBy: conversation =>
  //   dispatch(updateConversationsReadBy(conversation))
});

export default connect(
  null,
  mapDispatchToProps
)(Admin);
