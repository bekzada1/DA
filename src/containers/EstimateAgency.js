import React from "react";
import {
  StyleSheet,
  View,
  ScrollView,
  Text,
  Image,
  TextInput,
  FlatList,
  TouchableOpacity
} from "react-native";
import StarRating from "react-native-star-rating";

import localeStore from "../locale/localeStore";
import { Theme } from "../configs/theme";
import { scale, scaleVertical } from "../configs/index";
import url from "../actions/baseURL";

import YellowButton from "../components/YellowButton";
import Checkbox from "../components/CheckBox";
import CachedImage from "../components/CachedImage";

export default class EstimateAgency extends React.Component {
  state = {
    excellent: {
      text: "Что понравилось?"
    },
    good: {
      text: "Что именно не понравилось?"
    },
    bad: {
      text: "Что именно разочаровало?"
    },
    category: 0,
    status: null,
    complaints: [],
    camera: false,
    photo: null,
    hasCameraPermission: null,
    type: null
  };
  handleStar = star => {
    this.props.update("rating", star);
    if (star == 5) {
      this.props.update("call", false);
      this.props.update("status", "excellent");
    } else if (star == 4) {
      this.props.update("call", false);
      this.props.update("status", "good");
    } else {
      this.props.update("status", "bad");
      this.props.update("call", true);
    }
  };
  handleChange = (name, value) => {
    this.setState({
      [name]: value
    });
  };
  handleComplaints = async value => {
    let complaints = [];
    if (
      this.props.agency_type.short_name === "con" ||
      this.props.agency_type.short_name === "kgd" ||
      this.props.agency_type.short_name === "mtszn"
    ) {
      if (this.props.review.complaints.indexOf(value) == -1)
        complaints = [...this.props.review.complaints, value];
      else
        complaints = await this.props.review.complaints.filter(c => c != value);
      this.props.update("complaints", complaints);
    } else if (
      this.props.review.complaints.length &&
      this.props.agency_type.short_name !== "con" &&
      this.props.agency_type.short_name !== "kgd" &&
      this.props.agency_type.short_name !== "mtszn"
    ) {
      complaints = this.props.review.complaints;
      (await complaints[this.props.review.category].complaints.indexOf(
        value
      )) === -1
        ? await complaints[this.props.review.category].complaints.push(value)
        : await complaints[this.props.review.category].complaints.splice(
            complaints[this.props.review.category].complaints.indexOf(value),
            1
          );

      this.props.update("complaints", complaints);
    } else {
      let complaints = [];
      await this.props.agency_type.categories.map(async (category, c) => {
        await complaints.push({ name: category.name, complaints: [] });
      });
      complaints[this.props.review.category].complaints = [value];
      this.props.update("complaints", complaints);
    }
  };

