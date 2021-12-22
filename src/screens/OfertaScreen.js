import React from "react";

import { StylePanel } from "../configs/styles";

import { View } from "react-native";
import Oferta from "../containers/Oferta";
import Footer from "../components/Footer";

export default class OfertaScreen extends React.Component {
  render() {
    return (
      <View style={StylePanel.container}>
        <Oferta />
        <Footer />
      </View>
    );
  }
}
