import React from "react";
import { StyleSheet, View, Text, Image } from "react-native";
import { Theme } from "../configs/theme";
import { scale } from "../configs";
import localeStore from "../locale/localeStore";

import YellowButton from "../components/YellowButton";
import WhiteButton from "../components/WhiteButton";

const GoodFeedback = props => (
  <View style={styles.container}>
    <View style={styles.container}>
      <Image
        source={require("../../assets/icons/feedBack/thanksIcon.png")}
        width="220"
        height="193"
        style={styles.image}
      />
      <Text style={styles.text}>Спасибо, что оценили нашу работу!</Text>
      <Text style={styles.text}>Вы хотите, чтобы с Вами связались?</Text>
      <View style={styles.buttonRow}>
        <YellowButton
          action={() => props.action(true)}
          width={scale(147)}
          text="Да"
          loader={props.loader}
        />
        <WhiteButton
          action={() => props.action(false)}
          width={scale(147)}
          text="Нет"
        />
      </View>
    </View>
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
  image: {
    marginBottom: scale(60)
  },
  text: {
    color: "rgb(255, 186, 0)",
    fontSize: Theme.fonts.sizes.h6,
    fontFamily: "RobotoThin",
    textAlign: "center",
    marginBottom: scale(16)
  },
  buttonRow: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%"
  }
});

export default GoodFeedback;
