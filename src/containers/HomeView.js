import React from "react";
import {
  StyleSheet,
  View,
  ScrollView,
  Text,
  TouchableOpacity,
  FlatList
} from "react-native";
import { scale, scaleVertical } from "../configs/index";
import { Theme } from "../configs/theme";

import Search from "../components/Search";
import CachedImage from "../components/CachedImage";
import url from "../actions/baseURL";

export default class HomeViewScreen extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <View style={{ width: scale(312) }}>
          <Search action={value => this.props.search(value)} />
        </View>
        <ScrollView>
          <View style={{ width: scale(312) }}>
            <Text style={styles.title}>
              Всего найдено организаций: {this.props.count}
            </Text>
            <FlatList
              data={this.props.gos_list ? this.props.gos_list : []}
              keyExtractor={(item, index) => index.toString()}
              contentContainerStyle={styles.agencyTypes}
              style={{ width: "100%" }}
              numColumns={20}
              columnWrapperStyle={styles.agencyTypesColumn}
              renderItem={({ item, index }) =>
                item.active ? (
                  <TouchableOpacity
                    onPress={() => this.props.action(item)}
                    style={[
                      styles.agencyType,
                      {
                        marginLeft: index == 0 || index % 4 == 0 ? 0 : scale(10)
                      }
                    ]}
                  >
                    <View style={styles.agencyTypeBackground}>
                      <View style={styles.agencyIcoContainer}>
                        <CachedImage
                          style={styles.agencyIco}
                          uri={url + item.icon}
                        />
                      </View>

                      <Text style={styles.agencyTypeName} numberOfLines={1}>
                        {item.name}
                      </Text>
                    </View>
                  </TouchableOpacity>
                ) : (
                  <View
                    style={[
                      styles.agencyTypeDisabled,
                      {
                        marginLeft: index == 0 || index % 4 == 0 ? 0 : scale(10)
                      }
                    ]}
                  >
                    <View style={styles.agencyTypeBackgroundDisabled}>
                      <View style={styles.agencyIcoContainer}>
                        <CachedImage
                          style={styles.agencyIcoDisabled}
                          uri={url + item.icon}
                        />
                      </View>
                      <Text
                        style={styles.agencyTypeNameDisabled}
                        numberOfLines={1}
                      >
                        {item.name}
                      </Text>
                    </View>
                  </View>
                )
              }
            />

            <FlatList
              data={this.props.business_list ? this.props.business_list : []}
              keyExtractor={(item, index) => index.toString()}
              contentContainerStyle={[styles.agencyTypes, { marginTop: 40 }]}
              style={{ width: "100%" }}
              numColumns={20}
              columnWrapperStyle={styles.agencyTypesColumn}
              renderItem={({ item, index }) =>
                item.active ? (
                  <TouchableOpacity
                    onPress={() => this.props.action(item)}
                    style={[
                      styles.agencyType,
                      {
                        marginLeft: index == 0 || index % 4 == 0 ? 0 : scale(10)
                      }
                    ]}
                  >
                    <View style={styles.agencyTypeBackground}>
                      <View style={styles.agencyIcoContainer}>
                        <CachedImage
                          style={styles.agencyIco}
                          uri={url + item.icon}
                        />
                      </View>
                      <Text style={styles.agencyTypeName} numberOfLines={1}>
                        {item.name}
                      </Text>
                    </View>
                  </TouchableOpacity>
                ) : (
                  <View
                    style={[
                      styles.agencyTypeDisabled,
                      {
                        marginLeft: index == 0 || index % 4 == 0 ? 0 : scale(10)
                      }
                    ]}
                  >
                    <View style={styles.agencyTypeBackgroundDisabled}>
                      <View style={styles.agencyIcoContainer}>
                        <CachedImage
                          style={styles.agencyIcoDisabled}
                          uri={url + item.icon}
                        />
                      </View>
                      <Text
                        style={styles.agencyTypeNameDisabled}
                        numberOfLines={1}
                      >
                        {item.name}
                      </Text>
                    </View>
                  </View>
                )
              }
            />
          </View>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  title: {
    fontSize: scaleVertical(11),
    color: "rgba(37, 44, 50, 0.4)",
    marginTop: scaleVertical(8),
    textAlign: "center"
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
  },
  agencyType: {
    backgroundColor: "rgba(255, 255, 255, 0)",
    width: scale(70),
    height: scale(82),
    alignItems: "center",
    marginBottom: scale(16),
    borderRadius: scale(8),
    elevation: 2,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 1.0,
    shadowColor: "rgba(37, 44, 50, 0.1)"
  },
  agencyTypeBackground: {
    width: scale(70),
    height: scale(82),
    backgroundColor: "rgb(255,255, 255)",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: scale(8),
    borderRadius: scale(8),
    overflow: "hidden",
    paddingVertical: scaleVertical(10)
  },
  agencyTypeBackgroundDisabled: {
    width: scale(70),
    height: scale(82),
    backgroundColor: "rgba(37, 44, 50, 0.1)",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: scale(8),
    borderRadius: scale(8),
    overflow: "hidden",
    borderWidth: scale(1),
    borderColor: "rgba(255, 255, 255, 0.12)"
  },
  agencyIcoContainer: {
    width: scale(40),
    height: scale(50),
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden"
  },
  agencyIco: {
    width: scale(80),
    height: scale(60),
    marginRight: scale(40),
    resizeMode: "center"
  },
  agencyIcoDisabled: {
    width: scale(80),
    height: scale(60),
    marginLeft: scale(40),
    resizeMode: "contain"
  },
  agencyTypeName: {
    color: "rgb(37, 44, 50)",
    fontSize: Theme.fonts.sizes.p3,
    width: scale(60),
    textAlign: "center"
  },
  agencyTypeNameDisabled: {
    paddingHorizontal: scale(7),
    color: "rgba(37, 44, 50, 0.4)",
    fontSize: Theme.fonts.sizes.p3
  },
  agencyTypeDisabled: {
    width: scale(70),
    height: scale(82),
    alignItems: "center",
    marginBottom: scale(16)
  }
});
