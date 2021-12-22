import React from "react";
import { ActivityIndicator, View, AsyncStorage } from "react-native";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { getUser } from "../actions/authActions";
import { getAgencyTypes, getVersion } from "../actions/agencyActions";
import { StylePanel } from "../configs/styles";
import { Theme } from "../configs/theme";
import { getItem } from "../actions/storage";

class AuthLoadingScreen extends React.Component {
  constructor(props) {
    super(props);
    this._bootstrapAsync();
  }

  // Fetch the token from storage then navigate to our appropriate place
  _bootstrapAsync = async () => {
    // await AsyncStorage.clear();
    this.props.getUser();
    const introduction = await getItem("introduction");
    this.props.getAgencyTypes();
    this.props.getVersion();
    const page =
      introduction === "passed" ? "HomeViewScreen" : "IntroductionScreen";
    this.props.navigation.navigate(page);
    // this.props.navigation.navigate("EstimateAgencyScreen");
  };

  // Render any loading content that you like here
  render() {
    return (
      <View style={StylePanel.middleView}>
        <ActivityIndicator size="large" color={Theme.colors.yellow} />
      </View>
    );
  }
}

const mapStateToProps = state => {
  const { auth } = state;
  return {
    auth: auth
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getUser: bindActionCreators(getUser, dispatch),
    getAgencyTypes: bindActionCreators(getAgencyTypes, dispatch),
    getVersion: bindActionCreators(getVersion, dispatch)
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AuthLoadingScreen);
