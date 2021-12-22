import React from "react";

import { StylePanel } from "../configs/styles";
import { Theme } from "../configs/theme";
import { scale, scaleVertical } from "../configs/index";

import { StyleSheet, View, Image, Text, TouchableOpacity } from "react-native";
import YellowButton from "../components/YellowButton";
import BlackButton from "../components/BlackButton";
import AppIntroSlider from "react-native-app-intro-slider";

export default class IntroductionScreen extends React.Component {
  state = {
    index: 0
  };
  getPageIndex = index => {
    this.setState({
      index: index
    });
  };
  _renderItem = ({ item }) => {
    return (
      <View style={styles.container}>
        <TouchableOpacity
          onPress={() => this.props.navigation.navigate("PermissionGeoScreen")}
        >
          <Text style={styles.skipText}>Пропустить</Text>
        </TouchableOpacity>
        <Image source={item.image} style={styles.imageIntro} />
        <Text style={styles.introductionTitle}>{item.title}</Text>
        <Text style={styles.introductionDescription}>{item.text}</Text>
      </View>
    );
  };
  _renderNextButton = () => {
    return (
      <View style={{}}>
        <YellowButton text={"Далее"} width={scale(112)} />
      </View>
    );
  };
  _renderPrevButton = props => {
    return (
      <BlackButton
        {...props}
        text={"Назад"}
        width={scale(112)}
        // action={()=> this.getPageIndex(this.state.index - 1)}
      />
    );
  };
  render() {
    return (
      <AppIntroSlider
        slides={[
          {
            key: "1",
            backgroundColor: "#fff",
            image: require("../../assets/icons/onboarding/agency.png"),
            title: <Text style={styles.introductionTitle}>Услугодатель</Text>,
            text: (
              <Text style={styles.introductionDescription}>
                Выберите нужного Вам услугодателя.
              </Text>
            )
          },
          {
            key: "2",
            backgroundColor: "#fff",
            image: require("../../assets/icons/onboarding/review.png"),
            title: <Text style={styles.introductionTitle}>Оценка</Text>,
            text: (
              <Text style={styles.introductionDescription}>
                Оцените услугодателя по 5 критериям.
              </Text>
            )
          },
          {
            key: "3",
            backgroundColor: "#fff",
            image: require("../../assets/icons/onboarding/feedback.png"),
            title: <Text style={styles.introductionTitle}>Обратная связь</Text>,
            text: (
              <Text style={styles.introductionDescription}>
                Укажите Ваши контактные данные и с Вами обязательно свяжутся.
              </Text>
            )
          }
        ]}
        showPrevButton={true}
        renderItem={this._renderItem}
        // renderNextButton={this._renderNextButton}
        // renderDoneButton={this._renderNextButton}
        // renderPrevButton={this._renderPrevButton}
        buttonStyle={{
          backgroundColor: Theme.colors.yellow,
          height: scale(52),
          flexDirection: "row",
          justifyContent: "center",
          paddingHorizontal: scale(5),
          borderRadius: scale(8),
          width: scale(112)
        }}
        buttonTextStyle={{
          fontSize: Theme.fonts.sizes.p6,
          color: "#fff",
          fontFamily: "PTRootUIBold"
        }}
        nextLabel={"Далее"}
        prevLabel={"Назад"}
        doneLabel={"Далее"}
        dotStyle={{
          backgroundColor: Theme.colors.gray10,
          width: scale(8),
          height: scale(8)
        }}
        activeDotStyle={{
          backgroundColor: Theme.colors.yellow,
          width: scale(8),
          height: scale(8)
        }}
        goToSlide={index => this.getPageIndex(index)}
        onSlideChange={index => this.getPageIndex(index)}
        onDone={() => this.props.navigation.navigate("PermissionGeoScreen")}
      />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // alignItems: "center",
    // alignContent: "center",
    width: "100%",
    marginTop: scale(60)
  },
  containerInner: {
    paddingHorizontal: scale(24)
  },
  skipText: {
    color: Theme.colors.yellow,
    fontFamily: "PTRootUIBold",
    textAlign: "right",
    fontSize: Theme.fonts.p6,
    marginRight: scale(16)
  },
  imageIntro: {
    width: "100%",
    height: scale(266),
    resizeMode: "contain",
    marginTop: scaleVertical(40),
    marginBottom: scaleVertical(80)
  },
  introductionTitle: {
    textAlign: "center",
    color: "rgb(37, 44, 50)",
    fontSize: Theme.fonts.sizes.h1,
    fontFamily: "PTRootUIMedium"
  },
  introductionDescription: {
    color: "rgba(37, 44, 50, 0.6)",
    fontSize: Theme.fonts.sizes.pt6,
    fontFamily: "RobotoRegular",
    textAlign: "center",
    marginTop: Theme.verticals.sizes.pt16,
    marginBottom: Theme.verticals.sizes.pt87
  },
  blackButton: {
    height: scale(52),
    backgroundColor: "rgb(37, 44, 50)",
    flexDirection: "row",
    justifyContent: "center",
    paddingHorizontal: scale(5),
    borderRadius: scale(8),
    width: scale(112)
  },
  blackButtonText: {
    fontSize: Theme.fonts.sizes.p6,
    color: "#fff",
    fontFamily: "PTRootUIBold",
    borderRadius: 0
  }
});
