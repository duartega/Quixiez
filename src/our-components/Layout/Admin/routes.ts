import Dashboard from "../../Views/Dashboard";
import Settings from "../../Pages/GeneralSettings";
import Conversation from "our-components/Pages/Conversation";
import ConversationsList from "our-components/Tables/ConversationsTable";
import { RoutesI } from "../../Types/RoutesI";
import ConversationsPanel from "../../Pages/ConversationsPanel";
import ConversationList from "../../Components/Conversations List/AllConversationsWithMessageRight";
import { ProfilePage } from '../../Components/Profile/ProfilePage';

const routes: RoutesI[] = [
  {
    path: "/dashboard",
    name: "Dashboard",
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
    icon: "tim-icons icon-email-85",
    component: Conversation,
    layout: "/admin",
    redirect: true
  },
  {
    path: "/conversations",
    name: "Conversations",
    icon: "tim-icons icon-email-85",
    // component: ConversationsList,
    component: ConversationList,
    layout: "/admin"
  },

  {
    path: "/settings",
    name: "Settings",
    icon: "tim-icons icon-settings",
    component: Settings,
    layout: "/admin"
  },
  {
    path: "/conversation/user-profile",
    exact: true,
    name: "User Profile",
    icon: "tim-icons icon-email-85",
    // component: ConversationsList,
    component: ProfilePage,
    layout: "/admin",
    redirect: true
  }, 


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
