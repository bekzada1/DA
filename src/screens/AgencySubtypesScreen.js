import React from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";

import { StylePanel } from "../configs/styles";
import { Theme } from "../configs/theme";

import { ActivityIndicator, View, AsyncStorage } from "react-native";
import HomeView from "../containers/HomeView";
import Footer from "../components/Footer";

import { getAgencyTypes, updateAgency, search } from "../actions/agencyActions";

class AgencySubtypesScreen extends React.Component {
  updateAgencyType = agency => {
    this.props.updateAgency("agency_subtype", agency);
    this.props.navigation.navigate("SelectCityScreen");
  };
  search = value => {
    this.props.search(
      value,
      this.props.agency.agency_type.subtypes,
      "name",
      "agency_subtypes"
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
            gos_list={this.props.agency.agency_subtypes}
            business_list={[]}
            all={this.props.agency.agency_type.subtypes}
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
    search: bindActionCreators(search, dispatch)
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AgencySubtypesScreen);
