import React from "react";
import {
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  ActivityIndicator
} from "react-native";
import { Theme } from "../configs/theme";
import { scale, scaleVertical } from "../configs/index";

const Input = props => (
  <View>
    {props.err && props.err.name === props.name ? (
      <Text style={styles.containerError}>{props.err.text}</Text>
    ) : null}
    <View
      onFocus={() => props.handleFocus(props.name)}
      onBlur={() => props.handleFocus("")}
      style={[
        styles.containerInput,
        props.focused === props.name ? styles.activeInput : null,
        props.err && props.err.name === props.name ? styles.errInput : null
      ]}
    >
      <TextInput
        secureTextEntry={props.secureTextEntry ? props.secureTextEntry : false}
        style={styles.input}
        placeholder={props.placeholder}
        placeholderTextColor="rgba(37, 44, 50, 0.2)"
        onChangeText={value => props.handleChange(value)}
        value={props.value}
      />
      {props.nextIcon &&
      !(props.err && props.err.name === props.name) &&
      !props.loader ? (
        <TouchableOpacity onPress={props.nextAction}>
          <Image
            style={styles.nextIcon}
            source={require("../../assets/icons/login/next.png")}
          />
        </TouchableOpacity>
      ) : null}
      {props.nextIcon && props.loader ? (
        <ActivityIndicator size="small" color={Theme.colors.yellow} />
      ) : null}
      {props.err && props.err.name === props.name && !props.loader ? (
        <TouchableOpacity onPress={() => props.handleChange("")}>
          <Image
            style={styles.errIcon}
            source={require("../../assets/icons/login/delete.png")}
          />
        </TouchableOpacity>
      ) : null}
    </View>
  </View>
);

const styles = StyleSheet.create({
  containerInput: {
    shadowOffset: {
      width: 2,
      height: 2
    },
    shadowRadius: 4,
    shadowOpacity: 1.0,
    elevation: 2,
    shadowColor: "rgba(37, 44, 50, 0.1)",
    flexDirection: "row",
    fontFamily: "RobotoRegular",
    justifyContent: "center",
    alignItems: "center",
    height: scale(45),
    width: scale(311),
    backgroundColor: "rgb(255, 255, 255)",
    marginTop: scaleVertical(16),
    borderRadius: scale(4),
    paddingLeft: scale(15),
    borderWidth: scale(1),
    borderColor: "rgba(255,255,255,0.12)"
  },
  input: {
    flex: 1,
    color: "rgb(37, 44, 50)"
  },
  activeInput: {
    borderColor: "#ffba00"
  },
  nextIcon: {
    width: scale(16),
    height: scale(16),
    marginRight: scale(12)
  },
  errIcon: {
    width: scale(12),
    height: scale(13),
    marginRight: scale(12)
  },
  containerError: {
    flexDirection: "row",
    fontFamily: "RobotoRegular",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    width: scale(311),
    color: "rgb(198,40,40)",
    fontSize: Theme.fonts.sizes.p4,
    backgroundColor: "rgb(255, 255, 255)",
    marginTop: scaleVertical(14)
  },
  errInput: {
    borderColor: "rgb(198, 40, 40)"
  }
});

export default Input;
