import React from "react";
import { StyleSheet, Text, ActivityIndicator } from "react-native";
import { Theme } from "../configs/theme";
import { scale } from "../configs/index";
import { Button } from "native-base";

const GreenButton = props => (
  <Button
    onPress={props.action}
    style={[styles.button, { marginTop: props.top, width: props.width }]}
    width={props.width}
    disabled={props.loader ? true : false}
  >
    {props.loader ? (
      <ActivityIndicator size="small" color="rgb(76, 175, 80)" />
    ) : (
      <Text style={styles.buttonText} numberOfLines={1}>
        {props.text}
      </Text>
    )}
  </Button>
);

const styles = StyleSheet.create({
  button: {
    height: scale(45),
    backgroundColor: "rgb(255, 255, 255)",
    flexDirection: "row",
    justifyContent: "center",
    borderColor: "rgb(76, 175, 80)",
    borderWidth: 1,
    textAlign: "center",
    shadowOffset: {
      width: 2,
      height: 2
    },
    shadowRadius: 4,
    shadowOpacity: 1.0,
    shadowColor: "rgba(62, 194, 95, 0.4)",
    elevation: 2
  },
  buttonText: {
    fontSize: Theme.fonts.sizes.p6,
    borderRadius: 0,
    color: "rgb(76, 175, 80)",
    justifyContent: "center",
    textAlign: "center"
  }
});

export default GreenButton;
