import React from "react";
import Icon from "react-native-vector-icons/Ionicons";
import { Theme } from "../configs/theme";
import { scale } from "../configs/index";

const Checkbox = props => (
  <Icon
    name={props.checked ? "md-checkmark" : "md-checkmark"}
    size={props.checked ? scale(24) : scale(26)}
    color={props.checked ? "rgb(37, 44, 50)" : "rgba(37, 44, 50, 0.1)"}
    style={{ marginRight: scale(10) }}
  />
);

export default Checkbox;
