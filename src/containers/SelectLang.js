import React from "react";
import {
  StyleSheet,
  View,
  ScrollView,
  FlatList,
  Text,
  Image,
  TouchableOpacity
} from "react-native";
import { Theme } from "../configs/theme";
import { scale, scaleVertical } from "../configs";
import YellowButton from "../components/YellowButton";

import localeStore from "../locale/localeStore";

export default class SelectLang extends React.Component {
  state = {
    lang: "ru"
  };
  changeLang = async value => {
    await localeStore.setLocale(value, () =>
      this.setState(() => ({ lang: value }))
    );
    await this.props.navigation.navigate("PermissionGeoScreen");
  };
  render() {
    return (
      <View style={styles.container}>
        <ScrollView>
          <View style={styles.containerList}>
            <View style={styles.listLangBg}>
              <Text style={styles.listTitle}>Выберите язык</Text>
              <Text style={styles.listDescription}>
                Вы сможете изменить язык интерфейса также в «Настройках»
                приложения
              </Text>
              <FlatList
                contentContainerStyle={styles.agencyTypes}
                style={{ width: "100%" }}
                numColumns={10}
                columnWrapperStyle={styles.agencyTypesColumn}
                data={[
                  {
                    text: "Қазақ",
                    img: require("../../assets/icons/lang/kz.png"),
                    status: "Ашық",
                    shortname: "kz"
                  },
                  {
                    text: "Русский",
                    img: require("../../assets/icons/lang/ru.png"),
                    status: "Доступно",
                    shortname: "ru"
                  },
                  {
                    text: "English",
                    img: require("../../assets/icons/lang/english.png"),
                    status: "Available",
                    shortname: "en"
                  }
                ]}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item, index }) => (
                  <TouchableOpacity
                    style={
                      this.state.lang && this.state.lang === item.shortname
                        ? [
                            index % 2 == 0
                              ? { marginRight: scale(15) }
                              : { marginLeft: scale(15) },
                            styles.listItem,
                            styles.activeLangItem
                          ]
                        : styles.listItem
                    }
                    // onPress={() => this.changeLang(item.shortname)}
                  >
                    <View style={styles.listItemView}>
                      <Image source={item.img} style={styles.langImage} />
                      <Text style={styles.listItemText}>{item.text}</Text>
                    </View>
                    <Text style={styles.listSubText}>{item.status}</Text>
                  </TouchableOpacity>
                )}
              />
            </View>
          </View>
        </ScrollView>
        <Text style={styles.listSubText}>
          По умолчанию выбран «Русский» язык
        </Text>
        <YellowButton width={"100%"} text={"Продолжить"} disabled={true} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    alignContent: "center",
    textAlign: "center",
    paddingHorizontal: scale(16),
    paddingVertical: scale(24)
  },
  containerList: {
    alignContent: "center",
    alignItems: "center"
  },
  listLangBg: {
    width: scale(343)
  },
  listTitle: {
    color: Theme.colors.grayDark,
    fontSize: Theme.fonts.sizes.h1,
    marginTop: scale(60),
    marginBottom: scale(16),
    fontFamily: "PTRootUIMedium",
    textAlign: "center"
  },
  listDescription: {
    color: Theme.colors.gray60,
    fontSize: scale(15),
    textAlign: "center"
  },
  listItem: {
    width: scale(156),
    height: scale(79),
    elevation: 2,
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 1.0,
    shadowColor: "rgba(37, 44, 50, 0.1)",
    padding: scale(16),
    backgroundColor: "rgb(255, 255, 255)",
    borderRadius: scale(8),
    marginBottom: scale(15)
    // display: "flex",
    // flexDirection: "row",
    // justifyContent: "space-between",
    // alignItems: "center",
  },
  listItemView: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center"
  },
  listItemText: {
    color: Theme.colors.grayDark,
    fontSize: Theme.fonts.sizes.h4
  },
  listSubText: {
    fontSize: scale(11),
    fontFamily: "PTRootUIRegular",
    color: Theme.colors.gray40,
    textAlign: "center",
    marginBottom: scaleVertical(16)
  },
  langImage: {
    width: scale(24),
    height: scale(24),
    marginRight: scale(8)
  },
  activeLangItem: {
    borderColor: Theme.colors.yellow,
    borderWidth: scale(1)
  },
  agencyTypes: {
    flex: 1,
    marginTop: scaleVertical(22),
    alignItems: "center",
    alignContent: "center",
    justifyContent: "center",
    paddingVertical: scaleVertical(2)
  },
  agencyTypesColumn: {
    // flex: 1,
    width: "100%",
    flexWrap: "wrap"
  }
});

// export default SelectCity
