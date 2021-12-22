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

import { Theme } from "../configs/theme";
import { scale, scaleVertical } from "../configs";
import YellowButton from "../components/YellowButton";

const InsertPhone = props => (
  <TouchableWithoutFeedback
    onPress={Keyboard.dismiss}
    accessible={false}
    style={{ flex: 1, width: "100%" }}
  >
    <View style={styles.container}>
      <Text style={styles.titleText}>Укажите телефон</Text>
      <Text style={styles.subText}>
        Пожалуйста, введите номер Вашего мобильного телефона{" "}
      </Text>
      <TextInputMask
        style={styles.input}
        placeholder={"+7 (000) 000 00 00"}
        value={props.value}
        underlineColorAndroid="transparent"
        type={"custom"}
        keyboardType={"numeric"}
        maxLength={18}
        options={{ mask: "+9 (999) 999-99-99" }}
        onChangeText={text => props.handleChange(text)}
      />
      {props.err && props.err.screen === "InsertPhoneScreen" ? (
        <Text style={styles.containerError}>{props.err.text}</Text>
      ) : null}
      <Text style={styles.information}>
        Продолжая, Вы соглашаетесь со сбором и обработкой персональных данных
      </Text>
      <YellowButton
        text={"Далее"}
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
    fontSize: Theme.fonts.sizes.p5,
    textAlign: "center",
    marginBottom: scaleVertical(44),
    fontFamily: "SFProTextRegular"
  },
  information: {
    color: "rgba(37, 44, 50, 0.4)",
    fontSize: scale(11),
    textAlign: "center",
    marginBottom: scaleVertical(100)
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
    backgroundColor: "rgb(255, 255, 255)",
    color: Theme.colors.grayDark,
    fontSize: Theme.fonts.sizes.h4,
    marginBottom: scaleVertical(16),
    paddingHorizontal: scale(12)
  },
  containerError: {
    flexDirection: "row",
    fontFamily: "PTRootUIMedium",
    justifyContent: "flex-start",
    width: "100%",
    alignItems: "flex-start",
    color: Theme.colors.red,
    fontSize: Theme.fonts.sizes.p3,
    marginBottom: scaleVertical(14),
    marginTop: scaleVertical(8)
  }
});

export default InsertPhone;
