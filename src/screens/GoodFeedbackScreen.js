import React from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";

import { StylePanel } from "../configs/styles";

import { View } from "react-native";
import GoodFeedback from "../containers/GoodFeedback";
import Footer from "../components/Footer";

import { saveReview, updateReview } from "../actions/reviewActions";
import { checkWorkTime } from "../actions/agencyActions";

class GoodFeedbackScreen extends React.Component {
  saveReview = screen => {
    this.props.saveReview(
      {
        city_id: this.props.agency.city_id,
        district_id: this.props.agency.district_id,
        agency_type: this.props.agency.agency_type.short_name,
        agency_id: this.props.agency.agency._id
      },
      this.props.review,
      screen
    );
  };
  call = async answer => {
    if (answer) {
      await this.props.updateReview("call", true);
      if (this.props.auth.user_verified) {
        checkWorkTime(this.props.agency.agency._id)
          .then(result => {
            this.props.agency.agency_type.iin &&
            (!this.props.user_iin || this.props.user_iin === "")
              ? this.props.navigation.navigate("InsertIINScreen", {
                  next: result ? "TimerScreen" : "BadFeedbackScreen"
                })
              : this.saveReview(result ? "TimerScreen" : "BadFeedbackScreen");
          })
          .catch(err => this.saveReview("BadFeedbackScreen"));
      } else {
        checkWorkTime(this.props.agency.agency._id)
          .then(result =>
            this.props.navigation.navigate("InsertPhoneScreen", {
              next: result ? "TimerScreen" : "BadFeedbackScreen"
            })
          )
          .catch(err =>
            this.props.navigation.navigate("InsertPhoneScreen", {
              next: "BadFeedbackScreen"
            })
          );
      }
    } else this.saveReview("ExcelentFeedbackScreen");
  };
  render() {
    return (
      <View style={StylePanel.container}>
        <GoodFeedback
          navigation={this.props.navigation}
          action={answer => this.call(answer)}
          loader={this.props.loader}
        />
        <Footer />
      </View>
    );
  }
}

const mapStateToProps = state => {
  const { auth, agency, review, loader } = state;
  return {
    auth,
    agency,
    review,
    loader: loader.status
  };
};

const mapDispatchToProps = dispatch => {
  return {
    saveReview: bindActionCreators(saveReview, dispatch),
    updateReview: bindActionCreators(updateReview, dispatch)
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(GoodFeedbackScreen);
