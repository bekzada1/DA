import React from "react";
import { View } from "react-native";
import { StylePanel } from "../configs/styles";

import BadFeedback from "../containers/BadFeedback";
import Footer from "../components/Footer";

export default class BadFeedbackScreen extends React.Component {
  render() {
    return (
      <View style={StylePanel.container}>
        <BadFeedback navigation={this.props.navigation} />
        <Footer />
      </View>
    );
  }
}
