import React from "react";
import {
  StyleSheet,
  View,
  ScrollView,
  Text,
  FlatList,
  TouchableOpacity
} from "react-native";

import { Theme } from "../configs/theme";
import { scale } from "../configs";

const SelectCity = props => (
  <View style={styles.container}>
    <ScrollView>
      <View style={styles.listBg}>
        <View style={styles.containerList}>
          <Text style={styles.listTitle}>{props.header}</Text>
          <FlatList
            data={props.list ? props.list : []}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) =>
              item.size ? (
                <TouchableOpacity
                  style={styles.listItem}
                  onPress={() => props.action(item._id)}
                >
                  <Text style={styles.listItemText}>{item.name}</Text>
                </TouchableOpacity>
              ) : (
                <View style={styles.listItem}>
                  <Text style={styles.listItemTextGray}>{item.name}</Text>
                </View>
              )
            }
          />
        </View>
      </View>
    </ScrollView>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%"
  },
  listBg: {
    alignItems: "center",
    alignContent: "center"
  },
  containerList: {
    width: scale(343)
  },
  listTitle: {
    color: "rgb(37, 44, 50)",
    fontSize: Theme.fonts.sizes.h1,
    marginBottom: scale(16),
    marginTop: scale(24),
    fontFamily: "PTRootUIMedium"
  },
  listItem: {
    borderBottomColor: "rgba(255, 255, 255, 0.12)",
    borderBottomWidth: 1,
    paddingVertical: scale(12),
    width: "100%"
  },
  listItemText: {
    color: "rgb(37, 44, 50)",
    fontSize: Theme.fonts.sizes.p6
  },
  listItemTextGray: {
    color: Theme.colors.gray40,
    fontSize: Theme.fonts.sizes.p6
  }
});

export default SelectCity;
