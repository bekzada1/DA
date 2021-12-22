import React from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import * as Location from "expo-location";
import * as Permissions from "expo-permissions";

import { StylePanel } from "../configs/styles";
import { Theme } from "../configs/theme";
import { scale, scaleVertical } from "../configs";

import {
  View,
  StyleSheet,
  Text,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard
} from "react-native";
import Footer from "../components/Footer";
import YellowButton from "../components/YellowButton";
import CustomTextInput from "../components/CustomTextInput";

import { initialError } from "../actions/errorActions";
import { addEmail } from "../actions/authActions";
import { saveReview } from "../actions/reviewActions";

class InsertEmailScreen extends React.Component {
  state = {
    email: "",
    location: null
  };
  handleChange = value => {
    this.setState({
      email: value
    });
    this.props.initialError();
  };
  saveEmail = () => {
    let screen = this.props.navigation.getParam("next", "App");
    this.props.addEmail(this.state.email, () => this.saveReview(screen));
  };
  async saveReview(screen) {
    await this._getLocationAsync();
    const coords =
      this.state.location && this.state.location.coords
        ? this.state.location.coords
        : null;

    this.props.saveReview(
      {
        city_id: this.props.agency.city_id,
        district_id: this.props.agency.district_id,
        agency_type: this.props.agency.agency_type.short_name,
        agency_subtype: this.props.agency.agency_subtype.short_name,
        agency_id: this.props.agency.agency._id
      },
      this.props.review,
      coords,
      screen
    );
  }
  _getLocationAsync = async () => {
    let { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== "granted") {
      this.setState({
        errorMessage: "Permission to access location was denied"
      });
    } else {
      let location = await Location.getCurrentPositionAsync({});
      this.setState({ location });
    }
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
            keyboardVerticalOffset={scaleVertical(70)}
            behavior="padding"
            enabled
          >
            <View style={styles.container}>
              <Text style={styles.titleText}>Укажите почту</Text>
              <Text style={styles.subText}>
                Мы сохраним данные и у Вас появится «История жалоб»
              </Text>
              <CustomTextInput
                style={styles.input}
                placeholder={"Введите эл. почту"}
                underlineColorAndroid="transparent"
                type={"custom"}
                maxLength={30}
                value={this.state.email}
                placeholderTextColor="rgba(37, 44, 50, 0.6)"
                handleChange={text => this.handleChange(text)}
                error={this.props.error.screen === "InsertEmailScreen"}
              />
              {this.props.error &&
              this.props.error.screen === "InsertEmailScreen" ? (
                <Text style={styles.containerError}>
                  {this.props.error.text}
                </Text>
              ) : null}
              <View style={styles.bottom}>
                <YellowButton
                  disabled={
                    !this.state.email ||
                    (this.state.email && !this.state.email.length)
                  }
                  text={"Готово"}
                  width="100%"
                  action={this.saveEmail}
                  // loader={props.loader}
                />
              </View>
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
    paddingHorizontal: scale(16)
  },
  titleText: {
    color: "rgb(37, 44, 50)",
    fontSize: Theme.fonts.sizes.h1,
    marginBottom: scale(16),
    fontFamily: "PTRootUIMedium",
    marginTop: scaleVertical(24)
  },
  subText: {
    color: "rgba(37, 44, 50, 0.6)",
    fontSize: Theme.fonts.sizes.p5,
    textAlign: "center"
  },
  input: {
    marginTop: scaleVertical(44)
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
  },
  bottom: {
    flex: 1,
    width: "100%",
    justifyContent: "flex-end",
    marginBottom: scaleVertical(16)
  }
});

const mapStateToProps = state => {
  const { error, loader, agency, review } = state;
  return {
    error,
    loader: loader.status,
    agency: agency,
    review: review
  };
};

const mapDispatchToProps = dispatch => {
  return {
    addEmail: bindActionCreators(addEmail, dispatch),
    initialError: bindActionCreators(initialError, dispatch),
    saveReview: bindActionCreators(saveReview, dispatch)
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(InsertEmailScreen);
