import React from "react";
import { connect } from "react-redux";

import { StylePanel } from "../configs/styles";

import { View } from "react-native";
import SendReviewAdmin from "../containers/SendReviewAdmin";
import Footer from "../components/Footer";

class SendReviewAdminScreen extends React.Component {
  render() {
    return (
      <View style={StylePanel.container}>
        <SendReviewAdmin
          navigation={this.props.navigation}
          agency_type={this.props.agency_type}
        />
        <Footer />
      </View>
    );
  }
}

const mapStateToProps = state => {
  const { agency } = state;
  return {
    agency_type: agency.agency_type
  };
};

export default connect(mapStateToProps)(SendReviewAdminScreen);
