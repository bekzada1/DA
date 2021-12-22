import React from "react";
import { createStackNavigator } from "react-navigation-stack";
import { scale } from "../configs";
import { View, Text } from "react-native";

import Header from "../components/Header";
import HeaderBackButton from "../components/HeaderBackButton";
import HeaderMenuButton from "../components/HeaderMenuButton";
import HeaderText from "../components/HeaderText";

import NotificationsScreen from "../screens/NotificationsScreen";
import SupportScreen from "../screens/SupportScreen";
import ReviewHistoryScreen from "../screens/ReviewHistoryScreen";
import SettingsScreen from "../screens/SettingsScreen";
import InsertEmailScreen from "../screens/InsertEmailScreen";
import ProfileEditScreen from "../screens/ProfileEditScreen";
import AppInfoScreen from "../screens/AppInfoScreen";
import ProfileScreen from "../screens/ProfileScreen";
import { Theme } from "../configs/theme";
import { TouchableOpacity } from "react-native-gesture-handler";

const ProfileStack = createStackNavigator(
  {
    ProfileScreen: {
      screen: ProfileScreen,
      navigationOptions: ({ navigation }) => ({
        headerTitle: <HeaderText text={"Профиль"} />,
        headerLeft: <HeaderMenuButton nav={navigation} />,
        headerRight: (
          <TouchableOpacity
            onPress={() => navigation.navigate("ProfileEditScreen")}
          >
            <Text
              style={{
                color: Theme.colors.yellow,
                fontSize: Theme.fonts.sizes.p6,
                marginRight: scale(16)
              }}
            >
              Изменить
            </Text>
          </TouchableOpacity>
        )
      })
    },
    NotificationsScreen: {
      screen: NotificationsScreen,
      navigationOptions: ({ navigation }) => ({
        headerTitle: <HeaderText text={"Уведомления"} />,
        headerLeft: <HeaderMenuButton nav={navigation} />
      })
    },
    SupportScreen: {
      screen: SupportScreen,
      navigationOptions: ({ navigation }) => ({
        headerTitle: <HeaderText text={"Сообщить о проблеме"} />,
        headerLeft: <HeaderMenuButton nav={navigation} />
      })
    },
    ReviewHistoryScreen: {
      screen: ReviewHistoryScreen,
      navigationOptions: ({ navigation }) => ({
        headerTitle: <HeaderText text={"История жалоб"} />,
        headerLeft: <HeaderMenuButton nav={navigation} />
      })
    },
    SettingsScreen: {
      screen: SettingsScreen,
      navigationOptions: ({ navigation }) => ({
        headerTitle: <HeaderText text={"Настройки"} />,
        headerLeft: <HeaderMenuButton nav={navigation} />
      })
    },
    InsertEmailScreen: {
      screen: InsertEmailScreen,
      navigationOptions: {
        header: null
      }
    },
    ProfileEditScreen: {
      screen: ProfileEditScreen,
      navigationOptions: ({ navigation }) => ({
        headerTitle: <HeaderText text={"Редактировать профиль"} />
      })
    },
    AppInfoScreen: {
      screen: AppInfoScreen,
      navigationOptions: ({ navigation }) => ({
        headerLeft: <HeaderMenuButton nav={navigation} />
      })
    }
  },
  {
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

export default ProfileStack;
