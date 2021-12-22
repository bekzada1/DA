import React from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";

import { StylePanel } from "../configs/styles";
import { Theme } from "../configs/theme";

import { ActivityIndicator, View, AsyncStorage } from "react-native";
import HomeView from "../containers/HomeView";
import Footer from "../components/Footer";

import { getAgencyTypes, updateAgency, search } from "../actions/agencyActions";
import { getReviewsHistory } from "../actions/reviewActions";

class HomeViewScreen extends React.Component {
  componentDidMount = () => {
    this.props.getReviewsHistory();
  };
  updateAgencyType = agency => {
    this.props.updateAgency("agency_type", agency);
    this.props.updateAgency("agency_types", this.props.all);
    if (agency && agency.subtypes && agency.subtypes.length) {
      this.props.updateAgency("agency_subtypes", agency.subtypes);
      this.props.navigation.navigate("AgencySubtypesScreen");
    } else this.props.navigation.navigate("SelectCityScreen");
  };
  search = value => {
    this.props.search(
      value,
      this.props.agency.all_gos,
      "name",
      "gos_agency_types"
    );
    this.props.search(
      value,
      this.props.agency.all_business,
      "name",
      "business_agency_types"
    );
  };

  render() {
    return (
      <View style={StylePanel.container}>
        {this.props.loader ? (
          <View style={StylePanel.middleView}>
            <ActivityIndicator size="large" color={Theme.colors.yellow} />
          </View>
        ) : (
          <HomeView
            navigation={this.props.navigation}
            gos_list={this.props.agency.gos_agency_types}
            business_list={this.props.agency.business_agency_types}
            all={this.props.agency.all_agency_types}
            action={item => this.updateAgencyType(item)}
            search={value => this.search(value)}
            count={this.props.agency.count_all_agencies}
          />
        )}
        <Footer />
      </View>
    );
  }
}

const mapStateToProps = state => {
  const { agency, loader } = state;
  return {
    agency,
    loader: loader.status
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getAgencyTypes: bindActionCreators(getAgencyTypes, dispatch),
    updateAgency: bindActionCreators(updateAgency, dispatch),
    search: bindActionCreators(search, dispatch),
    getReviewsHistory: bindActionCreators(getReviewsHistory, dispatch)
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(HomeViewScreen);
