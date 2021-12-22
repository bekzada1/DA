import { Theme } from "./theme";
// import { Platform } from "react-native";
import { scaleVertical, scale } from ".";
export const StylePanel = {
  container: {
    flex: 1,
    backgroundColor: "rgb(255, 255, 255)",
    alignItems: "center"
  },
  containerInner: {
    flex: 1,
    width: scale(343)
  },
  middleView: {
    flex: 1,
    justifyContent: "center",
    alignContent: "center",
    backgroundColor: "rgb(255, 255, 255)"
  }
};
