export interface RoutesI {
  path: String;
  exact?: boolean;
  name: String;
  rtlName?: String;
  icon?: String;
  component: React.Component;
  layout: String;
  /**
   * If redirect is true then
   * the side navbar/menu will
   * not render that as a clickable
   * link.
   *
   * @see Sidebar.jsx createLinks function
   */
  redirect?: boolean;
}
