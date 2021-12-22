import React from "react";
import {
  StyleSheet,
  View,
  ScrollView,
  Text,
  FlatList,
  TouchableOpacity,
  Image
} from "react-native";
import CachedImage from "../components/CachedImage";

import localeStore from "../locale/localeStore";
import { Theme } from "../configs/theme";
import { scale, scaleVertical } from "../configs";
import url from "../actions/baseURL";

const SelectAgency = props => (
  <View style={styles.container}>
    <ScrollView>
      <View style={styles.listBg}>
        <View style={styles.containerList}>
          <Text style={styles.listTitle}>
            Выберите {props.agency_type.name_singular}
          </Text>
          <Text style={styles.listText}>
            Всего {props.agency_type.name}: {props.count}
          </Text>
        </View>
        <View style={styles.containerList}>
          {props.list && props.list.length ? (
            <FlatList
              extraData={props.agency_type}
              data={props && props.list && props.list.length ? props.list : []}
              contentContainerStyle={styles.containerListInner}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({ item }) =>
                props.agency_type.short_name === "con" &&
                item.name.search(/специализированный/i) !== -1 ? (
                  <TouchableOpacity
                    style={styles.listItemSpec}
                    onPress={() => props.action(item)}
                  >
                    <View style={styles.listItemImage}>
                      {item.photo ? (
                        <CachedImage
                          style={styles.agencyImage}
                          uri={url + "/" + item.photo}
                        />
                      ) : (
                        <View style={styles.agencyDefaultImageContainer}>
                          <CachedImage
                            style={styles.agencyDefaultImage}
                            uri={url + props.agency_type.default_agency_photo}
                          />
                          <Text style={styles.textImage}>Нет фото</Text>
                        </View>
                      )}
                    </View>
                    <View style={styles.listItemInfo}>
                      <View style={styles.row}>
                        <Image
                          style={styles.icon}
                          source={require("../../assets/icons/car.png")}
                        />
                        <Text
                          style={styles.listItemText}
                          numberOfLines={1}
                          ellipsizeMode="tail"
                        >
                          {item.name}
                        </Text>
                      </View>
                      <Text
                        style={styles.listItemSubText}
                        numberOfLines={1}
                        ellipsizeMode="tail"
                      >
                        {item.address}
                      </Text>
                      <View style={styles.row}>
                        <Image
                          style={styles.ratingIcon}
                          source={require("../../assets/icons/rating.png")}
                        />
                        <Text>
                          {item.rating ? item.rating.toFixed(1) : 0.0}
                        </Text>
                      </View>
                    </View>
                  </TouchableOpacity>
                ) : (
                  <TouchableOpacity
                    style={styles.listItem}
                    onPress={() => props.action(item)}
                  >
                    <View style={styles.listItemImage}>
                      {item.photo ? (
                        <CachedImage
                          uri={url + "/" + item.photo}
                          style={styles.agencyImage}
                        />
                      ) : (
                        <View style={styles.agencyDefaultImageContainer}>
                          <CachedImage
                            style={styles.agencyDefaultImage}
                            uri={url + props.agency_type.default_agency_photo}
                          />
                          <Text style={styles.textImage}>Нет фото</Text>
                        </View>
                      )}
                    </View>
                    <View style={styles.listItemInfo}>
                      <Text
                        style={styles.listItemText}
                        numberOfLines={1}
                        ellipsizeMode="tail"
                      >
                        {item.name}
                      </Text>
                      <Text
                        style={styles.listItemSubText}
                        numberOfLines={1}
                        ellipsizeMode="tail"
                      >
                        {item.address}
                      </Text>
                      <View style={styles.row}>
                        <Image
                          style={styles.ratingIcon}
                          source={require("../../assets/icons/rating.png")}
                        />
                        <Text>
                          {item.rating ? item.rating.toFixed(1) : 0.0}
                        </Text>
                      </View>
                    </View>
                  </TouchableOpacity>
                )
              }
            />
          ) : (
            <Text style={styles.emptyAgencies}>
              Учреждения проходят модерацию
            </Text>
          )}
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
    width: scale(343),
    borderRadius: scale(4)
  },
  containerListInner: {
    width: "100%",
    marginTop: scale(16),
    padding: scale(2)
  },
  listTitle: {
    color: "rgb(37, 44, 50)",
    fontSize: Theme.fonts.sizes.h1,
    marginBottom: scale(16),
    marginTop: scale(24),
    fontFamily: "PTRootUIMedium"
  },
  listText: {
    color: "rgba(37, 44, 50, 0.6)",
    fontFamily: "PTRootUIRegular",
    fontSize: scale(15)
  },
  listItem: {
    width: "100%",
    height: scale(104),
    backgroundColor: "rgb(255, 255, 255)",
    borderRadius: scale(8),
    marginBottom: scale(8),
    marginTop: scale(8),
    display: "flex",
    flexDirection: "row",
    elevation: 2,
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 1.0,
    shadowColor: "rgba(37, 44, 50, 0.1)"
  },
  listItemSpec: {
    borderWidth: 1,
    borderColor: Theme.colors.yellow,
    width: "100%",
    height: scale(104),
    backgroundColor: "rgb(255, 255, 255)",
    borderRadius: scale(8),
    marginBottom: scale(8),
    marginTop: scale(8),
    display: "flex",
    flexDirection: "row"
  },
  listItemInfo: {
    padding: scale(12),
    overflow: "hidden"
  },
  listItemImage: {
    width: scale(83),
    overflow: "hidden",
    backgroundColor: Theme.colors.gray10,
    borderTopLeftRadius: scale(8),
    borderBottomLeftRadius: scale(8),
    display: "flex",
    flexDirection: "column",
    alignContent: "center",
    justifyContent: "center",
    alignItems: "center"
  },
  listItemText: {
    color: "rgb(37, 44, 50)",
    fontSize: Theme.fonts.sizes.p6,
    lineHeight: scale(22),
    fontFamily: "PTRootUIMedium"
  },
  listItemSubText: {
    fontFamily: "PTRootUIRegular",
    color: "rgba(37, 44, 50, 0.6)",
    fontSize: scale(14),
    lineHeight: scale(21),
    marginTop: scale(8),
    marginBottom: scale(10)
  },
  specialText: {
    fontFamily: "RobotoMedium",
    color: Theme.colors.yellow,
    fontSize: scale(16),
    // lineHeight: scale(43),
    lineHeight: scale(21)
  },
  specialAgency: {
    height: scale(43),
    width: "100%",
    alignContent: "center",
    alignItems: "center"
  },
  icon: {
    width: scale(20),
    height: scale(14),
    marginRight: scale(8)
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    alignContent: "center"
  },
  agencyImage: {
    width: scale(83),
    height: scale(104)
    // marginTop: scale(16)
  },
  agencyDefaultImageContainer: {
    display: "flex",
    justifyContent: "center",
    alignContent: "center",
    alignItems: "center"
  },
  agencyDefaultImage: {
    width: scale(32),
    height: scale(32),
    marginBottom: scaleVertical(8)
  },
  textImage: {
    textAlign: "center",
    color: Theme.colors.gray40,
    fontSize: scale(11),
    lineHeight: scale(20)
  },
  emptyAgencies: {
    color: "rgba(255, 255, 255, 0.37)",
    width: "100%"
  },
  ratingIcon: {
    width: scale(15),
    height: scale(15),
    marginRight: scale(4)
  }
});

export default SelectAgency;
