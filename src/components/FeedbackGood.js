import React from "react";
import {
  StyleSheet,
  View,
  Image,
  Text,
  TouchableOpacity,
  Platform
} from "react-native";
import { Overlay } from "react-native-elements";
import { scale, scaleVertical } from "../configs/index";
import localeStore from "../locale/localeStore";
import { Theme } from "../configs/theme";
import YellowButton from "./YellowButton";

const FeedbackGood = props => (
  <Overlay
    isVisible={props.isVisible}
    width={scale(327)}
    height={scale(404)}
    borderRadius={scale(8)}
  >
    <View style={styles.container}>
      <TouchableOpacity style={styles.left} onPress={props.goBack}>
        <Image
          style={styles.back}
          source={require("../../assets/icons/backGray.png")}
        />
      </TouchableOpacity>
      <Image
        style={styles.image}
        source={require("../../assets/icons/happy.png")}
      />
      <Text style={styles.title}>Спасибо, мы очень рады!</Text>
      <Text style={styles.subText}>
        Вы можете поблагодарить нас, оценив и оставив отзыв в{" "}
        {Platform.OS === "android" ? "Play Market" : "App Store"}
      </Text>
      <YellowButton
        text={"Перейти в App Store"}
        width={scale(279)}
        action={props.rateApp}
      />
      <TouchableOpacity onPress={props.onSkip}>
        <Text style={styles.skipText}>Пропустить</Text>
      </TouchableOpacity>
    </View>
  </Overlay>
);

const styles = StyleSheet.create({
  left: {
    width: "100%",
    display: "flex",
    alignItems: "flex-start",
    alignContent: "flex-start",
    justifyContent: "flex-start"
  },
  back: {
    width: scale(24),
    height: scale(24)
  },
  image: {
    width: scale(136),
    height: scale(96)
  },
  container: {
    flex: 1,
    alignContent: "center",
    alignItems: "center",
    padding: scale(10)
  },
  title: {
    color: "rgb(37, 44, 50)",
    fontFamily: "PTRootUIMedium",
    fontSize: Theme.fonts.sizes.h4,
    textAlign: "center",
    marginTop: scale(44)
  },
  subText: {
    color: "rgba(37, 44, 50, 0.6)",
    fontSize: scale(15),
    textAlign: "center",
    marginTop: scale(12),
    marginBottom: scale(24)
  },
  skipText: {
    color: Theme.colors.yellow,
    fontSize: Theme.fonts.sizes.p6,
    fontFamily: "PTRootUIBold",
    marginTop: scale(16)
  }
});

export default FeedbackGood;
