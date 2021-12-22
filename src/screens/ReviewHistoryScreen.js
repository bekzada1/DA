import React from "react";
import moment from "moment";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {
  StyleSheet,
  View,
  ScrollView,
  Text,
  FlatList,
  Image
} from "react-native";

import { Theme } from "../configs/theme";
import { StylePanel } from "../configs/styles";
import { scale, scaleVertical } from "../configs";
import url from "../actions/baseURL";

import { getReviewsHistory } from "../actions/reviewActions";

class ReviewHistoryScreen extends React.Component {
  componentDidMount() {
    this.props.getReviewsHistory();
  }
  render() {
    return (
      <View style={StylePanel.container}>
        <View style={StylePanel.containerInner}>
          <View style={styles.container}>
            <ScrollView>
              {this.props.review.user_reviews &&
              this.props.review.user_reviews.length ? (
                <FlatList
                  data={this.props.review.user_reviews}
                  contentContainerStyle={styles.containerListInner}
                  keyExtractor={(item, index) => index.toString()}
                  renderItem={({ item }) => (
                    <View>
                      <Text style={styles.listTitle}>
                        {item._id.day}.{item._id.month}.{item._id.year}{" "}
                      </Text>
                      {item.reviews && item.reviews.length ? (
                        <FlatList
                          data={item.reviews}
                          contentContainerStyle={styles.containerListInner}
                          keyExtractor={(review, r) => r.toString()}
                          renderItem={({ item: review }) => (
                            <View style={styles.listItem}>
                              <View style={styles.listItemImage}>
                                {review.agency && review.agency.photo ? (
                                  <Image
                                    style={styles.agencyImage}
                                    source={{
                                      uri: url + "/" + review.agency.photo
                                    }}
                                  />
                                ) : (
                                  <Image
                                    style={styles.agencyIcon}
                                    source={{
                                      uri:
                                        url +
                                        review.agencytype.default_agency_photo
                                    }}
                                  />
                                )}
                              </View>
                              <View style={styles.listItemInfo}>
                                <Text
                                  style={styles.listItemText}
                                  numberOfLines={1}
                                  ellipsizeMode="tail"
                                >
                                  {review && review.agency
                                    ? review.agency.name
                                    : null}
                                </Text>
                                <Text
                                  style={styles.listItemSubText}
                                  numberOfLines={1}
                                  ellipsizeMode="tail"
                                >
                                  {review && review.agency
                                    ? review.agency.address
                                    : null}
                                </Text>
                                <View style={styles.row}>
                                  <Text style={styles.listItemInfoText}>
                                    Ваша оценка:{" "}
                                  </Text>
                                  <Image
                                    style={styles.ratingIcon}
                                    source={require("../../assets/icons/rating.png")}
                                  />
                                  <Text>
                                    {review && review.rating
                                      ? review.rating
                                      : null}
                                  </Text>
                                </View>
                                <Text style={styles.listItemInfoText}>
                                  Дата и время:{" "}
                                  {moment(review.createdAt).format(
                                    "DD.MM.YYYY HH:mm"
                                  )}
                                </Text>
                                <View style={styles.row}>
                                  <Text style={styles.listItemInfoText}>
                                    Статус:{" "}
                                    {review.status && review.status === -1 ? (
                                      <Text
                                        style={{ color: Theme.colors.yellow }}
                                      >
                                        в ожидании
                                      </Text>
                                    ) : null}
                                    {review.status && review.status === 1 ? (
                                      <Text
                                        style={{ color: Theme.colors.green }}
                                      >
                                        решен
                                      </Text>
                                    ) : null}
                                    {!review.status ? (
                                      <Text style={{ color: Theme.colors.red }}>
                                        не решен
                                      </Text>
                                    ) : null}
                                  </Text>
                                </View>
                              </View>
                            </View>
                          )}
                        />
                      ) : null}
                    </View>
                  )}
                />
              ) : (
                <Text style={styles.emptyListText}>Оценки не найдены</Text>
              )}
            </ScrollView>
          </View>
        </View>
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
    width: scale(343),
    borderRadius: scale(4)
  },
  containerListInner: {
    width: "100%",
    padding: scale(2)
  },
  listTitle: {
    color: Theme.colors.grayDark,
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
    height: scale(156),
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
    width: scale(84),
    overflow: "hidden",
    borderTopLeftRadius: scale(8),
    borderBottomLeftRadius: scale(8),
    display: "flex",
    justifyContent: "center",
    alignContent: "center",
    alignItems: "center",
    backgroundColor: Theme.colors.gray10
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
  listItemInfoText: {
    lineHeight: scale(20),
    fontSize: scale(15),
    marginBottom: scale(6)
  },
  specialText: {
    fontFamily: "RobotoMedium",
    color: Theme.colors.yellow,
    fontSize: scale(16),
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
    height: scale(156)
  },
  emptyAgencies: {
    color: "rgba(255, 255, 255, 0.37)",
    width: "100%"
  },
  ratingIcon: {
    width: scale(15),
    height: scale(15),
    marginRight: scale(4)
  },
  agencyIcon: {
    width: scale(40),
    height: scale(40),
    marginBottom: scaleVertical(8)
  },
  emptyListText: {
    color: Theme.colors.gray60,
    fontSize: Theme.fonts.sizes.p4,
    marginTop: scaleVertical(16)
  }
});

const mapStateToProps = state => {
  const { review, loader } = state;
  return {
    review,
    loader: loader.status
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getReviewsHistory: bindActionCreators(getReviewsHistory, dispatch)
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ReviewHistoryScreen);
