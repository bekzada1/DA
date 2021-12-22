import React from "react";
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  Keyboard
} from "react-native";
import { TextInputMask } from "react-native-masked-text";

import localeStore from "../locale/localeStore";
import { Theme } from "../configs/theme";
import { scale, scaleVertical } from "../configs";
import YellowButton from "../components/YellowButton";

const InsertIIN = props => (
  <TouchableWithoutFeedback
    onPress={Keyboard.dismiss}
    accessible={false}
    style={{ flex: 1, width: "100%" }}
  >
    <View style={styles.container}>
      <Text style={styles.titleText}>{localeStore.insert_iin.text}</Text>
      <Text style={styles.subText}>{localeStore.insert_iin.reason} </Text>
      <TextInputMask
        style={styles.input}
        placeholder={localeStore.iin}
        value={props.value}
        underlineColorAndroid="transparent"
        type={"custom"}
        keyboardType={"numeric"}
        maxLength={18}
        placeholderTextColor="rgba(37, 44, 50, 0.6)"
        options={{ mask: "999999999999" }}
        placeholder={localeStore.iin}
        onChangeText={text => props.handleChange(text)}
      />
      {props.err && props.err.name === "iin" ? (
        <Text style={styles.containerError}>{props.err.text}</Text>
      ) : null}
      <YellowButton
        text={localeStore.send_btn_txt}
        width="100%"
        action={props.action}
        loader={props.loader}
      />
    </View>
  </TouchableWithoutFeedback>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    alignContent: "center",
    textAlign: "center",
    paddingHorizontal: scale(16)
  },
  titleText: {
    color: "rgb(37, 44, 50)",
    fontSize: Theme.fonts.sizes.h1,
    marginBottom: scale(16),
    fontFamily: "PTRootUIMedium"
  },
  subText: {
    color: "rgba(37, 44, 50, 0.6)",
    fontSize: Theme.fonts.sizes.p4,
    textAlign: "center"
  },
  input: {
    shadowOffset: {
      width: 2,
      height: 2
    },
    shadowRadius: 4,
    shadowOpacity: 1.0,
    elevation: 4,
    shadowColor: Theme.colors.gray10,
    height: scale(52),
    width: "100%",
    fontFamily: "PTRootUIRegular",
    borderRadius: scale(8),
    paddingHorizontal: scale(12),
    backgroundColor: "rgb(255, 255, 255)",
    color: Theme.colors.grayDark,
    fontSize: Theme.fonts.sizes.h4,
    marginVertical: scaleVertical(24)
  },
  errInput: {
    borderColor: "rgb(198, 40, 40)"
  },
  containerError: {
    flexDirection: "row",
    fontFamily: "RobotoRegular",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    width: scale(311),
    color: "rgb(198,40,40)",
    fontSize: Theme.fonts.sizes.p4,
    marginBottom: scaleVertical(14)
  }
});

export default InsertIIN;
