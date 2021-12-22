import React from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";

import { StylePanel } from "../configs/styles";

import SelectService from "../containers/SelectService";
import { View } from "react-native";
import Footer from "../components/Footer";
import Search from "../components/Search";

import { updateReview } from "../actions/reviewActions";

class SelectServiceScreen extends React.Component {
  state = {
    list: this.props.services
  };
  updateService = value => {
    this.props.updateReview("service", value);
    this.props.navigation.navigate("EstimateAgencyScreen");
  };
  search = async value => {
    let regExp = new RegExp(value, "i");
    let filtered = await this.props.services.filter(
      item => item.name_ru.search(regExp) != -1
    );
    this.setState({
      list: filtered
    });
  };
  render() {
    return (
      <View style={StylePanel.container}>
        <View style={StylePanel.containerInner}>
          <Search action={value => this.search(value)} />
          <SelectService
            navigation={this.props.navigation}
            services={this.state.list}
            update={value => this.updateService(value)}
          />
        </View>
        <Footer />
      </View>
    );
  }
}

const mapStateToProps = state => {
  const { agency, loader } = state;
  return {
    services: agency.agency_type.services,
    loader: loader.status
  };
};

const mapDispatchToProps = dispatch => {
  return {
    updateReview: bindActionCreators(updateReview, dispatch)
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SelectServiceScreen);
