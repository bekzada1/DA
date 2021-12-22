import React from "react";
import {
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from "react-native";
import { Theme } from "../configs/theme";
import { scale, scaleVertical } from "../configs/index";

class CustomTextInput extends React.Component {
  state = {
    secureTextEntry: true
  };
  handleChange = (name, value) => {
    this.setState({
      [name]: value
    });
  };
  render() {
    return (
      <View>
        <View
          style={[
            styles.containerInput,
            this.props.style ? this.props.style : {}
          ]}
        >
          <TextInput
            secureTextEntry={
              this.props.secureTextEntry && this.state.secureTextEntry
                ? this.props.secureTextEntry
                : false
            }
            style={styles.input}
            placeholder={this.props.placeholder}
            placeholderTextColor={Theme.colors.gray20}
            onChangeText={value => this.props.handleChange(value)}
            value={this.props.value}
            maxLength={this.props.maxLength ? this.props.maxLength : 500}
          />

          {this.props.err &&
          this.props.err.name === this.props.name &&
          !this.props.loader ? (
            <TouchableOpacity onPress={() => this.props.handleChange("")}>
              <Image
                style={styles.errIcon}
                source={require("../../assets/icons/login/delete.png")}
              />
            </TouchableOpacity>
          ) : null}
          {this.props.secureTextEntry && !this.props.loader ? (
            this.state.secureTextEntry ? (
              <TouchableOpacity
                onPress={() =>
                  this.handleChange(
                    "secureTextEntry",
                    !this.state.secureTextEntry
                  )
                }
              >
                <Image
                  style={styles.eyeIcon}
                  source={require("../../assets/icons/eye.png")}
                />
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                onPress={() =>
                  this.handleChange(
                    "secureTextEntry",
                    !this.state.secureTextEntry
                  )
                }
              >
                <Image
                  style={styles.eyeIcon}
                  source={require("../../assets/icons/eyeclosed.png")}
                />
              </TouchableOpacity>
            )
          ) : null}
        </View>
        {this.props.label ? (
          <Text style={styles.text}>{this.props.label}</Text>
        ) : null}
        {this.props.error && this.props.error.text ? (
          <Text style={styles.errorText}>{this.props.error.text}</Text>
        ) : null}
        {this.props.success && this.props.success.text ? (
          <Text style={styles.successText}>{this.props.success.text}</Text>
        ) : null}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  containerInput: {
    shadowOffset: {
      width: 2,
      height: 2
    },
    shadowRadius: 4,
    shadowOpacity: 1.0,
    elevation: 4,
    shadowColor: Theme.colors.gray10,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    height: scale(52),
    width: "100%",
    backgroundColor: "rgb(255, 255, 255)",
    // marginTop: scaleVertical(16),
    borderRadius: scale(8),
    paddingHorizontal: scale(15)
  },
  input: {
    flex: 1,
    color: Theme.colors.grayDark,
    fontFamily: "PTRootUIRegular",
    fontSize: Theme.fonts.sizes.h4,
    letterSpacing: scale(0.5)
  },
  errIcon: {
    width: scale(12),
    height: scale(13),
    marginRight: scale(12)
  },
  containerError: {
    flexDirection: "row",
    fontFamily: "PTRootUIMedium",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    width: scale(311),
    textAlign: "center",
    color: Theme.colors.red,
    fontSize: Theme.fonts.sizes.p3,
    backgroundColor: "rgb(255, 255, 255)",
    marginTop: scaleVertical(8)
  },
  successText: {
    color: Theme.colors.green,
    marginTop: scale(8),
    textAlign: "center",
    fontFamily: "PTRootUIMedium",
    fontSize: scale(13),
    lineHeight: scale(18)
  },
  errorText: {
    color: Theme.colors.red,
    marginTop: scale(8),
    textAlign: "center",
    fontFamily: "PTRootUIMedium",
    fontSize: scale(13),
    lineHeight: scale(18)
  },
  text: {
    color: Theme.colors.gray40,
    marginTop: scale(8),
    textAlign: "center",
    fontFamily: "PTRootUIMedium",
    fontSize: scale(13),
    lineHeight: scale(18)
  },
  eyeIcon: {
    width: scale(20),
    height: scale(20)
  }
});

export default CustomTextInput;
