import { AsyncStorage } from "react-native";
import instance from "./axios";

const saveItem = async (name, value) => {
  try {
    const itemValue = name === "token" ? value : JSON.stringify(value);
    await AsyncStorage.setItem(name, itemValue);
    if (name == "token")
      instance.defaults.headers.common["Authorization"] = value;
  } catch (error) {
    console.log("AsyncStorage Error: " + error.message);
  }
};

const getItem = async name => {
  let token = await AsyncStorage.getItem(name);
  try {
    const item = JSON.parse(token);
    return item;
  } catch (error) {
    return token;
  }
};

const removeItem = async name => {
  try {
    await AsyncStorage.removeItem(name);
  } catch (error) {
    console.log("AsyncStorage Error: " + error.message);
  }
};

module.exports = {
  saveItem,
  getItem,
  removeItem
};
