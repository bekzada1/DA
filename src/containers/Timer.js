import React from "react";
import {
  StyleSheet,
  View,
  ScrollView,
  Text,
  Easing,
  Linking,
  Platform
} from "react-native";
import { AnimatedCircularProgress } from "react-native-circular-progress";

import { Theme } from "../configs/theme";
import { scale } from "../configs";

// components
import YellowButton from "../components/YellowButton";
import WhiteButton from "../components/WhiteButton";

import AssessCall from "../components/AssessCall";
import FeedbackBad from "../components/FeedbackBad";
import FeedbackGood from "../components/FeedbackGood";

import { isLoggedIn } from "../actions/authActions";

export default class Timer extends React.Component {
  state = {
    seconds: 300,
    fill: null,
    color: "rgb(255, 193, 7)",
    ms: 300000,
    // ms: 3000,
    step: "timer"
  };
  componentDidMount() {
    let date = Date.now();
    // добавляем 5 минут к настоящему времени
    let endtime = new Date(date + this.state.ms);
    //запускаем таймер на 5 минут
    this.circularProgress.animate(100, this.state.ms, Easing.quad);

    if (Math.floor((endtime.getTime() - Date.now()) / 1000) >= 0) {
      this.timer(endtime);
    }
  }
  componentWillUnmount() {
    clearInterval(this.timerInterval);
  }
  timer = endtime => {
    this.timerInterval = setInterval(async () => {
      if (Math.floor((endtime.getTime() - Date.now()) / 1000) >= 0) {
        await this.setState({
          fill: Math.floor((endtime.getTime() - Date.now()) / 1000)
        });
      } else {
        clearInterval(this.timerInterval);
        this.handleChange("color", "rgb(198, 40, 40)");
        this.props.updateReview("timer_step", 2);
      }
    }, 1000);
  };
  handleChange(name, value) {
    this.setState({
      [name]: value
    });
  }
  updateStep = async step => {
    // if (answer) {
    //   if (step == 3) {
    //     this.props.updateReview("timer_called", answer);
    //     this.props.updateReview("timer_step", step);
    //   } else {
    //     await this.props.updateReview("timer_solved", answer);
    //     this.props.updateReviewStatus();
    //     this.props.navigation.navigate("ExcelentFeedbackScreen");
    //   }
    // } else
    this.props.updateReview("timer_step", step);
  };
  call = () => {
    if (this.props.agency && this.props.agency.accountable_phone)
      Linking.openURL(`tel:${this.props.agency.accountable_phone}`);
  };
  rateApp = () => {
    if (Platform.OS === "android") {
      Linking.openURL(
        "https://play.google.com/store/apps/details?id=com.automato.digitalagentapp"
      );
    } else {
      Linking.openURL(
        "https://apps.apple.com/kz/app/digital-agent/id1441630994"
      );
    }
  };
  navigate = async screen => {
    await this.updateStep(0);
    await this.props.navigation.navigate(screen);
  };
  onSkip = async () => {
    if (isLoggedIn()) this.props.navigation.navigate("HomeViewScreen");
    else this.props.navigation.navigate("CabinetScreen");
  };

  render() {
    console.log(this.props.timer_step, 84);
    return (
      <View style={styles.container}>
        <ScrollView>
          <View style={styles.timerContainer}>
            <View style={styles.timerProgressBar}>
              <AnimatedCircularProgress
                ref={ref => (this.circularProgress = ref)}
                size={scale(250)}
                rotation={0}
                width={scale(14)}
                fill={100 - this.state.fill / 3}
                tintColor={this.state.fill ? Theme.colors.yellow : "red"}
                backgroundColor="rgba(37, 44, 50, 0.1)"
              >
                {fill => {
                  if (this.state.fill > 0 || this.state.fill === 0) {
                    return (
                      <Text style={styles.timerCenterText}>
                        0{Math.floor(this.state.fill / 60)}:
                        {!(
                          this.state.fill -
                          Math.floor(this.state.fill / 60) * 60
                        )
                          ? "00"
                          : this.state.fill -
                              Math.floor(this.state.fill / 60) * 60 <
                            10
                          ? "0" +
                            (this.state.fill -
                              Math.floor(this.state.fill / 60) * 60)
                          : this.state.fill -
                            Math.floor(this.state.fill / 60) * 60}
                      </Text>
                    );
                  } else
                    return <Text style={styles.timerCenterText}>5:00</Text>;
                }}
              </AnimatedCircularProgress>
            </View>
            {this.props.timer_step === 1 ? (
              <View>
                <Text style={styles.timerTitleText}>
                  Ваша жалоба отправлена!
                </Text>
                <Text style={styles.timerSubText}>
                  Пожалуйста, дождитесь звонка от представителя организации.
                  Жалоба направлена в ситуационный центр.{" "}
                </Text>
              </View>
            ) : null}
            {this.props.timer_step === 2 ? (
              <View>
                <Text style={styles.timerTitleText}>Вам позвонили?</Text>
                <View style={styles.buttonRow}>
                  <YellowButton
                    action={() => this.updateStep(3)}
                    width={scale(147)}
                    text="Да"
                  />
                  <WhiteButton
                    action={() => this.props.sendReviewToAdmin()}
                    width={scale(147)}
                    text="Нет"
                  />
                </View>
              </View>
            ) : null}
            {this.props.timer_step === 3 ? (
              <AssessCall
                isVisible={this.props.timer_step === 3}
                navigate={screen => this.navigate(screen)}
                failedAction={() => this.updateStep(4)}
                successAction={() => this.updateStep(5)}
              />
            ) : null}

            {this.props.timer_step === 4 ? (
              <FeedbackBad
                isVisible={this.props.timer_step === 4}
                goBack={() => this.updateStep(3)}
                onSkip={() => this.onSkip()}
              />
            ) : null}

            {this.props.timer_step === 5 ? (
              <FeedbackGood
                rateApp={this.rateApp}
                isVisible={this.props.timer_step === 5}
                goBack={() => this.updateStep(3)}
                onSkip={() => this.onSkip()}
              />
            ) : null}
          </View>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    paddingHorizontal: scale(16)
  },
  timerContainer: {
    alignContent: "center"
  },
  timerTitleText: {
    color: "rgb(37, 44, 50)",
    fontSize: Theme.fonts.sizes.h1,
    fontFamily: "PTRootUIMedium",
    marginVertical: scale(16),
    textAlign: "center"
  },
  timerSubText: {
    color: "rgba(37, 44, 50, 0.6)",
    lineHeight: scale(21),
    fontSize: Theme.fonts.sizes.p4,
    textAlign: "center"
  },
  timerCenterText: {
    color: Theme.colors.yellow,
    fontSize: scale(36)
  },
  timerProgressBar: {
    marginVertical: scale(60),
    alignItems: "center"
  },
  buttonRow: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    padding: scale(16)
  },
  buttonColumn: {
    width: "100%",
    padding: scale(16)
  }
});
