import React from "react";

import { StylePanel } from "../configs/styles";
import { scale, scaleVertical } from "../configs";
import { Theme } from "../configs/theme";

import {
  StyleSheet,
  View,
  ScrollView,
  Image,
  Text,
  SafeAreaView
} from "react-native";
import Footer from "../components/Footer";
import YellowButton from "../components/YellowButton";

export default class CheckEmailScreen extends React.Component {
  render() {
    return (
      <View style={StylePanel.container}>
        <View style={StylePanel.containerInner}>
          <View style={styles.container}>
            {/* <View style={styles.iconWrapper}>
              <Image
                style={styles.icon}
                source={require("../../assets/icons/back.png")}
              />
            </View> */}
            <Image
              style={styles.image}
              source={require("../../assets/icons/passwordMail.png")}
            />
            <Text style={styles.title}>Проверьте почту</Text>
            <Text style={styles.description}>
              Мы отправили письмо на Вашу почту. Там есть ссылка для
              восстановления пароля.
            </Text>
            <YellowButton
              text={"Вернуться на страницу входа"}
              width={"100%"}
              action={() => this.props.navigation.navigate("SigninScreen")}
            />
          </View>
        </View>
        <Footer />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    alignContent: "center"
  },
  title: {
    color: Theme.colors.grayDark,
    fontSize: Theme.fonts.sizes.h1,
    fontFamily: "PTRootUIMedium",
    textAlign: "center",
    marginBottom: scaleVertical(16)
  },
  description: {
    color: Theme.colors.gray60,
    fontSize: scale(15),
    fontFamily: "PTRootUIMedium",
    textAlign: "center",
    marginBottom: scaleVertical(34)
  },
  image: {
    width: scale(189),
    height: scale(150),
    marginVertical: scaleVertical(60)
  },
  iconWrapper: {
    width: "100%",
    display: "flex",
    justifyContent: "flex-start"
  },
  icon: {
    width: scale(24),
    height: scale(24),
    marginTop: scaleVertical(50)
  }
});
