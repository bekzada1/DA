import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import { StylePanel } from "../configs/styles";
import { Theme } from "../configs/theme";
import localeStore from "../locale/localeStore";

import { ActivityIndicator, View } from "react-native";
import Footer from "../components/Footer";
import Search from "../components/Search";
import SelectDistrict from "../containers/SelectDistrict";

import { getAgencies } from "../actions/agencyActions";

class SelectDistrictScreen extends React.Component {
  state = {
    list: this.props.districts ? this.props.districts : null
  };
  getAgencies = id => {
    this.props.getAgencies(
      id,
      this.props.agency_type.short_name,
      this.props.agency_type.subtypes && this.props.agency_type.subtypes.length
        ? this.props.agency_subtype.short_name
        : null
    );
    this.props.navigation.navigate("SelectAgencyScreen");
  };
  search = async value => {
    let regExp = new RegExp(value, "i");
    let filtered = await this.props.districts.filter(
      item => item.name.search(regExp) != -1
    );
    this.setState({
      list: filtered
    });
  };
  componentWillReceiveProps(nextProps) {
    this.setState({
      list: nextProps.districts
    });
  }
  render() {
    return (
      <View style={StylePanel.container}>
        {this.props.loader ? (
          <View style={StylePanel.middleView}>
            <ActivityIndicator size="large" color={Theme.colors.yellow} />
          </View>
        ) : (
          <View style={StylePanel.containerInner}>
            {/* <Search action={value => this.search(value)} /> */}
            <SelectDistrict
              header={localeStore.select_district.header}
              navigation={this.props.navigation}
              list={this.state.list}
              action={id => this.getAgencies(id)}
            />
          </View>
        )}
        <Footer />
      </View>
    );
  }
}

const mapStateToProps = state => {
  const { agency, loader } = state;
  return {
    districts: agency.districts,
    agency_type: agency.agency_type,
    agency_subtype: agency.agency_subtype,
    loader: loader.status
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getAgencies: bindActionCreators(getAgencies, dispatch)
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SelectDistrictScreen);
