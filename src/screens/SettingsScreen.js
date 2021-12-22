import React from "react";
import * as Location from "expo-location";
import * as Permissions from "expo-permissions";
import {
  StyleSheet,
  View,
  Image,
  Text,
  TextInput,
  TouchableOpacity,
  Switch
} from "react-native";
import * as IntentLauncher from "expo-intent-launcher";

import { StylePanel } from "../configs/styles";
import { scale, scaleVertical } from "../configs/index";
import { Theme } from "../configs/theme";

import SwipeablePanel from "rn-swipeable-panel";
import SelectCity from "../components/SelectCity";
import SelectLang from "../components/SelectLang";

export default class SettingsScreen extends React.Component {
  state = {
    switchValue: false,
    isOpen: false,
    fullWidth: true,
    customPanel: false,
    content: () => null,
    customPanelState: {
      isOpen: false,
      openLarge: false,
      fullWidth: false,
      noBackgroundOpacity: false,
      closeButton: false
    }
  };
  componentDidMount = async () => {
    try {
      const location = await Location.getCurrentPositionAsync({});
      if (location && location.coords) {
        this.setState({
          switchValue: true
        });
      }
    } catch (err) {
      this.setState({
        switchValue: false
      });
    }
  };
  openLangPanel = () => {
    this.setState({
      isOpen: true,
      openLarge: true,
      closeButton: this.closePanel,
      noBackgroundOpacity: false,
      content: () => <SelectLang />
    });
  };
  openCityPanel = () => {
    this.setState({
      isOpen: true,
      openLarge: true,
      closeButton: this.closePanel,
      noBackgroundOpacity: false,
      content: () => <SelectCity />
    });
  };
  closePanel = () => {
    this.setState({
      customPanelState: { ...this.state.customPanelState, isOpen: false },
      isOpen: false
    });
  };
  permissionLocation = async () => {
    // if (this.state.switchValue) {
    //   IntentLauncher.startActivityAsync(
    //     IntentLauncher.ACTION_LOCATION_SOURCE_SETTINGS
    //   );
    // } else {
    if (!this.state.switchValue) {
      let { status } = await Permissions.askAsync(Permissions.LOCATION);
      if (status === "granted")
        this.setState({
          switchValue: true
        });
    }
  };
  render() {
    const panelState = this.state.customPanelState.isOpen
      ? this.state.customPanelState
      : this.state;

    return (
      <View style={StylePanel.container}>
        <View style={styles.container}>
          <View style={StylePanel.containerInner}>
            <TouchableOpacity style={styles.listItem}>
              <Text style={styles.listItemText}>Доступ к геолокации</Text>
              <Switch
                color={Theme.colors.yellow}
                onValueChange={this.permissionLocation}
                value={this.state.switchValue}
              />
            </TouchableOpacity>
            {/* <TouchableOpacity
              style={styles.listItem}
              onPress={this.openCityPanel}
            >
              <Text style={styles.listItemText}>
                Ваш город: <Text style={styles.yellowText}>Алматы</Text>
              </Text>
              <Image
                style={styles.icon}
                source={require("../../assets/icons/arrowright.png")}
              /> */}
            {/* </TouchableOpacity> */}
            {/* <TouchableOpacity
              style={styles.listItem}
              onPress={this.openLangPanel}
            >
              <Text style={styles.listItemText}>
                Язык интерфейса: <Text style={styles.yellowText}>Русский</Text>
              </Text>
              <Image
                style={styles.icon}
                source={require("../../assets/icons/arrowright.png")}
              />
            </TouchableOpacity> */}
          </View>
        </View>
        <SwipeablePanel
          fullWidth={panelState.fullWidth}
          noBackgroundOpacity={panelState.noBackgroundOpacity}
          openLarge={panelState.openLarge}
          isActive={panelState.isOpen}
          onClose={this.closePanel}
          onPressCloseButton={panelState.closeButton ? this.closePanel : null}
        >
          {this.state.content()}
        </SwipeablePanel>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    alignContent: "center"
  },
  container: {
    flex: 1,
    alignItems: "center",
    alignContent: "center",
    marginTop: scale(24)
  },
  listItem: {
    paddingVertical: scaleVertical(16),
    borderBottomColor: Theme.colors.gray10,
    borderBottomWidth: scale(1),
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between"
  },
  listItemText: {
    fontFamily: "PTRootUIRegular",
    fontSize: scale(17),
    color: Theme.colors.grayDark
  },
  yellowText: {
    color: Theme.colors.yellow
  },
  icon: {
    width: scale(12),
    height: scale(12)
  }
});
