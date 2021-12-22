import React from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";

import { StylePanel } from "../configs/styles";
import { Theme } from "../configs/theme";
import { scale, scaleVertical } from "../configs";

import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard
} from "react-native";
import CustomTextInput from "../components/CustomTextInput";
import { TextInputMask } from "react-native-masked-text";
import Footer from "../components/Footer";
import YellowButton from "../components/YellowButton";

import { updateAuth, signupCabinet } from "../actions/authActions";

class CabinetScreen extends React.Component {
  state = {
    err: null,
    user: this.props.user
  };
  componentWillReceiveProps(nextProps) {
    this.setState({
      list: nextProps.agencies
    });
  }
  signUp = () => {
    this.props.signupCabinet(this.state.user);
  };
  handleChange = (name, value) => {
    let updatedUser = {
      ...this.state.user,
      [name]: value
    };
    this.setState({
      user: updatedUser
    });
  };
  validate = () => {
    const user = this.state.user;
    if (
      !user ||
      (user && !user.password) ||
      (user && !user.rePassword) ||
      !user?.email
    )
      return true;
    else return false;
  };
  render() {
    return (
      <View style={{ flex: 1, width: "100%" }}>
        <TouchableWithoutFeedback
          style={StylePanel.container}
          onPress={Keyboard.dismiss}
          accessible={false}
        >
          <KeyboardAvoidingView
            style={{
              flex: 1,
              width: "100%"
            }}
            keyboardVerticalOffset={scaleVertical(70)}
            behavior="padding"
            enabled
          >
            <View style={styles.container}>
              <Text style={styles.title}>Личный кабинет</Text>
              <Text style={styles.inputDescription}>
                Заполните поля, чтобы мы Вас запомнили
              </Text>
              <CustomTextInput
                style={[styles.mt44, styles.mb15]}
                placeholder={"Введите эл. почту"}
                underlineColorAndroid="transparent"
                type={"email"}
                value={
                  this.state.user && this.state.user.email
                    ? this.state.user.email
                    : null
                }
                maxLength={30}
                placeholderTextColor="rgba(37, 44, 50, 0.6)"
                handleChange={text => this.handleChange("email", text)}
              />
              <CustomTextInput
                style={styles.mb15}
                placeholder={"Придумайте пароль"}
                underlineColorAndroid="transparent"
                type={"password"}
                value={
                  this.state.user && this.state.user.password
                    ? this.state.user.password
                    : null
                }
                secureTextEntry={true}
                maxLength={30}
                placeholderTextColor="rgba(37, 44, 50, 0.6)"
                handleChange={text => this.handleChange("password", text)}
              />
              <CustomTextInput
                placeholder={"Повторите пароль"}
                underlineColorAndroid="transparent"
                secureTextEntry={true}
                type={"password"}
                value={
                  this.state.user && this.state.user.rePassword
                    ? this.state.user.rePassword
                    : null
                }
                maxLength={30}
                placeholderTextColor="rgba(37, 44, 50, 0.6)"
                handleChange={text => this.handleChange("rePassword", text)}
              />
              <TextInputMask
                style={[styles.input, styles.mt44]}
                placeholder={"+7 (000) 000 00 00"}
                underlineColorAndroid="transparent"
                type={"custom"}
                keyboardType={"numeric"}
                maxLength={18}
                placeholderTextColor="rgba(37, 44, 50, 0.6)"
                options={{ mask: "+9 (999) 999-99-99" }}
                value={
                  this.state.user && this.state.user.phone
                    ? this.state.user.phone
                    : null
                }
                onChangeText={text => this.handleChange("phone", text)}
              />
              <Text style={styles.information}>
                Прикрепите заранее номер Вашего мобильного телефона, чтобы не
                вводить его в будущем
              </Text>
              {this.props.error &&
              this.props.error.screen === "CabinetScreen" ? (
                <Text style={styles.errorText}>{this.props.error.text}</Text>
              ) : null}
              <YellowButton
                text="Готово"
                width="100%"
                disabled={this.validate()}
                action={() => this.signUp()}
              />
              <TouchableOpacity
                onPress={() => this.props.navigation.navigate("SigninScreen")}
              >
                <Text style={styles.buttonYellowText}>
                  У меня уже есть аккаунт
                </Text>
              </TouchableOpacity>
            </View>
          </KeyboardAvoidingView>
        </TouchableWithoutFeedback>
        <Footer />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    alignContent: "center",
    textAlign: "center",
    paddingHorizontal: scale(24),
    marginTop: scaleVertical(54)
  },
  containerList: {
    width: scale(327),
    paddingVertical: scale(16)
  },
  title: {
    fontFamily: "PTRootUIMedium",
    fontSize: Theme.fonts.sizes.h1,
    color: Theme.colors.grayDark,
    lineHeight: scale(34)
  },
  input: {
    shadowOffset: {
      width: 2,
      height: 2
    },
    shadowRadius: 4,
    shadowOpacity: 1.0,
    elevation: 2,
    shadowColor: Theme.colors.gray10,
    height: scale(52),
    width: "100%",
    fontFamily: "PTRootUIRegular",
    borderRadius: scale(8),
    paddingHorizontal: scale(12),
    backgroundColor: "rgb(255, 255, 255)",
    color: "rgb(37, 44, 50)",
    fontSize: Theme.fonts.sizes.h4,
    letterSpacing: scale(0.5)
  },
  inputDescription: {
    fontFamily: "PTRootUIMedium",
    fontSize: scale(15),
    color: Theme.colors.gray60,
    marginTop: scaleVertical(16),
    textAlign: "center"
  },
  mt44: {
    marginTop: scaleVertical(44)
  },
  information: {
    fontFamily: "PTRootUIRegular",
    fontSize: scale(11),
    color: Theme.colors.gray40,
    lineHeight: scale(15),
    marginTop: scaleVertical(16),
    marginBottom: scaleVertical(24),
    textAlign: "center"
  },
  buttonYellowText: {
    fontFamily: "PTRootUIBold",
    fontSize: Theme.fonts.sizes.p6,
    textAlign: "center",
    color: Theme.colors.yellow,
    marginTop: scaleVertical(24)
  },
  mb15: {
    marginBottom: scaleVertical(15)
  },
  errorText: {
    color: Theme.colors.red,
    fontSize: Theme.fonts.sizes.p6,
    fontFamily: "PTRootUIMedium",
    marginBottom: scale(8)
  }
});

const mapStateToProps = state => {
  const { loader, auth, error } = state;
  return {
    auth,
    user: auth.user,
    error
  };
};

const mapDispatchToProps = dispatch => {
  return {
    updateAuth: bindActionCreators(updateAuth, dispatch),
    signupCabinet: bindActionCreators(signupCabinet, dispatch)
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CabinetScreen);
