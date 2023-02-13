import React from "react";
import { StyleSheet, Text, useWindowDimensions } from "react-native";
import useDarkMode from "../hooks/useDarkMode";

function FixedText({ number = 0, isRounding, style }) {
  const isDarkMode = useDarkMode();
  const { fontScale } = useWindowDimensions();
  const styles = makeStyles(fontScale);

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

const makeStyles = (fontScale) =>
  StyleSheet.create({
    container: {
      fontWeight: "bold",
      textAlign: "center",
      fontWeight: "bold",
      fontSize: 80 / fontScale,
    },
  });

export default FixedText;
