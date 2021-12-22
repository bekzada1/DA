import React from "react";
import { StyleSheet, View, Text } from "react-native";
import { StylePanel } from "../configs/styles";
import { Theme } from "../configs/theme";
import { scale, scaleVertical } from "../configs";

export default class AppInfoScreen extends React.Component {
  render() {
    return (
      <View style={StylePanel.container}>
        <View style={StylePanel.containerInner}>
          <View style={styles.container}>
            <Text style={styles.title}>Цифровой Агент</Text>
            <Text style={styles.description}>
              Digital Agent - это платформа для решении Ваших проблем, платформа
              для того чтобы быть услышанными. Наша миссия, подключить все гос
              органы и весь бизнес сектор для того чтобы они нас услышали и
              предприняли меры для улучшения своих сервисов.
            </Text>
            <Text style={styles.description}>
              Официальная страница проекта:
            </Text>
            <Text style={styles.yellowText}>digitalagent.kz</Text>
            <Text style={styles.subTitle}>Контакты</Text>
            <Text style={styles.description}>Свяжитесь с нами по номеру:</Text>
            <Text style={styles.descriptionBold}>+7 747 366 33 57</Text>
            <Text style={styles.description}>или, напишите нам на адрес:</Text>
            <Text style={styles.descriptionBold}>ok@automato.me</Text>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    alignContent: "center",
    marginTop: scaleVertical(30)
  },
  title: {
    fontFamily: "PTRootUIMedium",
    color: Theme.colors.grayDark,
    fontSize: Theme.fonts.sizes.h1,
    textAlign: "center"
  },
  subTitle: {
    fontFamily: "PTRootUIMedium",
    color: Theme.colors.grayDark,
    fontSize: Theme.fonts.sizes.h4,
    textAlign: "center",
    marginTop: scaleVertical(44)
  },
  description: {
    fontFamily: "PTRootUIRegular",
    color: Theme.colors.grayDark,
    fontSize: scale(17),
    textAlign: "center",
    marginTop: scaleVertical(16)
  },
  descriptionBold: {
    fontFamily: "PTRootUIMedium",
    color: Theme.colors.grayDark,
    fontSize: scale(17),
    textAlign: "center"
  },
  yellowText: {
    color: Theme.colors.yellow,
    fontFamily: "PTRootUIRegular",
    fontSize: scale(17),
    textAlign: "center"
  }
});
