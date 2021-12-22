import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Theme } from "../configs/theme";
import { scale, scaleVertical } from "../configs";

const Footer = () => (
  <View style={styles.footerBg}>
    <Text style={styles.footerText}>
      © 2021 <Text style={styles.footerTextDa}>Digital Agent.</Text> Все права
      принадлежат народу.
    </Text>
  </View>
);

const styles = StyleSheet.create({
  footerBg: {
    backgroundColor: "rgb(255, 255, 255)",
    display: "flex",
    width: "100%",
    height: scaleVertical(50),
    paddingTop: scaleVertical(15),
    alignContent: "center"
  },
  footerText: {
    fontFamily: "RobotoRegular",
    textAlign: "center",
    fontSize: Theme.fonts.sizes.p3,
    color: "rgba(37, 44, 50, 0.4)"
  },
  footerTextDa: {
    color: "#ffba00"
  }
});

export default Footer;
