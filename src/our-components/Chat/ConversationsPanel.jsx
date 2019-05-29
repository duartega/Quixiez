import React from "react";
import Conversations from '../Tables/ConversationsList';

// reactstrap components
import {
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  Collapse,
  NavItem,
  NavLink,
  Nav,
  TabContent,
  TabPane,
  Row,
  Col
} from "reactstrap";

class Panels extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      horizontalTabs: "profile",
      verticalTabs: "profile",
      verticalTabsIcons: "home",
      pageTabs: "home",
      openedCollapses: ["collapseOne"]
    };
  }
  // with this function we create an array with the opened collapses
  // it is like a toggle function for all collapses from this page
  collapsesToggle = (e, collapse) => {
    e.preventDefault();
    let openedCollapses = this.state.openedCollapses;
    if (openedCollapses.includes(collapse)) {
      this.setState({
        openedCollapses: openedCollapses.filter(item => item !== collapse)
      });
    } else {
      openedCollapses.push(collapse);
      this.setState({
        openedCollapses: openedCollapses
      });
    }
  };
  // with this function we change the active tab for all the tabs in this page
  changeActiveTab = (e, tabState, tadName) => {
    e.preventDefault();
    this.setState({
      [tabState]: tadName
    });
  };
  render() {
    return (
      <>
        <div className="content">
          <Row>
            <Col className="ml-auto mr-auto" md="8">
              <Card className="card-plain card-subcategories">
                <CardHeader>
                  <CardTitle className="text-center mt-5" tag="h4">
                    Conversations
                  </CardTitle>
                  <br />
                </CardHeader>
                <CardBody>
                  {/* color-classes: "nav-pills-primary", "nav-pills-info", "nav-pills-success", "nav-pills-warning","nav-pills-danger" */}
                  <Nav
                    className="nav-pills-info nav-pills-icons justify-content-center "
                    pills
                  >
                    <NavItem>
                      <NavLink
                        data-toggle="tab"
                        href="#pablo"
                        className={
                          this.state.pageTabs === "home" ? "active" : ""
                        }
                        onClick={e =>
                          this.changeActiveTab(e, "pageTabs", "home")
                        }
                      >
                        <i className="tim-icons icon-istanbul" />
                        Completed
                      </NavLink>
                    </NavItem>
                    <NavItem>
                      <NavLink
                        data-toggle="tab"
                        href="#pablo"
                        className={
                          this.state.pageTabs === "messages" ? "active" : ""
                        }
                        onClick={e =>
                          this.changeActiveTab(e, "pageTabs", "messages")
                        }
                      >
                        <i className="tim-icons icon-bag-16" />
                        In Progress
                      </NavLink>
                    </NavItem>
                    <NavItem>
                      <NavLink
                        data-toggle="tab"
                        href="#pablo"
                        className={
                          this.state.pageTabs === "settings" ? "active" : ""
                        }
                        onClick={e =>
                          this.changeActiveTab(e, "pageTabs", "settings")
                        }
                      >
                        <i className="tim-icons icon-settings" />
                        Rejected
                      </NavLink>
                    </NavItem>
                  </Nav>
                  <TabContent
                    className="tab-space tab-subcategories"
                    activeTab={this.state.pageTabs}
                  >
                    <TabPane tabId="home">
                      <Conversations />
                      <div>test</div>
                    </TabPane>
                    <TabPane tabId="messages">
                      Efficiently unleash cross-media information without
                      cross-media value. Quickly maximize timely deliverables
                      for real-time schemas. <br />
                      <br />
                      Dramatically maintain clicks-and-mortar solutions without
                      functional solutions.
                    </TabPane>
                    <TabPane tabId="settings">
                      Completely synergize resource taxing relationships via
                      premier niche markets. Professionally cultivate one-to-one
                      customer service with robust ideas. <br />
                      <br />
                      Dynamically innovate resource-leveling customer service
                      for state of the art customer service.
                    </TabPane>
                  </TabContent>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </div>
      </>
    );
  }
}

export default Panels;
