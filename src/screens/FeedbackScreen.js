import React from "react";

import { StylePanel } from "../configs/styles";

import { View } from "react-native";
import Footer from "../components/Footer";
import Feedback from "../containers/Feedback";

export default class FeedbackScreen extends React.Component {
  render() {
    return (
      <View style={StylePanel.container}>
        <Feedback navigation={this.props.navigation} />
        <Footer />
      </View>
    );
  }
}
