import React from "react";
import { Linking } from "expo";
import { connect } from "react-redux";

import { StylePanel } from "../configs/styles";
import { StyleSheet, View, Text, Image, Platform } from "react-native";
import { Theme } from "../configs/theme";
import { scale, scaleVertical } from "../configs";

import Footer from "../components/Footer";
import YellowButton from "../components/YellowButton";
import { TouchableOpacity } from "react-native-gesture-handler";

class SuccessFeedbackScreen extends React.Component {
  _handlePress = () => {
    if (Platform.OS === "android") {
      Linking.openURL(
        "https://play.google.com/store/apps/details?id=com.automato.digitalagentapp"
      );
    } else {
      Linking.openURL(
        "https://apps.apple.com/kz/app/digital-agent/id1441630994"
      );
    }
  };
  render() {
    return (
      <View style={StylePanel.container}>
        <View style={styles.container}>
          <Image
            source={require("../../assets/icons/feedBack/mailbox.png")}
            style={styles.image}
          />
          <Text style={styles.title}>Ваша оценка отправлена</Text>
          <Text style={styles.subTitle}>
            {this.props.message} Также, Вы можете поблагодарить нас, оценив и
            оставив отзыв в{" "}
            {Platform.OS === "android" ? "Play market" : "App Store"}
          </Text>
          <YellowButton
            width="100%"
            text={`Перейти в ${
              Platform.OS === "android" ? "Play market" : "App Store"
            }`}
            action={this._handlePress}
          />
          <TouchableOpacity
            onPress={() => this.props.navigation.navigate("HomeViewScreen")}
          >
            <Text style={styles.yellowText}>Спасибо, в другой раз</Text>
          </TouchableOpacity>
        </View>
        <Footer />
      </View>
    );
  }
}

const mapStateToProps = state => {
  const { review } = state;
  return {
    message: review.review_message
  };
};

export default connect(mapStateToProps)(SuccessFeedbackScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    paddingHorizontal: scale(16),
    justifyContent: "center",
    alignItems: "center",
    alignContent: "center",
    textAlign: "center"
  },
  image: {
    width: scale(171),
    height: scale(150)
  },
  title: {
    marginTop: scaleVertical(64),
    color: Theme.colors.grayDark,
    fontFamily: "PTRootUIMedium",
    fontSize: Theme.fonts.sizes.h1,
    textAlign: "center"
  },
  subTitle: {
    color: Theme.colors.gray60,
    fontSize: scaleVertical(15),
    lineHeight: scaleVertical(20),
    textAlign: "center",
    marginTop: scaleVertical(16),
    marginBottom: scaleVertical(44)
  },
  yellowText: {
    color: Theme.colors.yellow,
    fontSize: Theme.fonts.sizes.p6,
    fontFamily: "PTRootUIBold",
    marginTop: scaleVertical(24),
    textAlign: "center"
    // marginVertical: scale(30)
  }
});
