import { scale, scaleVertical } from "./index";
const FontBaseValue = scale(18);
export const Theme = {
  colors: {
    gray10: "rgba(37, 44, 50, 0.1)",
    gray20: "rgba(37, 44, 50, 0.2)",
    gray40: "rgba(37, 44, 50, 0.4)",
    gray60: "rgba(37, 44, 50, 0.6)",
    grayDark: "#252C32",
    yellow: "rgb(238, 198, 67)", //#EEC643
    green: "#3EC25F",
    checkboxGray: "#373737",
    red: "#DF443A",
    bcground: "#2B2B2B"
  },
  verticals: {
    sizes: {
      pt16: scaleVertical(16),
      pt30: scaleVertical(30),
      pt40: scaleVertical(40),
      pt50: scaleVertical(50),
      pt87: scaleVertical(87)
    }
  },
  fonts: {
    sizes: {
      h1: scale(28),
      h2: scale(26),
      h3: scale(24),
      h4: scale(22),
      h5: scale(20),
      h6: scale(18),
      p6: scale(16),
      p5: scale(15),
      p4: scale(14),
      p3: scale(12),
      p2: scale(11),
      p1: scale(10),
      base: FontBaseValue,
      small: FontBaseValue * 0.8,
      medium: FontBaseValue,
      large: FontBaseValue * 1.2,
      xlarge: FontBaseValue / 0.75,
      xxlarge: FontBaseValue * 1.6
    },
    lineHeights: {
      medium: 18,
      big: 24
    }
  }
};
