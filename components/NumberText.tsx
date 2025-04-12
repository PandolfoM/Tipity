import { useApp } from "@/context/AppContext";
import { useThemeColor } from "@/hooks/useThemeColors";
import React from "react";
import { StyleSheet, Text, useWindowDimensions } from "react-native";

type Props = {
  number?: number | string;
  style?: any;
};

function NumberText({ number = 0, style, ...props }: Props) {
  const { isRounding } = useApp();
  const { fontScale } = useWindowDimensions();
  const accentColor = useThemeColor({}, "accent");
  const styles = makeStyles(fontScale);

  return (
    <Text
      style={[styles.container, { color: accentColor }, style]}
      adjustsFontSizeToFit
      numberOfLines={1}>
      $
      {isRounding
        ? Math.ceil(Number(number)).toLocaleString(undefined, {
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

const makeStyles = (fontScale: number) =>
  StyleSheet.create({
    container: {
      fontWeight: "bold",
      textAlign: "center",
      fontSize: 80 / fontScale,
    },
  });

export default NumberText;
