import React from "react";
// import { Font } from 'expo';
import * as Font from "expo-font";
import { Provider } from "react-redux";
import configureStore from "./src/store";

import Navigator from "./src/routes/index";
import { StylePanel } from "./src/configs/styles";
import { ActivityIndicator, View } from "react-native";
import { Theme } from "./src/configs/theme";

export default class App extends React.Component {
  state = {
    fontLoaded: false
  };

  async componentDidMount() {
    await Font.loadAsync({
      RobotoRegular: require("./assets/fonts/RobotoRegular.ttf"),
      RobotoMedium: require("./assets/fonts/RobotoMedium.ttf"),
      RobotoThin: require("./assets/fonts/RobotoThin.ttf"),
      RobotoLight: require("./assets/fonts/RobotoLight.ttf"),
      PTRootUIBold: require("./assets/fonts/PTRootUI_Bold.ttf"),
      PTRootUIMedium: require("./assets/fonts/PTRootUI_Medium.ttf"),
      PTRootUIRegular: require("./assets/fonts/PTRootUI_Regular.ttf"),
      SFProTextRegular: require("./assets/fonts/SFProText-Regular.ttf")
    });

    this.setState({ fontLoaded: true });
  }

  render() {
    return this.state.fontLoaded ? (
      <Provider store={configureStore()}>
        <Navigator />
      </Provider>
    ) : (
      <View style={StylePanel.middleView}>
        <ActivityIndicator size="large" color={Theme.colors.yellow} />
      </View>
    );
  }
}
