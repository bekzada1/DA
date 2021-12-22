import React from "react";
import * as Location from "expo-location";
import * as Permissions from "expo-permissions";

import { bindActionCreators } from "redux";
import { connect } from "react-redux";

import { StylePanel } from "../configs/styles";
import { scaleVertical } from "../configs";

import { View, ActivityIndicator, KeyboardAvoidingView } from "react-native";
import InsertIIN from "../containers/InsertIIN";
import Footer from "../components/Footer";

import { addIIN } from "../actions/authActions";
import { initialError } from "../actions/errorActions";
import { saveReview } from "../actions/reviewActions";

class InsertIINScreen extends React.Component {
  state = {
    iin: "",
    loader: false,
    location: null
  };
  handleChange = (name, value) => {
    this.setState({
      [name]: value
    });
    this.props.initialError();
  };
  addIIN = () => {
    let screen = this.props.navigation.getParam("next", "App");
    this.props.addIIN(this.state.iin, () => this.saveReview(screen));
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
        <KeyboardAvoidingView
          style={{
            flex: 1,
            width: "100%"
          }}
          keyboardVerticalOffset={scaleVertical(70)}
          behavior="padding"
          enabled
        >
          <InsertIIN
            navigation={this.props.navigation}
            handleChange={value => this.handleChange("iin", value)}
            action={() => this.addIIN()}
            loader={this.props.loader}
            err={this.props.error}
            value={this.state.iin}
          />
        </KeyboardAvoidingView>
        <Footer />
      </View>
    );
  }
}

const mapStateToProps = state => {
  const { error, auth, review, agency, loader } = state;
  return {
    error,
    auth,
    agency,
    review,
    loader: loader.status
  };
};

const mapDispatchToProps = dispatch => {
  return {
    addIIN: bindActionCreators(addIIN, dispatch),
    initialError: bindActionCreators(initialError, dispatch),
    saveReview: bindActionCreators(saveReview, dispatch)
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(InsertIINScreen);
