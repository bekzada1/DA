import React from "react";
import {
  ActivityIndicator,
  View,
  TouchableWithoutFeedback,
  Keyboard
} from "react-native";
import { StylePanel } from "../configs/styles";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";

import Footer from "../components/Footer";
import Profile from "../containers/Profile";
import { Theme } from "../configs/theme";
import { deleteUser } from "../actions/authActions";

class ProfileScreen extends React.Component {
  componentWillReceiveProps(nextProps) {
    this.setState({
      list: nextProps.agencies
    });
  }
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
          <Profile
            auth={this.props.auth}
            navigation={this.props.navigation}
            deleteUser={this.props.deleteUser}
          />
        </TouchableWithoutFeedback>
        <Footer />
      </View>
    );
  }
}

const mapStateToProps = state => {
  const { loader, auth } = state;
  return {
    auth
  };
};

const mapDispatchToProps = dispatch => {
  return {
    deleteUser: bindActionCreators(deleteUser, dispatch)
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProfileScreen);
