import React from "react";
import {
  StyleSheet,
  View,
  Image,
  TextInput,
  TouchableOpacity
} from "react-native";
import { scale, scaleVertical } from "../configs/index";
import localeStore from "../locale/localeStore";

const Search = props => (
  <View style={[styles.containerSearch, props.style]}>
    <TouchableOpacity onPress={this.onPress}>
      <Image
        onPress={this.onPress}
        style={styles.searchIco}
        source={require("../../assets/icons/search_ico.png")}
      />
    </TouchableOpacity>
    <TextInput
      style={styles.inputSearch}
      placeholder={props.placeholder ? props.placeholder : localeStore.search}
      placeholderTextColor="rgba(37, 44, 50, 0.2)"
      onChangeText={value => props.action(value)}
    />
  </View>
);

const styles = StyleSheet.create({
  inputSearch: {
    flex: 1,
    color: "rgb(37, 44, 50)",
    fontFamily: "PTRootUIRegular",
    fontSize: scale(17)
  },
  containerSearch: {
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 1.0,
    elevation: 10,
    shadowColor: "rgba(37, 44, 50, 0.1)",
    flexDirection: "row",
    fontFamily: "RobotoRegular",
    justifyContent: "center",
    alignItems: "center",
    height: scale(52),
    width: "100%",
    backgroundColor: "rgb(255, 255, 255)",
    marginTop: scaleVertical(32),
    borderRadius: scale(8),
    paddingLeft: scale(15)
  },
  searchIco: {
    width: scale(16),
    height: scale(16),
    marginRight: scale(12)
  }
});

export default Search;
