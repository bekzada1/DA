import React from "react";
import {
  StyleSheet,
  View,
  ScrollView,
  Text,
  TouchableOpacity,
  Image
} from "react-native";
import { Theme } from "../configs/theme";
import { scale, scaleVertical } from "../configs";

const Profile = props => (
  <ScrollView style={styles.containerList}>
    <View style={styles.container}>
      <View style={styles.avatarCircle}>
        {props.photo ? (
          <Image source={{ uri: props.photo }} />
        ) : (
          <Text style={styles.avatarInitials}>
            {props.auth.user_email && props.auth.user_email.length
              ? props.auth.user_email[0].toUpperCase()
              : null}
          </Text>
        )}
      </View>
      <TouchableOpacity
        style={styles.row}
        onPress={() => props.navigation.navigate("ProfileEditScreen")}
      >
        <Image
          style={styles.iconEdit}
          source={require("../../assets/icons/profile/edit.png")}
        />
        <Text style={styles.yellowSmallText}>Изменить фото</Text>
      </TouchableOpacity>
      {props.auth.user_name && props.auth.user_name.length ? (
        <Text style={styles.profileName}>{props.auth.user_name}</Text>
      ) : null}
      {props.auth.user_email && props.auth.user_email.length ? (
        <Text style={styles.profileInfo}>{props.auth.user_email}</Text>
      ) : null}
      {props.auth.user_phone && props.auth.user_phone.length ? (
        <Text style={styles.profileInfo}>{props.auth.user_phone}</Text>
      ) : null}

      {/* {props.auth.user_phone ? (
        <TouchableOpacity
          style={[styles.listItem, styles.mt28]}
          onPress={this.openCityPanel}
        >
          <Text style={styles.listItemText}>Добавить номер телефона</Text>
          <Image
            style={styles.icon}
            source={require("../../assets/icons/arrowright.png")}
          />
        </TouchableOpacity>
      ) : null} */}

      <TouchableOpacity
        style={[styles.listItem, styles.mt44]}
        onPress={() => props.navigation.navigate("ProfileEditScreen")}
      >
        <Text style={styles.listItemText}>Сменить пароль</Text>
        <Image
          style={styles.icon}
          source={require("../../assets/icons/arrowright.png")}
        />
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.listItem, styles.mt28]}
        onPress={props.deleteUser}
      >
        <Text style={styles.listItemRedText}>Удалить аккаунт</Text>
      </TouchableOpacity>
    </View>
  </ScrollView>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    alignContent: "center"
  },
  containerList: {
    width: scale(343),
    paddingVertical: scale(16)
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
  profileName: {
    color: Theme.colors.grayDark,
    fontFamily: "PTRootUIMedium",
    fontSize: Theme.fonts.sizes.h4,
    marginTop: scaleVertical(16)
  },
  profileInfo: {
    color: Theme.colors.gray60,
    fontFamily: "PTRootUIMedium",
    fontSize: Theme.fonts.sizes.p6,
    lineHeight: scale(20),
    marginTop: scaleVertical(8)
  },
  listItem: {
    width: "100%",
    paddingVertical: scaleVertical(16),
    borderBottomColor: Theme.colors.gray10,
    borderBottomWidth: scale(1),
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between"
  },
  listItemText: {
    fontFamily: "PTRootUIRegular",
    fontSize: scale(17),
    color: Theme.colors.grayDark
  },
  listItemRedText: {
    color: Theme.colors.red,
    fontFamily: "PTRootUIMedium",
    fontSize: scale(17)
  },
  icon: {
    width: scale(12),
    height: scale(12)
  },
  mt28: {
    marginTop: scaleVertical(28)
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
  mt44: {
    marginTop: scaleVertical(44)
  }
});

export default Profile;
