import React from "react";
import { StyleSheet, Image, TouchableOpacity } from "react-native";
import { scale } from "../configs/index";

const HeaderBackButton = props => (
  <TouchableOpacity
    onPress={() => props.nav.goBack()}
    // onPress={() => props.nav.openDrawer()}
  >
    <Image
      style={styles.icon}
      source={require("../../assets/icons/back.png")}
    />
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  icon: {
    width: scale(24),
    height: scale(24),
    marginLeft: scale(16)
  }
});

export default HeaderBackButton;
