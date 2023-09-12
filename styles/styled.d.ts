import "styled-components";
import { ColorTypes, FontSizeTypes } from "./theme";

declare module "styled-components" {
  export interface DefaultTheme {
    colors: ColorTypes;
    fontSize: FontSizeTypes;
  }
}