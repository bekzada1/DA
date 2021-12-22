import React from "react";
import { StylePanel } from "../configs/styles";

import { View } from "react-native";
import PermissionGeo from "../containers/PermissionGeo";

import { saveItem } from "../actions/storage";

export default class PermissionGeoScreen extends React.Component {
  action = async () => {
    await saveItem("introduction", "passed");
    this.props.navigation.navigate("HomeViewScreen");
  };
  render() {
    return (
      <View style={StylePanel.container}>
        <PermissionGeo
          navigation={this.props.navigation}
          action={this.action}
        />
      </View>
    );
  }
}
