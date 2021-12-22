import React, { Component } from "react";
import {
  Platform,
  StyleSheet,
  View,
  ScrollView,
  Image,
  Text
} from "react-native";
import YellowButton from "../components/YellowButton";
import { Theme } from "../configs/theme";
import { scale, scaleVertical } from "../configs/index";
import localeStore from "../locale/localeStore";

import Constants from "expo-constants";
import * as Location from "expo-location";
import * as Permissions from "expo-permissions";

class PermissionGeo extends Component {
  state = {
    location: null,
    errorMessage: null
  };

  componentWillMount() {
    if (Platform.OS === "android" && !Constants.isDevice) {
      this.setState({
        errorMessage:
          "Oops, this will not work on Sketch in an Android emulator. Try it on your device!"
      });
    } else {
      this._getLocationAsync();
    }
  }

  _getLocationAsync = async () => {
    let { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== "granted") {
      this.setState({
        errorMessage: "Permission to access location was denied"
      });
    }

    let location = await Location.getCurrentPositionAsync({});
    this.setState({ location });
  };
  render() {
    return (
      <View style={styles.container}>
        <ScrollView style={{ width: "100%", flex: 1 }}>
          <Image
            style={styles.imageGeo}
            source={require("../../assets/icons/geo.png")}
          />
          <View style={styles.containerInner}>
            <Text style={styles.geoTitle}>Геолокация</Text>
            <Text style={styles.geoDescription}>
              Оценивайте услугодателей именно в {"\n"}Вашем регионе, районе…
            </Text>
            <YellowButton
              width="100%"
              text="Ок, идем дальше"
              action={() => this.props.action()}
            ></YellowButton>
          </View>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    alignContent: "center",
    marginTop: scale(100),
    width: "100%"
  },
  containerInner: {
    paddingHorizontal: scale(24),
    width: "100%"
  },
  imageGeo: {
    width: "100%",
    height: scale(266),
    resizeMode: "contain"
  },
  geoTitle: {
    textAlign: "center",
    marginTop: scaleVertical(85),
    color: "rgb(37, 44, 50)",
    fontSize: Theme.fonts.sizes.h1,
    fontFamily: "PTRootUIMedium"
  },
  geoDescription: {
    color: "rgba(37, 44, 50, 0.6)",
    fontSize: Theme.fonts.sizes.pt6,
    fontFamily: "RobotoRegular",
    textAlign: "center",
    marginTop: Theme.verticals.sizes.pt16,
    marginBottom: Theme.verticals.sizes.pt87
  }
});

export default PermissionGeo;
