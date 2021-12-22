import React from "react";
import { StyleSheet, Text, ActivityIndicator } from "react-native";
import { Theme } from "../configs/theme";
import { scale } from "../configs/index";
import { Button } from "native-base";

const RedButton = props => (
  <Button
    onPress={props.action}
    style={[styles.button, { width: props.width }]}
    width={props.width}
    disabled={props.loader ? true : false}
  >
    {props.loader ? (
      <ActivityIndicator size="small" color="rgb(254, 185, 0)" />
    ) : (
      <Text style={styles.buttonText} numberOfLines={1}>
        {props.text}
      </Text>
    )}
  </Button>
);

const styles = StyleSheet.create({
  button: {
    shadowOffset: {
      width: 2,
      height: 2
    },
    shadowRadius: 4,
    shadowOpacity: 1.0,
    shadowColor: "rgba(223, 68, 58, 0.4)",
    elevation: 2,
    height: scale(45),
    backgroundColor: Theme.colors.red,
    flexDirection: "row",
    justifyContent: "center"
  },
  buttonText: {
    fontSize: Theme.fonts.sizes.p6,
    borderRadius: 0,
    color: "rgb(255, 255, 255)",
    fontFamily: "PTRootUIBold"
  }
});

export default RedButton;
