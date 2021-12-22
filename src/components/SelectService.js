import React from "react";
import {
  StyleSheet,
  View,
  ScrollView,
  Text,
  FlatList,
  TouchableOpacity
} from "react-native";
import Search from "../components/Search";

import localeStore from "../locale/localeStore";
import { Theme } from "../configs/theme";
import { scale, scaleVertical } from "../configs";

class SelectService extends React.Component {
  state = {
    list: this.props.services
  };
  search = async value => {
    let regExp = new RegExp(value, "i");
    let filtered = await this.props.services.filter(
      item => item.name_ru.search(regExp) != -1
    );
    this.setState({
      list: filtered
    });
  };
  render() {
    return (
      <View style={styles.container}>
        <ScrollView>
          <View style={styles.listBg}>
            <Text style={styles.listTitle}>Вид услуги</Text>
            <View style={styles.separator}></View>

            <View style={styles.containerList}>
              <Search
                placeholder="Найдите вид услуги"
                style={{ marginTop: 0 }}
                action={value => this.search(value)}
              />
              <Text style={styles.listSubText}>
                Всего найдено услуг:{" "}
                {this.props.services ? this.props.services.length : 0}
              </Text>
              {this.state.list && this.state.list.length ? (
                <FlatList
                  data={this.state.list ? this.state.list : []}
                  keyExtractor={(item, index) => index.toString()}
                  renderItem={({ item }) => (
                    <TouchableOpacity
                      style={styles.listItem}
                      onPress={() => this.props.update(item)}
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
  }
}

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
    width: "100%",
    paddingHorizontal: scale(24)
  },
  listTitle: {
    color: "rgb(37, 44, 50)",
    fontSize: Theme.fonts.sizes.h6,
    marginTop: scaleVertical(12),
    marginBottom: scaleVertical(12),
    fontFamily: "PTRootUIMedium",
    textAlign: "center"
  },
  separator: {
    width: "100%",
    borderBottomWidth: scale(1),
    borderBottomColor: Theme.colors.gray10,
    marginBottom: scale(16)
  },
  listSubText: {
    fontFamily: "PTRootUIMedium",
    fontSize: scale(11),
    textAlign: "center",
    color: "rgba(37, 44, 50, 0.4)",
    marginTop: scaleVertical(8),
    marginBottom: scaleVertical(12)
  },
  listItem: {
    borderBottomColor: Theme.colors.gray10,
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

export default SelectService;
