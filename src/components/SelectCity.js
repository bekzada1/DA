import React from "react";
import {
  StyleSheet,
  View,
  ScrollView,
  Text,
  FlatList,
  TouchableOpacity
} from "react-native";

import localeStore from "../locale/localeStore";
import { Theme } from "../configs/theme";
import { scale } from "../configs";

const SelectCity = props => (
  <View style={styles.container}>
    <ScrollView>
      <View style={styles.listBg}>
        <Text style={styles.listTitle}>Вид услуги</Text>
        <View style={styles.separator}></View>
        <View style={styles.containerList}>
          <Text style={styles.listSubText}>
            Всего найдено услуг: {props.services ? props.services.length : 0}
          </Text>
          {props.services && props.services.length ? (
            <FlatList
              data={props.services ? props.services : []}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.listItem}
                  onPress={() => props.update(item)}
                >
                  <Text style={styles.listItemText}>{item.name_ru}</Text>
                </TouchableOpacity>
              )}
            />
          ) : null}
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
    fontSize: Theme.fonts.sizes.h6,
    marginTop: scale(16),
    marginBottom: scale(16),
    fontFamily: "PTRootUIMedium",
    textAlign: "center"
  },
  separator: {
    width: "100%",
    borderBottomWidth: scale(1),
    borderBottomColor: "rgba(37, 44, 50, 0.2)",
    marginBottom: scale(16)
  },
  listSubText: {
    fontFamily: "PTRootUIMedium",
    fontSize: scale(11),
    textAlign: "center",
    color: "rgba(37, 44, 50, 0.4)",
    marginBottom: scale(12)
  },
  listItem: {
    borderBottomColor: "rgba(37, 44, 50, 0.1)",
    borderBottomWidth: 1,
    paddingVertical: scale(12),
    width: "100%"
  },
  listItemText: {
    color: "rgb(37, 44, 50)",
    fontSize: Theme.fonts.sizes.p6,
    fontFamily: "PTRootUIRegular"
  }
});

export default SelectCity;
