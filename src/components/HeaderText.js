import React from "react";
import { StyleSheet, Text } from "react-native";
import { scale } from "../configs/index";

const Header = props => <Text style={styles.text}>{props.text}</Text>;

const styles = StyleSheet.create({
  text: {
    fontSize: scale(17),
    fontFamily: "PTRootUIMedium",
    textAlign: "center",
    alignSelf: "center",
    marginLeft: "auto",
    marginRight: "auto"
  }
});

export default Header;
