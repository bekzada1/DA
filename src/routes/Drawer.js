import { Dimensions } from "react-native";
import { createDrawerNavigator } from "react-navigation-drawer";

import SideMenu from "../components/SideMenu";
import App from "./App";
import ProfileStack from "./ProfileStack";

const Drawer = createDrawerNavigator(
  {
    App: App,
    Profile: ProfileStack
  },
  {
    contentOptions: {
      activeTintColor: "#e91e63"
    },
    contentComponent: SideMenu,
    drawerWidth: Dimensions.get("window").width - 80
  }
);

export default Drawer;
