import React from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import * as Location from "expo-location";
import * as Permissions from "expo-permissions";
import { scaleVertical, scale } from "../configs";

import {
  View,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard
} from "react-native";
import EstimateAgency from "../containers/EstimateAgency";
import Footer from "../components/Footer";
import SelectService from "../components/SelectService";
import { BottomSheet } from "react-native-btr";

import { StylePanel } from "../configs/styles";
import {
  saveReview,
  updateReview,
  validateReview
} from "../actions/reviewActions";
import { isLoggedIn } from "../actions/authActions";
import { checkWorkTime } from "../actions/agencyActions";
import { Theme } from "../configs/theme";

class EstimateAgencyScreen extends React.Component {
  state = {
    isOpen: false,
    fullWidth: true,
    customPanel: false,
    customPanelState: {
      isOpen: false,
      openLarge: false,
      fullWidth: false,
      noBackgroundOpacity: false,
      closeButton: false
    },
    location: null
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
  sendReview = async () => {
    const nextPage =
      this.props.agency.agency_type.short_name === "con" ||
      this.props.agency.agency_type.short_name === "kgd" ||
      (this.props.agency.agency.accountable_firstname &&
        this.props.agency.agency.accountable_phone)
        ? "TimerScreen"
        : "FeedbackScreen";

    const nextPageNotWorkTime =
      this.props.agency.agency_type.short_name === "con" ||
      this.props.agency.agency_type.short_name === "kgd" ||
      (this.props.agency.agency.accountable_firstname &&
        this.props.agency.agency.accountable_phone)
        ? "SuccessFeedbackScreen"
        : "FeedbackScreen";

    // если авторизован
    if (await isLoggedIn()) {
      switch (this.props.review.rating) {
        case 5:
          this.saveReview("SuccessFeedbackScreen");
          break;

        case 4:
          this.saveReview("SuccessFeedbackScreen");
          break;

        default:
          checkWorkTime(this.props.agency.agency._id)
            .then(result => {
              const next = result ? nextPage : nextPageNotWorkTime;

              if (this.props.verified) {
                this.props.agency.agency_type.iin &&
                (!this.props.user_iin || this.props.user_iin === "")
                  ? this.props.navigation.navigate("InsertIINScreen", {
                      next: next
                    })
                  : this.saveReview(next);
              } else {
                if (
                  this.props.agency.agency_type.iin &&
                  (!this.props.user_iin || this.props.user_iin === "")
                ) {
                  this.props.navigation.navigate("InsertPhoneScreen", {
                    next: "InsertIINScreen"
                  });
                } else {
                  this.props.navigation.navigate("InsertPhoneScreen", {
                    next: next
                  });
                }
              }
            })
            .catch(err => {
              if (this.props.verified) {
                this.props.agency.agency_type.iin &&
                (!this.props.user_iin || this.props.user_iin === "")
                  ? this.props.navigation.navigate("InsertIINScreen", {
                      next: nextPageNotWorkTime
                    })
                  : this.saveReview(nextPageNotWorkTime);
              } else {
                if (
                  this.props.agency.agency_type.iin &&
                  (!this.props.user_iin || this.props.user_iin === "")
                ) {
                  this.props.navigation.navigate("InsertPhoneScreen", {
                    next: "InsertIINScreen"
                  });
                } else {
                  this.props.navigation.navigate("InsertPhoneScreen", {
                    next: nextPageNotWorkTime
                  });
                }
              }
            });

          break;
      }
    } else {
      switch (this.props.review.rating) {
        case 5:
          if (this.props.user && this.props.user.email) {
            this.saveReview("SuccessFeedbackScreen");
          } else {
            this.props.navigation.navigate("InsertEmailScreen", {
              next: "SuccessFeedbackScreen"
            });
          }
          break;

        case 4:
          if (this.props.user && this.props.user.email) {
            this.saveReview("SuccessFeedbackScreen");
          } else {
            this.props.navigation.navigate("InsertEmailScreen", {
              next: "SuccessFeedbackScreen"
            });
          }
          break;

        default:
          checkWorkTime(this.props.agency.agency._id)
            .then(result => {
              const next = result ? nextPage : nextPageNotWorkTime;

              if (
                this.props.user &&
                this.props.user.phone &&
                this.props.user.verified
              ) {
                this.props.agency.agency_type.iin &&
                !(this.props.user.iin && this.props.user.iin !== "")
                  ? this.props.navigation.navigate("InsertIINScreen", {
                      next: next
                    })
                  : this.saveReview(next);
              } else {
                this.props.navigation.navigate("InsertPhoneScreen", {
                  next: next
                });
              }
            })
            .catch(err => {
              if (
                this.props.user &&
                this.props.user.phone &&
                this.props.user.verified
              ) {
                this.props.agency.agency_type.iin &&
                !(this.props.user.iin && this.props.user.iin !== "")
                  ? this.props.navigation.navigate("InsertIINScreen", {
                      next: nextPageNotWorkTime
                    })
                  : this.saveReview(next);
              } else {
                this.props.navigation.navigate("InsertPhoneScreen", {
                  next: nextPageNotWorkTime
                });
              }
            });

          break;
      }
    }
  };
  openServicePanel = () => {
    this.setState({
      isOpen: true,
      openLarge: true,
      closeButton: this.closePanel,
      noBackgroundOpacity: false
    });
  };
  closePanel = () => {
    this.setState({
      customPanelState: { ...this.state.customPanelState, isOpen: false },
      isOpen: false
    });
  };
  searchService = async value => {
    let regExp = new RegExp(value, "i");
    let filtered = await this.props.agency.agency_type.services.filter(
      item => item.name_ru.search(regExp) != -1
    );
    this.setState({
      list: filtered
    });
  };
  updateReview = async value => {
    this.props.updateReview("service", value);
    this.closePanel();
  };
  _getLocationAsync = async () => {
    let { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== "granted") {
      this.setState({
        errorMessage: "Permission to access location was denied"
      });
    } else {
      try {
        let location = await Location.getCurrentPositionAsync({});
        this.setState({ location });
      } catch {}
    }
  };
  renderContent = () => (
    <SelectService
      search={value => this.searchService(value)}
      services={this.props.agency.agency_type.services}
      update={value => this.updateReview(value)}
    />
  );

  render() {
    const panelState = this.state.customPanelState.isOpen
      ? this.state.customPanelState
      : this.state;
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
          <EstimateAgency
            navigation={this.props.navigation}
            agency={this.props.agency.agency}
            agency_type={this.props.agency.agency_type}
            review={this.props.review}
            update={(name, value) => this.props.updateReview(name, value)}
            saveReview={this.saveReview}
            sendReview={() =>
              this.props.validateReview(this.props.review, () =>
                this.sendReview()
              )
            }
            error={this.props.error}
            loader={this.props.loader}
            openServicePanel={this.openServicePanel}
          />
        </TouchableWithoutFeedback>
        <Footer />

        <BottomSheet
          visible={panelState.isOpen}
          onBackButtonPress={panelState.closeButton ? this.closePanel : null}
          onBackdropPress={panelState.closeButton ? this.closePanel : null}
        >
          <View
            style={{
              backgroundColor: "#fff",
              width: "100%",
              height: scaleVertical(640),
              justifyContent: "center",
              alignItems: "center",
              borderTopLeftRadius: scale(8),
              borderTopEndRadius: scale(8)
            }}
          >
            <View
              style={{
                width: scale(32),
                height: scale(4),
                backgroundColor: Theme.colors.gray10,
                borderRadius: scale(8),
                marginTop: scaleVertical(12)
              }}
            ></View>
            <SelectService
              search={value => this.searchService(value)}
              services={this.props.agency.agency_type.services}
              update={value => this.updateReview(value)}
            />
          </View>
        </BottomSheet>
      </View>
    );
  }
}

const mapStateToProps = state => {
  const { agency, review, auth, error, loader } = state;
  return {
    agency: agency,
    review: review,
    verified: auth.user_verified,
    user_iin: auth.user_iin,
    user: auth.user,
    error,
    loader: loader.status
  };
};

const mapDispatchToProps = dispatch => {
  return {
    updateReview: bindActionCreators(updateReview, dispatch),
    saveReview: bindActionCreators(saveReview, dispatch),
    validateReview: bindActionCreators(validateReview, dispatch)
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EstimateAgencyScreen);
