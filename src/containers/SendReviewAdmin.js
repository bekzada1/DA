import React from "react";
import { StyleSheet, View, Text, Image } from "react-native";
import { Theme } from "../configs/theme";
import { scale } from "../configs";
import localeStore from "../locale/localeStore";

import YellowButton from "../components/YellowButton";

const SendReviewAdmin = props => (
  <View style={styles.container}>
    <View style={styles.imageContainer}>
      <Image
        style={styles.imageContainer}
        source={require("../../assets/icons/mail.png")}
      />
    </View>
    <Text style={styles.titleText}>Ваша жалоба отправлена</Text>
    <Text style={styles.whiteSubTitleText}>
      В {props.agency_type.admin_name}.
    </Text>
    <YellowButton
      width="100%"
      text="Вернуться на главную"
      action={() => props.navigation.navigate("HomeViewScreen")}
    />
    {/*<Text style={styles.yellowSubTitleText}>Поделиться с друзьями</Text>*/}
  </View>
);

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
  imageContainer: {
    width: scale(189),
    height: scale(150),
    overflow: "hidden"
  },
  titleText: {
    color: "rgb(37, 44, 50)",
    fontSize: Theme.fonts.sizes.h1,
    fontFamily: "PTRootUIMedium",
    textAlign: "center",
    marginTop: scale(60)
  },
  whiteSubTitleText: {
    color: "rgba(37, 44, 50, 0.6)",
    fontSize: Theme.fonts.sizes.p4,
    marginTop: scale(16),
    textAlign: "center",
    marginBottom: scale(24),
    fontFamily: "PTRootUIMedium",
    lineHeight: scale(20)
  },
  yellowSubTitleText: {
    color: "rgb(254, 185, 0)",
    fontSize: Theme.fonts.sizes.p4,
    marginTop: scale(24)
  }
});

export default SendReviewAdmin;
