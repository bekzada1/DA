import React from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";

import { StylePanel } from "../configs/styles";
import { Theme } from "../configs/theme";
import { scale, scaleVertical } from "../configs";

import {
  ActivityIndicator,
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard
} from "react-native";
import CustomTextInput from "../components/CustomTextInput";
import Footer from "../components/Footer";
import YellowButton from "../components/YellowButton";

import { login, updateAuth } from "../actions/authActions";

class SigninScreen extends React.Component {
  state = {
    err: null,
    user: this.props.user
  };
  componentWillReceiveProps(nextProps) {
    this.setState({
      list: nextProps.agencies
    });
  }
  signin = () => {
    this.props.login(this.state.user, () =>
      this.props.navigation.navigate(
        this.props.navigation.getParam("next", "HomeViewScreen")
      )
    );
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
    if (
      !this.state.user ||
      (this.state.user && !this.state.user.email) ||
      (this.state.user && !this.state.user.password)
    )
      return true;
    else return false;
  };
  render() {
    return (
      <View style={StylePanel.container}>
        <TouchableWithoutFeedback
          style={{
            flex: 1,
            width: "100%"
          }}
          onPress={Keyboard.dismiss}
          accessible={false}
        >
          <KeyboardAvoidingView
            style={{
              flex: 1,
              width: "100%"
            }}
            behavior="padding"
            enabled
          >
            <View style={styles.container}>
              <Text style={styles.title}>Войти</Text>
              <Text style={styles.inputDescription}>
                Мы рады Вас видеть снова!
              </Text>
              <CustomTextInput
                style={[styles.mt44, styles.mb16]}
                placeholder={"Введите эл. почту"}
                underlineColorAndroid="transparent"
                type={"custom"}
                maxLength={30}
                placeholderTextColor="rgba(37, 44, 50, 0.6)"
                value={
                  this.state.user && this.state.user.email
                    ? this.state.user.email
                    : ""
                }
                handleChange={text => this.handleChange("email", text)}
              />
              <CustomTextInput
                placeholder={"Введите пароль"}
                underlineColorAndroid="transparent"
                secureTextEntry={true}
                type={"password"}
                maxLength={18}
                placeholderTextColor="rgba(37, 44, 50, 0.6)"
                handleChange={text => this.handleChange("password", text)}
                value={
                  this.state.user && this.state.user.password
                    ? this.state.user.password
                    : ""
                }
              />
              <TouchableOpacity
                onPress={() =>
                  this.props.navigation.navigate("ResetPasswordScreen")
                }
              >
                <Text style={styles.information}>Забыли пароль?</Text>
              </TouchableOpacity>
              {this.props.error &&
              this.props.error.screen === "SigninScreen" ? (
                <Text style={styles.errorText}>{this.props.error.text}</Text>
              ) : null}
              <YellowButton
                text="Войти"
                width="100%"
                action={() => this.signin()}
                disabled={this.validate()}
              />
              <TouchableOpacity
                onPress={() => this.props.navigation.navigate("CabinetScreen")}
              >
                <Text style={styles.buttonYellowText}>
                  Создать новый аккаунт
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
    paddingHorizontal: scale(24)
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
  mb16: {
    marginBottom: scaleVertical(16)
  },
  information: {
    fontFamily: "PTRootUIMedium",
    fontSize: scale(13),
    color: Theme.colors.yellow,
    lineHeight: scale(18),
    marginTop: scaleVertical(8),
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
  errorText: {
    color: Theme.colors.red,
    fontSize: Theme.fonts.sizes.p6,
    fontFamily: "PTRootUIMedium",
    marginBottom: scale(8)
  }
});

const mapStateToProps = state => {
  const { auth, loader, error } = state;
  return {
    user: auth.user,
    loader,
    error
  };
};

const mapDispatchToProps = dispatch => {
  return {
    login: bindActionCreators(login, dispatch),
    updateAuth: bindActionCreators(updateAuth, dispatch)
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SigninScreen);
