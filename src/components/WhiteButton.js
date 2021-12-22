import React from "react";
import { StyleSheet, Text, ActivityIndicator } from "react-native";
import { Theme } from "../configs/theme";
import { scale } from "../configs/index";
import { Button } from "native-base";
// import * as Button from 'native-base-button'

const WhiteButton = props => (
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
    elevation: 2,
    height: scale(52),
    backgroundColor: "rgb(255, 255, 255)",
    flexDirection: "row",
    justifyContent: "center"
    // borderColor: 'rgb(255, 186, 0)',
    // borderWidth: 1
  },
  buttonText: {
    fontSize: Theme.fonts.sizes.p6,
    borderRadius: 0,
    color: Theme.colors.yellow,
    fontFamily: "PTRootUIBold"
  }
});

export default WhiteButton;
