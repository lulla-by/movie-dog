import { DefaultTheme } from "styled-components";

const colors = {
  brown1: "#fdfaf8",
  brown2: "#e8cdba",
  brown3: "#d7ac8b",
  brown4: "#cc956c",
  brown5: "#c58555",
  brown6: "#aa7249",
  brown7: "#865a3a",
  brown8: "#62422a",
  brown9: "#1a120b",
  gray1: "#767676",
  gray2: "#505050",
  black: "#252525",
  gray0: "#e0e0e0",
  correct: "#57c800",
  error: "#f24f4f",
  info: "#1b86e9",
  warning: "#f7e140",
  white: "#ffffff",
};

const fontSize = {
  headline1: "2.25rem",
  headline2: "1.5rem",
  headline3: "1.25rem",
  headline4: "1.125rem",
  headline5: "1rem",
  discription: "1rem",
};

export type ColorTypes = typeof colors;
export type FontSizeTypes = typeof fontSize;


const theme: DefaultTheme = {
  colors,
  fontSize,
};

export default theme;
