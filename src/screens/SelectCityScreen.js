import React from "react";
import { View, ActivityIndicator } from "react-native";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import { StylePanel } from "../configs/styles";
import { Theme } from "../configs/theme";
import localeStore from "../locale/localeStore";

import SelectCity from "../containers/SelectCity";
import Footer from "../components/Footer";
import Search from "../components/Search";

import { getAllcities, getDistricts } from "../actions/agencyActions";

class SelectCityScreen extends React.Component {
  state = {
    list: this.props.cities ? this.props.cities : []
  };
  componentDidMount() {
    this.props.getAllcities(
      this.props.agency_type.short_name,
      this.props.agency_type.subtypes && this.props.agency_type.subtypes.length
        ? this.props.agency_subtype.short_name
        : null
    );
  }
  getDistricts = id => {
    this.props.getDistricts(
      id,
      this.props.agency_type.short_name,
      this.props.agency_type.subtypes && this.props.agency_type.subtypes.length
        ? this.props.agency_subtype.short_name
        : null
    );
    this.props.navigation.navigate("SelectDistrictScreen");
  };
  search = async value => {
    let regExp = new RegExp(value, "i");
    let filtered = await this.props.cities.filter(
      item => item.name.search(regExp) != -1
    );
    this.setState({
      list: filtered
    });
  };
  componentWillReceiveProps(nextProps) {
    this.setState({
      list: nextProps.cities
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
            <SelectCity
              header={localeStore.select_region.header}
              navigation={this.props.navigation}
              list={this.state.list ? this.state.list : this.props.cities}
              action={id => this.getDistricts(id)}
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
    cities: agency.cities,
    agency_type: agency.agency_type,
    agency_subtype: agency.agency_subtype,
    loader: loader.status
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getAllcities: bindActionCreators(getAllcities, dispatch),
    getDistricts: bindActionCreators(getDistricts, dispatch)
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SelectCityScreen);
