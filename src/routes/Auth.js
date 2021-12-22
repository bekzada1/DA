import React from "react";
import { View } from "react-native";
import { createStackNavigator } from "react-navigation-stack";
import { scale } from "../configs";

import Header from "../components/Header";
import HeaderBackButton from "../components/HeaderBackButton";

import SelectLangScreen from "../screens/SelectLangScreen";
import PermissionGeoScreen from "../screens/PermissionGeoScreen";
import SelectCityScreen from "../screens/SelectCityScreen";
import SelectDistrictScreen from "../screens/SelectDistrictScreen";
import SelectAgencyScreen from "../screens/SelectAgencyScreen";
import EstimateAgencyScreen from "../screens/EstimateAgencyScreen";
import SigninScreen from "../screens/SigninScreen";
import ResetPasswordScreen from "../screens/ResetPasswordScreen";
import CabinetScreen from "../screens/CabinetScreen";
import CheckEmailScreen from "../screens/CheckEmailScreen";

const AuthStack = createStackNavigator(
  {
    CabinetScreen: {
      screen: CabinetScreen,
      navigationOptions: {
        header: null
      }
    },
    SigninScreen: {
      screen: SigninScreen,
      navigationOptions: {
        header: null
      }
    },
    ResetPasswordScreen: {
      screen: ResetPasswordScreen,
      navigationOptions: {
        headerTitle: null
      }
    },
    CheckEmailScreen: {
      screen: CheckEmailScreen,
      navigationOptions: {
        headerTitle: null
      }
    },

    // LoginScreen: {
    //   screen: LoginScreen,
    //   navigationOptions: {
    //     header: null
    //   }
    // },
    // RegistrationScreen: {
    //   screen: RegistrationScreen,
    //   navigationOptions: {
    //     header: null
    //   }
    // },
    SelectLangScreen: {
      screen: SelectLangScreen,
      navigationOptions: {
        // headerLeft: null
      }
    },
    PermissionGeoScreen: {
      screen: PermissionGeoScreen,
      navigationOptions: {
        header: null
      }
    },
    SelectCityScreen: {
      screen: SelectCityScreen,
      navigationOptions: {
        // headerLeft: null
      }
    },
    SelectDistrictScreen: {
      screen: SelectDistrictScreen,
      navigationOptions: {
        // headerLeft: null
      }
    },
    SelectAgencyScreen: {
      screen: SelectAgencyScreen,
      navigationOptions: {
        // headerLeft: null
      }
    },
    EstimateAgencyScreen: {
      screen: EstimateAgencyScreen,
      navigationOptions: {
        // headerLeft: null
      }
    }
  },
  {
    initialRouteName: "SigninScreen",
    headerMode: "",
    defaultNavigationOptions: ({ navigation }) => ({
      headerStyle: {
        backgroundColor: "rgb(255,255,255)",
        borderBottomWidth: 0,
        width: "100%",
        elevation: 0, // remove shadow on Android
        shadowOpacity: 0
        // height: scale(53),
      },
      headerLeft: <HeaderBackButton nav={navigation} />,
      headerBackImage: <HeaderBackButton />,
      headerTitle: <Header />,
      headerRight: <View style={{ marginRight: scale(32) }}></View>,
      headerBackTitleStyle: {
        color: "#fff"
      }
    })
  }
);

export default AuthStack;
