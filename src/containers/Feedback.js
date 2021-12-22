import React from "react";
import { StyleSheet, View, Text, Image } from "react-native";
import { Theme } from "../configs/theme";
import { scale } from "../configs";
import localeStore from "../locale/localeStore";

import YellowButton from "../components/YellowButton";

const Feedback = props => (
  <View style={styles.container}>
    <Image
      source={require("../../assets/icons/feedBack/workhour.png")}
      width="222"
      height="247"
    />
    <Text style={styles.yellowTitleText}>
      Данное учреждение пока не сотрудничает с нами, но мы делаем все возможное
      чтобы они отреагировали на Ваш отзыв и отправим Ваш отзыв руководству
      данного учреждения
    </Text>
    <YellowButton
      width="100%"
      text={localeStore.back}
      action={() => props.navigation.navigate("HomeViewScreen")}
    />
    {/*<Text style={styles.yellowSubTitleText}>{localeStore.shareWithFriend}</Text>*/}
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
  yellowTitleText: {
    // color: Theme.colors.yellow,
    color: "rgb(37, 44, 50)",
    fontSize: Theme.fonts.sizes.h6,
    fontFamily: "RobotoThin",
    textAlign: "center",
    marginVertical: scale(30)
  },
  yellowSubTitleText: {
    color: "rgb(254, 185, 0)",
    fontSize: Theme.fonts.sizes.p4,
    marginTop: scale(24)
  }
});

export default Feedback;
