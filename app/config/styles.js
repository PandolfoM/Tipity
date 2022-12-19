import { Dimensions } from "react-native";

import colors from "./colors";
import sizes from "./sizes";

const height = Dimensions.get("screen").height;
export default {
  colors,
  text: {
    color: colors.white,
    fontSize: height >= 1194 ? sizes.fxl : sizes.fmd,
    fontWeight: "500",
    textAlign: "center",
  },
};
