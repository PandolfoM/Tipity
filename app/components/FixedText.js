import React from "react";
import { Dimensions, StyleSheet, Text, useColorScheme } from "react-native";
import colors from "../config/colors";
import useDarkMode from "../hooks/useDarkMode";

const height = Dimensions.get("screen").height;
let totalFont;
if (height <= 667) {
  totalFont = 50;
} else if (height >= 1194) {
  totalFont = 180;
} else {
  totalFont = 80;
}

function FixedText({ number = 0, isRounding, style }) {
  const colorScheme = useColorScheme();
  const isDarkMode = useDarkMode(colorScheme);

  return (
    <Text
      style={[styles.container, { color: isDarkMode.accent }, style]}
      adjustsFontSizeToFit
      numberOfLines={1}>
      $
      {isRounding
        ? Math.ceil(number).toLocaleString(undefined, {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          })
        : number.toLocaleString(undefined, {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          })}
    </Text>
  );
}

const styles = StyleSheet.create({
  container: {
    fontWeight: "bold",
    textAlign: "center",
    fontWeight: "bold",
    fontSize: totalFont,
  },
});

export default FixedText;
