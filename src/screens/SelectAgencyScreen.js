import React from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";

import { ActivityIndicator, View } from "react-native";
import { StylePanel } from "../configs/styles";
import { Theme } from "../configs/theme";

import SelectAgency from "../containers/SelectAgency";
import Footer from "../components/Footer";

import { updateAgency } from "../actions/agencyActions";

class SelectAgencyScreen extends React.Component {
  state = {
    list: this.props.agencies ? this.props.agencies : []
  };
  updateAgency(item) {
    this.props.updateAgency("agency", item);
    this.props.navigation.navigate("EstimateAgencyScreen");
  }
  search = async value => {
    let regExp = new RegExp(value, "i");
    let filtered = await this.props.agencies.filter(
      item => item.name.search(regExp) != -1
    );
    this.setState({
      list: filtered
    });
  };
  componentWillReceiveProps(nextProps) {
    this.setState({
      list: nextProps.agencies
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
            <SelectAgency
              list={this.state.list}
              agency_type={this.props.agency_type}
              navigation={this.props.navigation}
              action={item => this.updateAgency(item)}
              count={this.props.count}
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
    agencies: agency.agencies,
    agency_type: agency.agency_type,
    count: agency.count_agencies,
    loader: loader.status
  };
};

const mapDispatchToProps = dispatch => {
  return {
    updateAgency: bindActionCreators(updateAgency, dispatch)
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SelectAgencyScreen);
