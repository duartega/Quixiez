import Dashboard from "../../Views/Dashboard";
import AllConversations from "../../Pages/AllConversations";
import Settings from "../../Pages/GeneralSettings";
import Conversation from "our-components/Pages/Conversation";
import ConversationsList from "our-components/Tables/ConversationsList";

interface RoutesI {
  path: String;
  exact?: boolean;
  name: String;
  rtlName?: String;
  icon?: String;
  component: React.Component;
  layout: String;
}

const routes: RoutesI[] = [
  {
    path: "/dashboard",
    name: "Dashboard",
    rtlName: "لوحة القيادة",
    icon: "tim-icons icon-chart-pie-36",
    component: Dashboard,
    layout: "/admin"
  },

  /**
   * Exact paths need to be above their
   * non exact counter part
   */
  {
    path: "/conversations/messages",
    exact: true,
    name: "Messages",
    rtlName: "لوحة القيادة",
    icon: "tim-icons icon-email-85",
    component: Conversation,
    layout: "/admin"
  },
  {
    path: "/conversations",
    name: "Conversations",
    rtlName: "لوحة القيادة",
    icon: "tim-icons icon-email-85",
    component: ConversationsList,
    layout: "/admin"
  },

  {
    path: "/settings",
    name: "Settings",
    icon: "tim-icons icon-settings",
    component: Settings,
    layout: "/admin"
  }

  // This might be used later on...

  // {
  //   path: "/conversations",
  //   name: "Conversations",
  //   rtlName: "لوحة القيادة",
  //   icon: "tim-icons icon-email-85",
  //   component: AllConversations,
  //   layout: "/admin"
  // },

  // Example of view: []
  // {
  //   collapse: true,
  //   name: "Components",
  //   rtlName: "المكونات",
  //   icon: "tim-icons icon-molecule-40",
  //   state: "componentsCollapse",
  //   views: [
  //     {
  //       collapse: true,
  //       name: "Multi Level Collapse",
  //       rtlName: "انهيار متعدد المستويات",
  //       mini: "MLT",
  //       rtlMini: "ر",
  //       state: "multiCollapse",
  //       views: [
  //         {
  //           path: "/buttons",
  //           name: "Buttons",
  //           rtlName: "وصفت",
  //           mini: "B",
  //           rtlMini: "ب",
  //           component: Buttons,
  //           layout: "/admin"
  //         }
  //       ]
  //     },
];

export default routes;
