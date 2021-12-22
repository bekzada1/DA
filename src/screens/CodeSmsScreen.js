import React from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import * as Location from "expo-location";
import * as Permissions from "expo-permissions";

import { StylePanel } from "../configs/styles";

import { View, Animated } from "react-native";
import CodeSms from "../containers/CodeSms";
import Footer from "../components/Footer";

import { checkSms, resendCode, isLoggedIn } from "../actions/authActions";
import { saveReview } from "../actions/reviewActions";
import { Theme } from "../configs/theme";
import { scale } from "../configs";

class CodeSmsScreen extends React.Component {
  state = {
    count: 60,
    location: null
  };
  componentDidMount() {
    this.handleChange("count", 60);
  }
  componentWillUnmount() {
    clearInterval(this.timerInterval);
  }
  checkSms = code => {
    let screen = this.props.navigation.getParam("next", "App");
    const user = this.props.navigation.getParam("user_id")
      ? { _id: this.props.navigation.getParam("user_id") }
      : null;
    this.props.checkSms(user, code, () => this.sendReview(screen));
  };
  handleChange = (name, value) => {
    this.setState({ [name]: value });
    this.timerInterval = setInterval(async () => {
      if (this.state.count > 0) {
        await this.setState({
          count: this.state.count - 1
        });
      } else clearInterval(this.timerInterval);
    }, 1000);
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
  sendReview = async screen => {
    if (await isLoggedIn()) {
      if (
        this.props.agency.agency_type.iin &&
        (!this.props.user_iin || this.props.user_iin === "")
      ) {
        this.props.navigation.navigate("InsertIINScreen", {
          next: screen
        });
      } else {
        this.saveReview(screen);
      }
    } else {
      if (
        this.props.agency.agency_type.iin &&
        !(this.props.auth.user.iin && this.props.auth.user.iin !== "")
      ) {
        this.props.navigation.navigate("InsertIINScreen", {
          next: screen
        });
      } else {
        this.saveReview(screen);
      }
    }
  };
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
  cellProps = ({ hasValue, index, isFocused }) => {
    const animatedCellStyle = {
      backgroundColor: hasValue
        ? "#fff"
        : isFocused
        ? Theme.colors.yellow
        : Theme.colors.gray10,
      marginTop: hasValue ? 0 : scale(10),
      borderRadius: hasValue ? 0 : scale(4),
      height: !hasValue ? scale(8) : scale(28),
      width: !hasValue ? scale(8) : scale(28),
      color: hasValue ? Theme.colors.grayDark : Theme.colors.yellow
    };

    return {
      style: [animatedCellStyle]
    };
  };

  render() {
    return (
      <View style={StylePanel.container}>
        <CodeSms
          navigation={this.props.navigation}
          action={code => this.checkSms(code)}
          error={this.props.error}
          count={this.state.count}
          cellProps={this.cellProps}
          secondAction={() =>
            resendCode(value => this.handleChange("count", value))
          }
        />
        <Footer />
      </View>
    );
  }
}

const mapStateToProps = state => {
  const { error, agency, review, auth } = state;
  return {
    error,
    agency,
    review,
    auth,
    user_iin: auth.user_iin
  };
};

const mapDispatchToProps = dispatch => {
  return {
    checkSms: bindActionCreators(checkSms, dispatch),
    saveReview: bindActionCreators(saveReview, dispatch)
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CodeSmsScreen);
