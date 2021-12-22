import React from "react";
import { StyleSheet, View, ScrollView, Text } from "react-native";
import CodeInput from "react-native-confirmation-code-field";
import localeStore from "../locale/localeStore";

import { scale, scaleVertical } from "../configs";
import { Theme } from "../configs/theme";
import YellowButton from "../components/YellowButton";

const CodeSms = props => (
  <View style={styles.container}>
    <ScrollView>
      <View style={styles.codeContainer}>
        <Text style={styles.codeTitle}>Теперь введите код</Text>
        <Text style={styles.codeSubTitle}>
          Код отправили сообщением на{"\n"}
          {props.navigation.getParam("phone", "Ваш номер")}
        </Text>
        <CodeInput
          variant="clear"
          autoFocus={true}
          keyboardType="numeric"
          cellProps={props.cellProps}
          onFulfill={code => props.action(code)}
          activeColor={Theme.colors.grayDark}
          codeLength={4}
          space={scale(16)}
        />
        {props.error && props.error.name === "" ? (
          <Text style={styles.containerError}>{props.error.text}</Text>
        ) : null}
        {props.count ? (
          <View style={styles.innerContainer}>
            <Text style={styles.codeResendDisabled}>Не получили код?</Text>
            <Text style={[styles.codeResendDisabled, styles.mb16]}>
              Переотправить новый через {props.count ? props.count : 0} сек.
            </Text>
            <View style={styles.disabledSendCodeButton}>
              <Text style={styles.disabledSendCodeButtonText}>
                Получить новый код
              </Text>
            </View>
          </View>
        ) : (
          <View style={styles.innerContainer}>
            <YellowButton
              text={"Получить  новый код"}
              width="100%"
              action={() => props.secondAction()}
            />
          </View>
        )}
      </View>
    </ScrollView>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    justifyContent: "center"
  },
  codeContainer: {
    width: "100%",
    alignContent: "center",
    alignItems: "center",
    alignSelf: "center",
    display: "flex",
    justifyContent: "center",
    paddingHorizontal: scale(24)
  },
  innerContainer: {
    width: "100%",
    alignContent: "center",
    alignItems: "center",
    alignSelf: "center",
    display: "flex",
    justifyContent: "center",
    marginTop: scaleVertical(125)
  },
  codeTitle: {
    color: "rgb(37, 44, 50)",
    fontSize: scale(28),
    fontFamily: "PTRootUIMedium",
    marginBottom: scale(12),
    marginTop: scale(34)
  },
  codeSubTitle: {
    color: "rgba(37, 44, 50, 0.6)",
    fontSize: scale(15),
    marginBottom: scaleVertical(50),
    textAlign: "center"
  },
  codeResend: {
    marginTop: scale(30),
    color: "rgba(37, 44, 50, 0.4)",
    fontFamily: "PTRootUIBold",
    fontSize: scale(14),
    textAlign: "center"
  },
  codeResendDisabled: {
    color: Theme.colors.gray40,
    fontFamily: "PTRootUIRegular",
    fontSize: scale(11),
    textAlign: "center"
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
    marginTop: scaleVertical(8),
    textAlign: "center"
  },
  resendButton: {
    backgroundColor: "rgba(37, 44, 50, 0.1)",
    width: "100%",
    height: scale(52),
    borderRadius: scale(8),
    display: "flex",
    justifyContent: "center"
    // lineHeight: scale(52)
  },
  mb16: {
    marginBottom: scaleVertical(16)
  },
  disabledSendCodeButton: {
    height: scale(52),
    width: "100%",
    display: "flex",
    justifyContent: "center",
    alignContent: "center",
    alignItems: "center",
    borderRadius: scale(8),
    backgroundColor: Theme.colors.gray10
  },
  disabledSendCodeButtonText: {
    fontSize: Theme.fonts.sizes.p6,
    color: Theme.colors.gray40,
    fontFamily: "PTRootUIBold",
    borderRadius: 0
  }
});

export default CodeSms;
