import React from "react";
import { createStackNavigator } from "react-navigation-stack";
import { scale } from "../configs";
import { View } from "react-native";

import Header from "../components/Header";
import HeaderMenuButton from "../components/HeaderMenuButton";
import HeaderBackButton from "../components/HeaderBackButton";

import IntroductionScreen from "../screens/IntroductionScreen";
import SelectLangScreen from "../screens/SelectLangScreen";
import PermissionGeoScreen from "../screens/PermissionGeoScreen";

import HomeViewScreen from "../screens/HomeViewScreen";
import AgencySubtypesScreen from "../screens/AgencySubtypesScreen";
import SelectCityScreen from "../screens/SelectCityScreen";
import SelectDistrictScreen from "../screens/SelectDistrictScreen";
import SelectAgencyScreen from "../screens/SelectAgencyScreen";
import EstimateAgencyScreen from "../screens/EstimateAgencyScreen";
import TimerScreen from "../screens/TimerScreen";
import ExcelentFeedbackScreen from "../screens/ExcelentFeedbackScreen";
import BadFeedbackScreen from "../screens/BadFeedbackScreen";
import FeedbackScreen from "../screens/FeedbackScreen";
import GoodFeedbackScreen from "../screens/GoodFeedbackScreen";
import SendReviewAdminScreen from "../screens/SendReviewAdminScreen";
import SuccessFeedbackScreen from "../screens/SuccessFeedbackScreen";

import InsertPhoneScreen from "../screens/InsertPhoneScreen";
import CodeSmsScreen from "../screens/CodeSmsScreen";
import InsertIINScreen from "../screens/InsertIINScreen";
import InsertEmailScreen from "../screens/InsertEmailScreen";

const AppStack = createStackNavigator(
  {
    IntroductionScreen: {
      screen: IntroductionScreen,
      navigationOptions: {
        header: null
      }
    },
    SelectLangScreen: {
      screen: SelectLangScreen,
      navigationOptions: {
        header: null
      }
    },
    PermissionGeoScreen: {
      screen: PermissionGeoScreen,
      navigationOptions: {
        header: null
      }
    },
    HomeViewScreen: {
      screen: HomeViewScreen,
      navigationOptions: {
        navigationOptions: ({ navigation }) => ({
          headerTitle: <Header />,
          headerLeft: <HeaderMenuButton nav={navigation} />
        })
      }
    },
    AgencySubtypesScreen: {
      screen: AgencySubtypesScreen,
      navigationOptions: {
        navigationOptions: ({ navigation }) => ({
          headerTitle: <Header />,
          headerLeft: <HeaderBackButton nav={navigation} />
        })
      }
    },
    SelectCityScreen: {
      screen: SelectCityScreen,
      navigationOptions: ({ navigation }) => ({
        headerLeft: <HeaderBackButton nav={navigation} />
      })
    },
    SelectDistrictScreen: {
      screen: SelectDistrictScreen,
      navigationOptions: ({ navigation }) => ({
        headerLeft: <HeaderBackButton nav={navigation} />
      })
    },
    SelectAgencyScreen: {
      screen: SelectAgencyScreen,
      navigationOptions: ({ navigation }) => ({
        headerLeft: <HeaderBackButton nav={navigation} />
      })
    },
    EstimateAgencyScreen: {
      screen: EstimateAgencyScreen,
      navigationOptions: ({ navigation }) => ({
        headerLeft: <HeaderBackButton nav={navigation} />
      })
    },
    TimerScreen: {
      screen: TimerScreen,
      navigationOptions: ({ navigation }) => ({
        headerTitle: <Header />,
        headerLeft: <HeaderMenuButton nav={navigation} />
      })
    },
    ExcelentFeedbackScreen: {
      screen: ExcelentFeedbackScreen,
      navigationOptions: ({ navigation }) => ({
        headerLeft: <HeaderBackButton nav={navigation} />
      })
    },
    GoodFeedbackScreen: {
      screen: GoodFeedbackScreen,
      navigationOptions: ({ navigation }) => ({
        headerLeft: <HeaderBackButton nav={navigation} />
      })
    },
    BadFeedbackScreen: {
      screen: BadFeedbackScreen,
      navigationOptions: ({ navigation }) => ({
        headerLeft: <HeaderBackButton nav={navigation} />
      })
    },
    FeedbackScreen: {
      screen: FeedbackScreen,
      navigationOptions: ({ navigation }) => ({
        headerLeft: <HeaderBackButton nav={navigation} />
      })
    },
    SendReviewAdminScreen: {
      screen: SendReviewAdminScreen,
      navigationOptions: ({ navigation }) => ({
        headerLeft: <HeaderBackButton nav={navigation} />
      })
    },
    InsertPhoneScreen: {
      screen: InsertPhoneScreen,
      navigationOptions: ({ navigation }) => ({
        headerLeft: <HeaderBackButton nav={navigation} />,
        headerTitle: null
      })
    },
    CodeSmsScreen: {
      screen: CodeSmsScreen,
      navigationOptions: ({ navigation }) => ({
        headerTitle: null,
        headerLeft: <HeaderBackButton nav={navigation} />
      })
    },
    InsertIINScreen: {
      screen: InsertIINScreen,
      navigationOptions: ({ navigation }) => ({
        headerLeft: <HeaderBackButton nav={navigation} />,
        headerTitle: null
      })
    },
    InsertEmailScreen: {
      screen: InsertEmailScreen,
      navigationOptions: ({ navigation }) => ({
        headerLeft: <HeaderBackButton nav={navigation} />,
        headerTitle: null
      })
    },
    SuccessFeedbackScreen: {
      screen: SuccessFeedbackScreen,
      navigationOptions: {
        headerTitle: null
      }
    }
  },
  {
    initialRouteName: "HomeViewScreen",
    headerMode: "",
    defaultNavigationOptions: ({ navigation }) => ({
      headerStyle: {
        backgroundColor: "rgb(255,255,255)",
        borderBottomWidth: 0,
        width: "100%",
        elevation: 0, // remove shadow on Android
        shadowOpacity: 0
      },
      headerLeft: <HeaderMenuButton nav={navigation} />,
      headerBackImage: <HeaderBackButton />,
      headerTitle: <Header />,
      headerRight: <View style={{ marginRight: scale(32) }}></View>,
      headerBackTitleStyle: {
        color: "#fff"
      }
    })
  }
);

export default AppStack;
