import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import { StylePanel } from "../configs/styles";
import { scale, scaleVertical } from "../configs";
import { Theme } from "../configs/theme";

import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  Keyboard
} from "react-native";
import YellowButton from "../components/YellowButton";

import { updateSupport, sendMessageToSupport } from "../actions/userActions";

class SupportScreen extends React.Component {
  render() {
    return (
      <View style={StylePanel.container}>
        <TouchableWithoutFeedback
          style={{
            flex: 1,
            width: "100%"
          }}
          onPress={Keyboard.dismiss}
          accessible={false}
        >
          <View style={StylePanel.containerInner}>
            <View style={styles.container}>
              <Text style={styles.title}>Напишите нам</Text>
              <Text style={styles.description}>
                Если у Вас возникли проблемы,{"\n"} пожалуйста опишите её
              </Text>
              <TextInput
                placeholder="Оставьте комментарий…"
                style={styles.input}
                multiline={true}
                numberOfLines={4}
                maxLength={400}
                value={this.props.support.message}
                onChangeText={text => this.props.updateSupport("message", text)}
              />
              {this.props.error &&
              this.props.error.screen === "SupportScreen" ? (
                <Text style={styles.textError}>{this.props.error.text}</Text>
              ) : null}
              {this.props.support &&
              this.props.support.success.text &&
              this.props.support.success.text.length ? (
                <Text style={styles.textSuccess}>
                  {this.props.support.success.text}
                </Text>
              ) : null}
              <YellowButton
                width={"100%"}
                text={"Отправить"}
                action={() =>
                  this.props.sendMessageToSupport(this.props.support.message)
                }
              />
            </View>
          </View>
        </TouchableWithoutFeedback>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    alignContent: "center"
  },
  title: {
    marginTop: scale(24),
    fontSize: Theme.fonts.sizes.h4,
    color: Theme.colors.grayDark,
    fontFamily: "PTRootUIMedium",
    textAlign: "center"
  },
  description: {
    fontSize: scale(15),
    color: Theme.colors.gray60,
    textAlign: "center",
    marginTop: scaleVertical(10),
    fontFamily: "SFProTextRegular"
  },
  input: {
    elevation: 2,
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 1.0,
    shadowColor: "rgba(37, 44, 50, 0.1)",
    backgroundColor: "rgb(255, 255, 255)",
    marginBottom: scale(24),
    borderRadius: scale(4),
    minHeight: scaleVertical(140),
    paddingVertical: scale(12),
    paddingHorizontal: scale(16),
    width: "100%",
    marginTop: scaleVertical(16),
    marginBottom: scaleVertical(34),
    fontFamily: "PTRootUIRegular",
    fontSize: Theme.fonts.sizes.h4,
    textAlign: "left",
    textAlignVertical: "top"
  },
  textError: {
    color: Theme.colors.red,
    fontSize: Theme.fonts.sizes.p4,
    marginBottom: scale(8)
  },
  textSuccess: {
    color: Theme.colors.green,
    fontSize: Theme.fonts.sizes.p4,
    marginBottom: scale(8)
  }
});

const mapStateToProps = state => {
  const { loader, error, support } = state;
  return {
    error,
    support
  };
};

const mapDispatchToProps = dispatch => {
  return {
    updateSupport: bindActionCreators(updateSupport, dispatch),
    sendMessageToSupport: bindActionCreators(sendMessageToSupport, dispatch)
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SupportScreen);
