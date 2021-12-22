import React from "react";
import { StyleSheet, View, Image, Text, TouchableOpacity } from "react-native";
import { Overlay } from "react-native-elements";
import { scale, scaleVertical, scaleModerate } from "../configs/index";
import localeStore from "../locale/localeStore";
import { Theme } from "../configs/theme";

const AssessCall = props => (
  <Overlay
    // style={styles.containerSearch}
    isVisible={props.isVisible}
    width={scale(327)}
    height={scale(404)}
    borderRadius={scale(8)}
  >
    <View style={styles.container}>
      <Image
        style={styles.image}
        source={require("../../assets/icons/call.png")}
      />
      <Text style={styles.title}>Оцените Ваш звонок</Text>
      <Text style={styles.subText}>Решили ли специалисты Вашу проблему?</Text>
      <View style={styles.row}>
        <TouchableOpacity
          style={styles.buttonGreen}
          onPress={props.successAction}
        >
          <Image
            style={styles.icon}
            source={require("../../assets/icons/like.png")}
          />
        </TouchableOpacity>
        <TouchableOpacity style={styles.buttonRed} onPress={props.failedAction}>
          <Image
            style={styles.icon}
            source={require("../../assets/icons/dislike.png")}
          />
        </TouchableOpacity>
      </View>
    </View>
  </Overlay>
);

const styles = StyleSheet.create({
  image: {
    width: scale(193),
    height: scale(180)
  },
  container: {
    flex: 1,
    alignContent: "center",
    alignItems: "center"
  },
  title: {
    color: "rgb(37, 44, 50)",
    fontFamily: "PTRootUIMedium",
    fontSize: Theme.fonts.sizes.h1,
    textAlign: "center",
    marginTop: scale(24)
  },
  subText: {
    color: "rgba(37, 44, 50, 0.6)",
    fontSize: Theme.fonts.sizes.h6,
    textAlign: "center",
    marginTop: scale(12)
  },
  row: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    marginTop: scale(24)
  },
  buttonRed: {
    width: scale(132),
    height: scale(52),
    backgroundColor: "rgb(223, 68, 58)",
    borderRadius: scale(8),
    display: "flex",
    justifyContent: "center",
    alignContent: "center",
    alignItems: "center"
  },
  buttonGreen: {
    width: scale(132),
    height: scale(52),
    backgroundColor: "rgb(62, 194, 95)",
    borderRadius: scale(8),
    display: "flex",
    justifyContent: "center",
    alignContent: "center",
    alignItems: "center",
    marginRight: scale(15)
  },
  icon: {
    width: scale(24),
    height: scale(24)
  }
});

export default AssessCall;
