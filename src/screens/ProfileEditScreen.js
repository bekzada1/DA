import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Camera } from "expo-camera";
import * as Permissions from "expo-permissions";
import url from "../actions/baseURL";
import { KeyboardAvoidingView } from "react-native";

import { Theme } from "../configs/theme";
import { scale, scaleVertical } from "../configs";
import { StylePanel } from "../configs/styles";

import {
  ActivityIndicator,
  View,
  StyleSheet,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard
} from "react-native";
import CustomTextInput from "../components/CustomTextInput";
import { TextInputMask } from "react-native-masked-text";
import YellowButton from "../components/YellowButton";

import { updateAuth, updateProfile } from "../actions/authActions";

class ProfileEditScreen extends React.Component {
  state = {
    err: null,
    user: {
      name: this.props.auth.user_name,
      phone: this.props.auth.user_phone,
      email: this.props.auth.user_email,
      password: "",
      rePassword: "",
      photo: this.props.auth.user_photo ? this.props.auth.user_photo : "",
      camera: false
    },
    type: Camera.Constants.Type.back
  };
  componentWillReceiveProps(nextProps) {
    this.setState({
      list: nextProps.agencies
    });
  }
  handleChange = (name, value) => {
    let user = this.state.user;
    user[name] = value;
    this.setState({
      user: user
    });
  };
  updateProfile = () => {
    this.props.updateProfile(
      this.state.user.name,
      this.state.user.email,
      this.state.user.password.trim(),
      this.state.user.rePassword.trim(),
      this.state.user.phone,
      this.state.user.photo
    );
  };
  openCamera = async () => {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    if (status === "granted") {
      this.setState({ camera: true });
      console.log("granted");
    }
  };
  snap = async () => {
    if (this.camera) {
      const options = { quality: 1, base64: true };
      let photo = await this.camera.takePictureAsync(options);
      this.handleChange("photo", photo.base64);
      this.setState({
        camera: false
      });
    }
  };
  render() {
    if (this.state.camera) {
      return (
        <Camera
          style={{ flex: 1 }}
          type={this.state.type}
          ref={ref => {
            this.camera = ref;
          }}
        >
          <View
            style={{
              flex: 1,
              backgroundColor: "transparent",
              flexDirection: "row",
              justifyContent: "center"
            }}
          >
            {/* <TouchableOpacity
              style={{
                alignSelf: "flex-end",
                alignItems: "center"
              }}
              onPress={() => {
                this.setState({
                  type:
                    this.state.type === Camera.Constants.Type.back
                      ? Camera.Constants.Type.front
                      : Camera.Constants.Type.back
                });
              }}
            >
              <Image
                source={require("../../assets/icons/rotate.png")}
                style={{
                  width: 40,
                  height: 40,
                  marginBottom: 10
                  // color: "white"
                }}
              />
            </TouchableOpacity> */}
            <TouchableOpacity
              style={{
                alignSelf: "flex-end",
                alignItems: "center"
              }}
              onPress={() => {
                this.snap();
              }}
            >
              <Image
                source={require("../../assets/icons/camera.png")}
                style={{
                  width: 40,
                  height: 40,
                  marginBottom: 10
                  // color: "white"
                }}
              />
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                alignSelf: "flex-end",
                alignItems: "center"
              }}
            ></TouchableOpacity>
          </View>
        </Camera>
      );
    } else {
      return (
        <TouchableWithoutFeedback
          onPress={Keyboard.dismiss}
          accessible={false}
          style={{ flex: 1, width: "100%" }}
        >
          <View style={StylePanel.container}>
            <KeyboardAvoidingView
              style={{
                flex: 1,
                width: "100%"
              }}
              keyboardVerticalOffset={scaleVertical(70)}
              behavior="padding"
              enabled
            >
              <ScrollView style={styles.containerList}>
                <View style={styles.container}>
                  <View style={styles.avatarCircle}>
                    {this.state.user.photo && this.state.user.photo !== "" ? (
                      this.props.auth.user_photo &&
                      this.props.auth.user_photo !== "" ? (
                        <Image
                          source={{
                            uri: url + this.state.user.photo
                          }}
                          style={{
                            width: scale(84),
                            height: scale(84),
                            borderRadius: scale(42)
                          }}
                        />
                      ) : (
                        <Image
                          source={{
                            uri: `data:image/png;base64,${this.state.user.photo}`
                          }}
                          style={{
                            width: scale(84),
                            height: scale(84),
                            borderRadius: scale(42)
                          }}
                        />
                      )
                    ) : (
                      <Text style={styles.avatarInitials}>
                        {this.state.user.email && this.state.user.email.length
                          ? this.state.user.email[0].toUpperCase()
                          : null}
                      </Text>
                    )}
                  </View>
                  <TouchableOpacity
                    style={styles.row}
                    onPress={() => this.openCamera()}
                  >
                    <Image
                      style={styles.iconEdit}
                      source={require("../../assets/icons/profile/edit.png")}
                    />
                    <Text style={styles.yellowSmallText}>Изменить фото</Text>
                  </TouchableOpacity>
                  <CustomTextInput
                    style={styles.mt44}
                    placeholder={"Имя пользователя"}
                    underlineColorAndroid="transparent"
                    type={"custom"}
                    maxLength={50}
                    value={this.state.user.name}
                    handleChange={text => this.handleChange("name", text)}
                  />
                  <Text style={styles.inputDescription}>
                    Как нам к Вам обращаться?
                  </Text>
                  <CustomTextInput
                    placeholder={"Введите эл. почту"}
                    underlineColorAndroid="transparent"
                    type={"custom"}
                    maxLength={30}
                    value={this.state.user.email}
                    handleChange={text => this.handleChange("email", text)}
                  />
                  <CustomTextInput
                    style={styles.input}
                    placeholder={"Пароль"}
                    underlineColorAndroid="transparent"
                    type={"custom"}
                    maxLength={30}
                    value={this.state.user.password}
                    handleChange={text => this.handleChange("password", text)}
                    secureTextEntry={true}
                  />
                  <TextInputMask
                    style={[styles.input, styles.mt44, styles.mb15]}
                    placeholder={"+7 (000) 000 00 00"}
                    underlineColorAndroid="transparent"
                    type={"custom"}
                    keyboardType={"numeric"}
                    maxLength={18}
                    // placeholderTextColor="rgb(37, 44, 50, 0.6)"
                    options={{ mask: "+7 (999) 999-99-99" }}
                    value={this.state.user.phone}
                    onChangeText={text => this.handleChange("phone", text)}
                  />
                  {this.props.auth.user_phone &&
                  this.props.auth.user_phone !== "" ? null : (
                    <Text style={styles.information}>
                      Прикрепите заранее номер Вашего мобильного телефона, чтобы
                      не вводить его в будущем
                    </Text>
                  )}
                  {this.props.error &&
                  this.props.error.screen === "ProfileEditScreen" ? (
                    <Text style={styles.errorText}>
                      {this.props.error.text}
                    </Text>
                  ) : null}
                  <YellowButton
                    text="Сохранить изменения"
                    width="100%"
                    action={this.updateProfile}
                  />
                </View>
              </ScrollView>
            </KeyboardAvoidingView>
          </View>
        </TouchableWithoutFeedback>
      );
    }
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
    paddingHorizontal: scale(24),
    marginTop: scale(24),
    marginBottom: scaleVertical(16)
  },
  containerList: {
    width: "100%"
  },
  avatarCircle: {
    width: scale(84),
    height: scale(84),
    borderRadius: scale(42),
    backgroundColor: Theme.colors.yellow,
    display: "flex",
    alignContent: "center",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: scaleVertical(10)
  },
  avatarInitials: {
    color: "rgb(255, 255, 255)",
    fontSize: Theme.fonts.sizes.h4
  },
  yellowSmallText: {
    fontSize: scale(13),
    color: Theme.colors.yellow,
    fontFamily: "PTRootUIMedium"
  },
  input: {
    shadowOffset: {
      width: 2,
      height: 2
    },
    shadowRadius: 4,
    shadowOpacity: 1.0,
    elevation: 4,
    shadowColor: Theme.colors.gray10,
    height: scale(52),
    width: "100%",
    fontFamily: "PTRootUIRegular",
    marginTop: scaleVertical(15),
    borderRadius: scale(8),
    paddingHorizontal: scale(12),
    backgroundColor: "rgb(255, 255, 255)",
    color: Theme.colors.grayDark,
    fontSize: Theme.fonts.sizes.h4
  },
  inputDescription: {
    fontFamily: "PTRootUIMedium",
    fontSize: scale(13),
    color: Theme.colors.gray40,
    marginTop: scaleVertical(8),
    marginBottom: scaleVertical(28)
  },
  information: {
    fontFamily: "PTRootUIRegular",
    fontSize: scale(11),
    color: Theme.colors.gray40,
    lineHeight: scale(15),
    marginBottom: scaleVertical(24),
    textAlign: "center"
  },
  mt44: {
    marginTop: scaleVertical(44)
  },
  iconEdit: {
    width: scale(12),
    height: scale(12),
    marginRight: scale(4)
  },
  row: {
    display: "flex",
    flexDirection: "row",
    alignContent: "center",
    alignItems: "center"
  },
  mb15: {
    marginBottom: scaleVertical(15)
  },
  errorText: {
    color: Theme.colors.red,
    fontSize: Theme.fonts.sizes.p4
  }
});

const mapStateToProps = state => {
  const { loader, auth, error } = state;
  return {
    auth,
    error
  };
};

const mapDispatchToProps = dispatch => {
  return {
    updateAuth: bindActionCreators(updateAuth, dispatch),
    updateProfile: bindActionCreators(updateProfile, dispatch)
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProfileEditScreen);
