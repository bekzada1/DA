import React from "react";

import { View } from "react-native";
import ExcelentFeedback from "../containers/ExcelentFeedback";
import Footer from "../components/Footer";

import { StylePanel } from "../configs/styles";

export default class ExcelentFeedbackScreen extends React.Component {
  render() {
    return (
      <View style={StylePanel.container}>
        <ExcelentFeedback navigation={this.props.navigation} />
        <Footer />
      </View>
    );
  }
}
