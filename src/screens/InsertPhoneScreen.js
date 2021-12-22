import React from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";

import { StylePanel } from "../configs/styles";
import { scaleVertical } from "../configs";

import { View, KeyboardAvoidingView } from "react-native";
import InsertPhone from "../containers/InsertPhone";
import Footer from "../components/Footer";

import { initialError } from "../actions/errorActions";
import { savePhone } from "../actions/authActions";

class InsertPhoneScreen extends React.Component {
  state = {
    phone: ""
  };
  handleChange = (name, value) => {
    this.setState({
      [name]: value
    });
    this.props.initialError();
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
          <InsertPhone
            navigation={this.props.navigation}
            handleChange={value => this.handleChange("phone", value)}
            value={this.state.phone}
            err={this.props.error}
            loader={this.props.loader}
            action={() =>
              this.props.savePhone(
                this.state.phone,
                this.props.navigation.getParam("next", "App")
              )
            }
          />
        </KeyboardAvoidingView>
        <Footer />
      </View>
    );
  }
}

const mapStateToProps = state => {
  const { error, loader } = state;
  return {
    error,
    loader: loader.status
  };
};

const mapDispatchToProps = dispatch => {
  return {
    savePhone: bindActionCreators(savePhone, dispatch),
    initialError: bindActionCreators(initialError, dispatch)
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(InsertPhoneScreen);
