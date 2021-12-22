import React from "react";
import {
  StyleSheet,
  Image,
  SafeAreaView,
  Platform,
  TouchableOpacity
} from "react-native";
import { scale, scaleVertical } from "../configs/index";

const Logo = props => (
  <SafeAreaView style={styles.containerLogo}>
    <Image
      style={styles.logo}
      source={require("../../assets/icons/logo/logo.png")}
    />
    {props.action ? (
      <TouchableOpacity onPress={() => props.action()}>
        <Image
          style={styles.close}
          source={require("../../assets/icons/cross.png")}
        />
      </TouchableOpacity>
    ) : null}
  </SafeAreaView>
);

const styles = StyleSheet.create({
  containerLogo: {
    flexDirection: "row",
    paddingTop: Platform.OS === "android" ? 25 : 0
  },
  logo: {
    flex: 1,
    width: scale(102),
    height: scale(30),
    marginTop: scaleVertical(40),
    resizeMode: "contain"
  },
  close: {
    marginTop: scaleVertical(16),
    width: scale(16),
    height: scale(16)
  }
});

export default Logo;
