import { createSwitchNavigator, createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import React from "react";
import { View } from "react-native";
import { connect } from "react-redux";

// import AppStack from "./App";
import AuthStack from "./Auth";
import AuthLoadingScreen from "./AuthLoadingScreen";
import DrawerStack from "./Drawer";

import NavigationService from "./NavigationService";

const AppContainer = createAppContainer(
  createSwitchNavigator(
    {
      AuthLoading: AuthLoadingScreen,
      App: DrawerStack,
      Auth: AuthStack
    },
    {
      initialRouteName: "AuthLoading"
    }
  )
);

class Navigator extends React.Component {
  render() {
    return (
      <View style={{ flex: 1, backgroundColor: "#fff" }}>
        <AppContainer
          ref={navigatorRef => {
            NavigationService.setTopLevelNavigator(navigatorRef);
          }}
        />
      </View>
    );
  }
}

export default Navigator;
