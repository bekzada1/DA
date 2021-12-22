import React from "react";

import { StylePanel } from "../configs/styles";
import { scale, scaleVertical } from "../configs/index";
import { Theme } from "../configs/theme";

import {
  StyleSheet,
  View,
  Image,
  Text,
  FlatList,
  TouchableOpacity
} from "react-native";

export default class NotificationsScreen extends React.Component {
  state = {
    notifications: [
      {
        text: "Оцени школы прямо сейчас!",
        read: false
      },
      {
        text: "Добро пожаловать, Цифровой Агент! Теперь ты можешь оценивать…",
        read: true
      },
      {
        text: "Оцени школы прямо сейчас!",
        read: true
      }
    ]
  };
  render() {
    return (
      <View style={StylePanel.container}>
        <View style={styles.container}>
          <View style={StylePanel.containerInner}>
            {this.props.notifications ? (
              <FlatList
                data={this.props.notifications ? this.props.notifications : []}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item }) => (
                  <TouchableOpacity style={styles.listItem}>
                    {!item.read ? (
                      <Image
                        source={require("../../assets/icons/pin.png")}
                        style={styles.icon}
                      />
                    ) : null}
                    <Text style={styles.listItemText}>{item.text}</Text>
                  </TouchableOpacity>
                )}
              />
            ) : (
              <Text style={styles.listItemText}>Уведомлений нет</Text>
            )}
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
    marginTop: scale(24)
  },
  listItem: {
    paddingVertical: scaleVertical(16),
    borderBottomColor: Theme.colors.gray10,
    borderBottomWidth: scale(1),
    display: "flex",
    flexDirection: "row",
    alignItems: "center"
  },
  listItemText: {
    fontFamily: "PTRootUIRegular",
    fontSize: scale(17),
    color: Theme.colors.grayDark
  },
  icon: {
    width: scale(8),
    height: scale(8),
    marginRight: scale(8)
  }
});