  render() {
    const review = this.props.review;

    return (
      <View style={styles.container}>
        {this.state.camera ? null : (
          <ScrollView>
            <View style={styles.estimateBg}>
              <View style={styles.containerEstimate}>
                <Text style={styles.containerTitle}>
                  Оцените {this.props.agency_type.name_singular}
                  {this.state.photo ? this.state.photo.uri : null}
                </Text>
                <Text style={styles.agencyName}>{this.props.agency.name}</Text>
                {this.props.agency.photo ? (
                  <CachedImage
                    uri={url + "/" + this.props.agency.photo}
                    style={styles.itemImage}
                  />
                ) : (
                  <View style={styles.defaultImageContainer}>
                    <CachedImage
                      style={styles.defaultImageIcon}
                      uri={url + this.props.agency_type.default_agency_photo}
                    />
                    <Text style={styles.defaultImageText}>Нет фотографии</Text>
                  </View>
                )}
                <Text style={styles.agencyInfoText}>
                  {this.props.agency.address}
                </Text>
                <StarRating
                  maxStars={5}
                  rating={review.rating}
                  starSize={35}
                  containerStyle={styles.starContainer}
                  fullStarColor={Theme.colors.yellow}
                  emptyStarColor={Theme.colors.yellow}
                  selectedStar={star => this.handleStar(star)}
                />
                <View style={styles.agencyComment}>
                  {review.rating ? (
                    <View>
                      <Text style={styles.categoryTitle}>
                        {this.props.review.status
                          ? this.state[this.props.review.status].text
                          : null}
                      </Text>

                      <View style={styles.categoryContainer}>
                        <FlatList
                          extraData={this.props.review.category}
                          horizontal={true}
                          data={this.props.agency_type.categories}
                          keyExtractor={(item, index) => index.toString()}
                          renderItem={({ item, index }) => (
                            <TouchableOpacity
                              style={[
                                this.props.review.category == index
                                  ? [styles.categoryItem, styles.categoryActive]
                                  : styles.categoryItem,
                                {
                                  marginLeft: index == 0 ? scale(1) : scale(15)
                                }
                              ]}
                              onPress={() =>
                                this.props.update("category", index)
                              }
                            >
                              <View style={styles.categoryIcon}>
                                {item.icon ? (
                                  <CachedImage
                                    style={
                                      this.props.review.category == index
                                        ? styles.categoryIconImage
                                        : styles.categoryDisabledIcon
                                    }
                                    uri={url + item.icon}
                                  />
                                ) : (
                                  <CachedImage
                                    style={
                                      this.props.review.category == index
                                        ? styles.categoryIconImage
                                        : styles.categoryDisabledIcon
                                    }
                                    uri={
                                      url +
                                      "/images/categories/defaultsprite.png"
                                    }
                                  />
                                )}
                              </View>
                              <Text style={styles.categoryItemText}>
                                {item.name}
                              </Text>
                            </TouchableOpacity>
                          )}
                        />
                      </View>
                      {review.rating < 5 ? (
                        <View style={styles.subCategoriesContainer}>
                          <FlatList
                            data={
                              this.props.agency_type.categories[
                                this.props.review.category
                              ].subcategories
                            }
                            extraData={this.props}
                            keyExtractor={(item, index) => index.toString()}
                            renderItem={({ item }) => (
                              <TouchableOpacity
                                style={styles.categoryListItem}
                                onPress={() => this.handleComplaints(item)}
                              >
                                <Text style={styles.categoryListText}>
                                  {item}
                                </Text>
                                <Checkbox
                                  checked={
                                    this.props.review.complaints.length &&
                                    ((this.props.agency_type.short_name !==
                                      "con" &&
                                      this.props.agency_type.short_name !==
                                        "kgd" &&
                                      this.props.agency_type.short_name !==
                                        "mtszn" &&
                                      this.props.review.complaints[
                                        this.props.review.category
                                      ].complaints.indexOf(item) !== -1) ||
                                      this.props.review.complaints.indexOf(
                                        item
                                      ) !== -1)
                                  }
                                />
                              </TouchableOpacity>
                            )}
                          />
                        </View>
                      ) : null}
                    </View>
                  ) : null}
                  <View style={styles.commentInner}>
                    <TextInput
                      style={styles.commentInput}
                      placeholder="Оставьте комментарий…"
                      multiline={true}
                      numberOfLines={2}
                      maxLength={180}
                      onChangeText={text => this.props.update("comment", text)}
                      value={review.comment}
                    />
                    <Text style={styles.count}>
                      {review.comment ? review.comment.length : 0}/180
                    </Text>
                  </View>
                  {this.state.photo ? (
                    <Image
                      source={{ uri: this.state.photo }}
                      style={{
                        width: 40,
                        height: 40,
                        marginBottom: 20
                      }}
                      resizeMode="contain"
                    />
                  ) : null}

                  <TouchableOpacity
                    style={styles.flexDirectionRow}
                    onPress={() => this.props.openServicePanel()}
                  >
                    <Image
                      style={styles.estimateLittleIcon}
                      source={require("../../assets/icons/review/service.png")}
                    />
                    <Text
                      style={[styles.yellowText16, { maxWidth: scale(240) }]}
                      numberOfLines={1}
                    >
                      {review.service && review.service.code
                        ? review.service.name_ru
                        : "Выберите вид услуги"}
                    </Text>
                  </TouchableOpacity>

                  {this.props.error && this.props.error.name === "" ? (
                    <Text style={styles.containerError}>
                      {this.props.error.text}
                    </Text>
                  ) : null}
                  {review.rating ? (
                    <YellowButton
                      width="100%"
                      text={localeStore.send_btn_txt}
                      action={() => this.props.sendReview()}
                      loader={this.props.loader}
                    />
                  ) : (
                    <View style={styles.disabledButton}>
                      <Text style={styles.disabledButtonText}>
                        {localeStore.send_btn_txt}
                      </Text>
                    </View>
                  )}
                </View>
              </View>
            </View>
          </ScrollView>
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    zIndex: 1,
    flex: 1,
    width: "100%",
    fontFamily: "PTRootUIRegular"
  },
  estimateBg: {
    alignContent: "center",
    alignItems: "center",
    width: "100%"
  },
  containerEstimate: {
    width: scale(343),
    alignItems: "center",
    alignContent: "center",
    textAlign: "center"
  },
  containerTitle: {
    fontSize: Theme.fonts.sizes.h1,
    color: "rgb(37, 44, 50)",
    marginTop: scale(24),
    fontFamily: "PTRootUIMedium"
  },
  agencyName: {
    fontSize: Theme.fonts.sizes.p5,
    color: "rgba(37, 44, 50, 0.6)",
    textAlign: "center",
    marginVertical: scale(16)
  },
  agencyInfoText: {
    fontSize: Theme.fonts.sizes.p2,
    color: "rgba(37, 44, 50, 0.4)",
    textAlign: "center",
    marginTop: scaleVertical(16)
  },
  starContainer: {
    marginVertical: scale(20),
    width: "60%",
    marginHorizontal: "20%"
  },
  subCategoriesContainer: {
    width: "100%",
    elevation: 4,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 1.0,
    shadowColor: "rgba(37, 44, 50, 0.1)",
    backgroundColor: "rgb(255, 255, 255)",
    padding: scale(16),
    marginBottom: scale(15),
    borderRadius: scale(8)
  },
  agencyComment: {
    backgroundColor: "rgb(255, 255, 255)",
    minHeight: scale(320),
    width: "100%",
    padding: scale(16)
  },
  commentTitle: {
    color: "rgba(37, 44, 50, 0.2)",
    marginBottom: scale(10)
  },
  commentInner: {
    elevation: 2,
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 1.0,
    shadowColor: "rgba(37, 44, 50, 0.1)",
    backgroundColor: "rgb(255, 255, 255)",
    marginBottom: scale(24),
    borderRadius: scale(4),
    minHeight: scaleVertical(45),
    padding: scale(8)
  },
  categoryContainer: {
    width: "100%",
    display: "flex",
    flexDirection: "row"
  },
  categoryItem: {
    backgroundColor: "rgb(255, 255, 255)",
    width: scale(70),
    height: scale(82),
    alignItems: "center",
    marginBottom: scale(24),
    marginTop: scale(24),
    marginRight: scale(1),
    borderRadius: scale(8),
    shadowRadius: 3.84,
    elevation: 2,
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 1.0,
    shadowColor: "rgba(37, 44, 50, 0.1)"
  },
  categoryIcon: {
    width: scale(60),
    height: scale(60),
    backgroundColor: "rgb(255, 255, 255)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    alignContent: "center",
    borderRadius: scale(4),
    overflow: "hidden"
  },
  categoryIconImage: {
    width: scale(100),
    height: scale(50),
    marginLeft: scale(50),
    resizeMode: "contain"
  },
  categoryDisabledIcon: {
    width: scale(100),
    height: scale(50),
    marginRight: scale(50),
    resizeMode: "contain"
  },
  categoryItemText: {
    color: "rgb(37, 44, 50)",
    fontSize: scale(10),
    lineHeight: scale(13),
    textAlign: "center"
  },
  categoryActive: {
    borderColor: "rgb(255, 186, 0)",
    borderWidth: 1
  },
  categoryTitle: {
    fontFamily: "PTRootUIMedium",
    color: "rgb(37, 44, 50)",
    fontSize: scale(18),
    textAlign: "center"
  },
  categoryListItem: {
    marginBottom: scaleVertical(24),
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },
  categoryListText: {
    color: "rgb(37, 44, 50)",
    fontSize: scale(17),
    maxWidth: "85%"
  },
  yellowText16: {
    color: Theme.colors.yellow,
    fontFamily: "PTRootUIBold",
    fontSize: Theme.fonts.sizes.p6,
    lineHeight: scaleVertical(21),
    marginBottom: scaleVertical(24),
    marginLeft: scale(16)
  },
  flexDirectionRow: {
    display: "flex",
    flexDirection: "row"
  },
  estimateLittleIcon: {
    width: scale(20),
    height: scale(20)
  },
  itemImage: {
    width: scale(343),
    height: scale(100),
    marginBottom: scaleVertical(16)
  },
  containerError: {
    flexDirection: "row",
    fontFamily: "RobotoRegular",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    width: scale(311),
    color: "rgb(198,40,40)",
    fontSize: Theme.fonts.sizes.p4,
    marginBottom: scaleVertical(14)
  },
  count: {
    color: "rgba(37, 44, 50, 0.4)",
    fontSize: scale(11),
    textAlign: "right"
  },
  defaultImageContainer: {
    width: "100%",
    height: scale(104),
    backgroundColor: "rgba(37, 44, 50, 0.1)",
    display: "flex",
    justifyContent: "center",
    alignContent: "center",
    alignItems: "center",
    borderRadius: scale(8)
  },
  defaultImageIcon: {
    width: scale(40),
    height: scale(40)
  },
  defaultImageText: {
    fontFamily: "PTRootUIMedium",
    color: "rgba(37, 44, 50, 0.4)",
    marginTop: scale(4),
    fontSize: scale(11)
  },
  disabledButton: {
    height: scale(52),
    width: "100%",
    display: "flex",
    justifyContent: "center",
    alignContent: "center",
    alignItems: "center",
    borderRadius: scale(8),
    backgroundColor: Theme.colors.gray10
  },
  disabledButtonText: {
    fontSize: Theme.fonts.sizes.p6,
    color: Theme.colors.gray40,
    fontFamily: "PTRootUIBold",
    borderRadius: 0
  },
  commentInput: {
    fontFamily: "PTRootUIRegular",
    fontSize: Theme.fonts.sizes.h4,
    textAlign: "left",
    textAlignVertical: "top"
  }
});
