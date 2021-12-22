import React from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";

import { StylePanel } from "../configs/styles";

import { View } from "react-native";
import Footer from "../components/Footer";
import Timer from "../containers/Timer";

import {
  sendReviewToAdmin,
  updateReviewStatus,
  updateReview
} from "../actions/reviewActions";

class TimerScreen extends React.Component {
  sendReviewToAdmin() {
    // if(!this.props.auth.user_iin || this.props.auth.user_iin === '') this.props.navigation.navigate('InsertIINScreen', {next: 'SendReviewAdminScreen'})
    // else
    this.props.sendReviewToAdmin(
      this.props.agency_type.admin,
      this.props.review._id,
      "SendReviewAdminScreen"
    );
  }
  render() {
    return (
      <View style={StylePanel.container}>
        <Timer
          agency={this.props.agency}
          agency_type={this.props.agency_type}
          review={this.props.review}
          navigation={this.props.navigation}
          timer_step={this.props.timer_step}
          sendReviewToAdmin={() => this.sendReviewToAdmin()}
          updateReview={(name, value) => this.props.updateReview(name, value)}
          updateReviewStatus={() =>
            updateReviewStatus(
              this.props.review._id,
              this.props.timer_called,
              this.props.timer_solved
            )
          }
        />
        <Footer />
      </View>
    );
  }
}

const mapStateToProps = state => {
  const { agency, review, auth } = state;
  return {
    agency_type: agency.agency_type,
    agency: agency.agency,
    review: review.saved_review,
    timer_step: review.timer_step,
    timer_called: review.timer_called,
    timer_solved: review.timer_solved,
    auth
  };
};

const mapDispatchToProps = dispatch => {
  return {
    sendReviewToAdmin: bindActionCreators(sendReviewToAdmin, dispatch),
    updateReview: bindActionCreators(updateReview, dispatch)
    // updateReviewStatus: bindActionCreators(updateReviewStatus, dispatch)
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(TimerScreen);
