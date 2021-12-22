import PropTypes from "prop-types";
import React, { Component } from "react";
import { NavigationActions } from "react-navigation";
import {
  ScrollView,
  Text,
  View,
  StyleSheet,
  Image,
  TouchableOpacity
} from "react-native";
import { Theme } from "../configs/theme";
import { scale, scaleVertical } from "../configs";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { logOut } from "../actions/authActions";

class SideMenu extends Component {
  navigateToScreen = route => {
    const navigateAction = NavigationActions.navigate({
      routeName: route
    });
    this.props.navigation.dispatch(navigateAction);
  };
  beautifyPhone = phone => {
    let newPhone = phone ? phone.replace(/[^0-9.]/g, "") : null;
    if (newPhone && newPhone.length == 10) {
      newPhone = phone;
      return `+7(${phone.substring(0, 3)}) ${phone.substring(
        3,
        6
      )} ${phone.substring(6, 8)} ${phone.substring(8, 10)}`;
    } else if (newPhone && newPhone.length == 11) {
      newPhone = newPhone.substr(1);
      return `+7(${phone.substring(0, 3)}) ${phone.substring(
        3,
        6
      )} ${phone.substring(6, 8)} ${phone.substring(8, 10)}`;
    } else return newPhone;
  };
  render() {
    return (
      <View style={styles.container}>
        <ScrollView>
          {this.props.auth.user_authorized ? (
            <View style={styles.profileItem}>
              <TouchableOpacity
                style={styles.profileItemAvatar}
                onPress={() => this.navigateToScreen("ProfileScreen")}
              >
                <Text style={styles.profileItemAvatarInitials}>
                  {this.props.auth.user_email &&
                  this.props.auth.user_email.length
                    ? this.props.auth.user_email[0].toUpperCase()
                    : null}
                </Text>
              </TouchableOpacity>
              <View style={styles.profileItemInfo}>
                <Text
                  style={styles.signinItemTitle}
                  numberOfLines={1}
                  ellipsizeMode="tail"
                >
                  {this.props.auth.user_phone
                    ? this.beautifyPhone(this.props.auth.user_phone)
                    : this.props.auth.user_email
                    ? this.props.auth.user_email
                    : null}
                </Text>
                {/* <Text style={styles.signinItemText}>
                  Вы находитесь в{" "}
                  <Text style={styles.profileItemTextYellow}>г. Алматы</Text>
                </Text> */}
              </View>
            </View>
          ) : (
            <View style={styles.signinItem}>
              <TouchableOpacity
                onPress={() => this.navigateToScreen("SigninScreen")}
              >
                <Text style={styles.signinItemTitle}>
                  Войти в личный кабинет
                </Text>
              </TouchableOpacity>
              {/* <Text style={styles.signinItemText}>
                Вы находитесь в{" "}
                <Text style={styles.signinItemTextBold}>г. Алматы</Text>
              </Text> */}
            </View>
          )}

          <TouchableOpacity
            style={styles.navigationItem}
            onPress={() => this.navigateToScreen("HomeViewScreen")}
          >
            <Image
              source={require("../../assets/icons/sidemenu/home.png")}
              style={styles.icon}
            />
            <Text style={styles.navigationItemText}>Главная</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.navigationItem}
            onPress={() => this.navigateToScreen("NotificationsScreen")}
          >
            <Image
              source={require("../../assets/icons/sidemenu/notif.png")}
              style={styles.icon}
            />
            <Text style={styles.navigationItemText}>Уведомления</Text>
          </TouchableOpacity>
          {this.props.auth.user_authorized ? (
            <TouchableOpacity
              style={styles.navigationItem}
              onPress={() => this.navigateToScreen("ReviewHistoryScreen")}
            >
              <Image
                source={require("../../assets/icons/sidemenu/history.png")}
                style={styles.icon}
              />
              <Text style={styles.navigationItemText}>
                История жалоб ({this.props.reviews})
              </Text>
            </TouchableOpacity>
          ) : null}

          <TouchableOpacity
            style={styles.navigationItem}
            onPress={() => this.navigateToScreen("SettingsScreen")}
          >
            <Image
              source={require("../../assets/icons/sidemenu/settings.png")}
              style={styles.icon}
            />
            <Text style={styles.navigationItemText}>Настройки</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.navigationItem}
            onPress={() => this.navigateToScreen("AppInfoScreen")}
          >
            <Image
              source={require("../../assets/icons/sidemenu/about.png")}
              style={styles.icon}
            />
            <Text style={styles.navigationItemText}>О Digital Agent</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.navigationItem}
            onPress={() => this.navigateToScreen("SupportScreen")}
          >
            <Image
              source={require("../../assets/icons/sidemenu/problem.png")}
              style={styles.icon}
            />
            <Text style={styles.navigationItemText}>Сообщить о проблеме</Text>
          </TouchableOpacity>
          {this.props.auth.user_authorized ? (
            <TouchableOpacity
              style={styles.navigationItem}
              onPress={() => this.props.logOut()}
            >
              <Image
                source={require("../../assets/icons/sidemenu/exit.png")}
                style={styles.icon}
              />
              <Text style={styles.navigationItemTextBold}>Выйти</Text>
            </TouchableOpacity>
          ) : null}
        </ScrollView>
        <View style={styles.footerContainer}>
          <Text style={styles.footerText}>
            © 2019 <Text style={styles.footerTextYellow}>Digital Agent</Text>.
          </Text>
          <Text style={styles.footerText}>Все права принадлежат народу.</Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    paddingTop: scaleVertical(56),
    flex: 1
  },
  signinItem: {
    backgroundColor: Theme.colors.yellow,
    padding: scale(16)
  },
  signinItemTitle: {
    color: Theme.colors.grayDark,
    fontFamily: "PTRootUIMedium",
    fontSize: Theme.fonts.sizes.h4
  },
  signinItemText: {
    color: Theme.colors.grayDark,
    fontFamily: "PTRootUIRegular",
    fontSize: scale(13)
  },
  signinItemTextBold: {
    color: Theme.colors.grayDark,
    fontFamily: "PTRootUIMedium",
    fontSize: scale(13)
  },
  profileItem: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    paddingHorizontal: scale(16),
    overflow: "hidden"
  },
  profileItemInfo: {
    display: "flex",
    justifyContent: "space-around"
  },
  profileItemTextYellow: {
    color: Theme.colors.yellow,
    fontFamily: "PTRootUIMedium",
    fontSize: scale(13)
  },
  profileItemAvatar: {
    width: scale(60),
    height: scale(60),
    backgroundColor: Theme.colors.yellow,
    borderRadius: scale(30),
    marginRight: scale(16),
    display: "flex",
    alignItems: "center",
    alignContent: "center",
    justifyContent: "center"
  },
  profileItemAvatarInitials: {
    textAlign: "center",
    color: "rgb(255, 255, 255)",
    fontSize: Theme.fonts.sizes.h4
  },
  navigationItem: {
    display: "flex",
    height: scaleVertical(22),
    flexDirection: "row",
    paddingHorizontal: scale(16),
    marginTop: scaleVertical(32)
  },
  navigationItemText: {
    color: Theme.colors.grayDark,
    fontFamily: "PTRootUIRegular",
    fontSize: scale(17)
  },
  navigationItemTextBold: {
    color: Theme.colors.grayDark,
    fontFamily: "PTRootUIMedium",
    fontSize: scale(17)
  },
  icon: {
    width: scale(20),
    height: scale(20),
    marginRight: scale(12)
  },
  footerContainer: {
    padding: 20
  },
  footerText: {
    textAlign: "center",
    fontFamily: "PTRootUIRegular",
    color: Theme.colors.gray40,
    fontSize: Theme.fonts.sizes.p2
  },
  footerTextYellow: {
    fontFamily: "PTRootUIMedium",
    color: Theme.colors.yellow,
    fontSize: Theme.fonts.sizes.p2
  }
});

SideMenu.propTypes = {
  navigation: PropTypes.object
};

export default connect(
  state => ({ auth: state.auth, reviews: state.review.user_reviews_count }),
  dispatch => ({ logOut: bindActionCreators(logOut, dispatch) })
)(SideMenu);
