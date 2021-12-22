import React from "react";

import SelectLang from "../containers/SelectLang";
import { View } from "react-native";
import { StylePanel } from "../configs/styles";

export default class SelectLangScreen extends React.Component {
  render() {
    return (
      <View style={StylePanel.container}>
        <SelectLang navigation={this.props.navigation} />
      </View>
    );
  }
}
