import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import { StylePanel } from "../configs/styles";
import { Theme } from "../configs/theme";
import { scale, scaleVertical } from "../configs";

import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  Image,
  TextInput,
  TouchableWithoutFeedback,
  Keyboard
} from "react-native";
import Footer from "../components/Footer";
import YellowButton from "../components/YellowButton";

import { resetPassword } from "../actions/authActions";

class ResetPasswordScreen extends React.Component {
  state = {
    err: null,
    email: ""
  };
  componentWillReceiveProps(nextProps) {
    this.setState({
      list: nextProps.agencies
    });
  }
  render() {
    return (
      <TouchableWithoutFeedback
        onPress={Keyboard.dismiss}
        accessible={false}
        style={{ flex: 1, width: "100%" }}
      >
        <View style={StylePanel.container}>
          <View style={styles.container}>
            <Text style={styles.title}>Восстановление пароля</Text>
            <Text style={styles.inputDescription}>
              Укажите адрес электронной почты для получения ссылки на смену
              пароля
            </Text>
            <TextInput
              style={[styles.input, styles.mt44]}
              placeholder={"Введите эл. почту"}
              underlineColorAndroid="transparent"
              type={"custom"}
              maxLength={50}
              value={this.state.email}
              placeholderTextColor="rgba(37, 44, 50, 0.6)"
              onChangeText={text => this.setState({ email: text })}
            />
            {this.props.error &&
            this.props.error.screen === "ResetPasswordScreen" ? (
              <Text style={styles.textError}>{this.props.error.text}</Text>
            ) : null}

            <YellowButton
              text="Отправить"
              width="100%"
              action={() => this.props.resetPassword(this.state.email)}
            />
          </View>
          <Footer />
        </View>
      </TouchableWithoutFeedback>
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
    paddingHorizontal: scale(16)
  },
  containerList: {
    width: scale(343),
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
    shadowColor: "rgba(37, 44, 50, 0.1)",
    height: scale(45),
    width: "100%",
    marginBottom: scaleVertical(16),
    borderRadius: scale(4),
    paddingHorizontal: scale(12),
    backgroundColor: "rgb(255, 255, 255)",
    color: "rgb(37, 44, 50)",
    fontSize: Theme.fonts.sizes.p6
  },
  errInput: {
    borderColor: "rgb(198, 40, 40)"
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
  textError: {
    color: Theme.colors.red,
    fontSize: Theme.fonts.sizes.p4,
    marginBottom: scale(8)
  }
});

const mapStateToProps = state => {
  const { loader, error } = state;
  return {
    error
  };
};

const mapDispatchToProps = dispatch => {
  return {
    resetPassword: bindActionCreators(resetPassword, dispatch)
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ResetPasswordScreen);
