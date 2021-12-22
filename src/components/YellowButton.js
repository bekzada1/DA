import React from "react";
import { StyleSheet, Text, ActivityIndicator } from "react-native";
import { Theme } from "../configs/theme";
import { scale } from "../configs/index";
import { Button } from "native-base";

const YellowButton = props => (
  <Button
    onPress={props.action}
    style={[
      props.disabled ? styles.disabledButton : styles.button,
      { width: props.width }
    ]}
    width={props.width}
    disabled={props.loader || props.disabled ? true : false}
  >
    {props.loader ? (
      <ActivityIndicator size="small" color="rgb(38, 38, 38)" />
    ) : (
      <Text
        style={props.disabled ? styles.disabledButtonText : styles.buttonText}
        numberOfLines={1}
      >
        {props.text}
      </Text>
    )}
  </Button>
);

const styles = StyleSheet.create({
  button: {
    height: scale(52),
    backgroundColor: Theme.colors.yellow,
    flexDirection: "row",
    justifyContent: "center",
    paddingHorizontal: scale(5),
    borderRadius: scale(8),
    shadowOffset: {
      width: 2,
      height: 2
    },
    shadowRadius: 4,
    shadowOpacity: 1.0,
    shadowColor: "rgba(238, 198, 67, 0.4)",
    elevation: 2
  },
  disabledButton: {
    height: scale(52),
    backgroundColor: Theme.colors.gray10,
    flexDirection: "row",
    justifyContent: "center",
    paddingHorizontal: scale(5),
    borderRadius: scale(8),
    shadowOffset: {
      width: 0,
      height: 0
    },
    shadowRadius: 0,
    shadowOpacity: 0,
    shadowColor: "#fff",
    elevation: 0
  },
  disabledButtonText: {
    fontSize: Theme.fonts.sizes.p6,
    color: Theme.colors.gray40,
    fontFamily: "PTRootUIBold",
    borderRadius: 0
  },
  buttonText: {
    fontSize: Theme.fonts.sizes.p6,
    color: "rgb(255, 255, 255)",
    fontFamily: "PTRootUIBold",
    borderRadius: 0
  }
});

export default YellowButton;
