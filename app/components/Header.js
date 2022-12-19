import React from "react";
import { StyleSheet, Switch, Text, useColorScheme, View } from "react-native";
import sizes from "../config/sizes";
import useDarkMode from "../hooks/useDarkMode";

function Header(props) {
  const { isRounding, setIsRounding, setBillTotal } = props;
  const colorScheme = useColorScheme();
  const isDarkMode = useDarkMode(colorScheme);

  return (
    <View style={styles.header}>
      <View style={styles.roundContainer}>
        <Switch
          value={isRounding}
          style={styles.switch}
          trackColor={{ false: isDarkMode.secondary, true: isDarkMode.accent }}
          onValueChange={() => setIsRounding(!isRounding)}
        />
        <Text style={[styles.roundText, { color: isDarkMode.white }]}>
          Round Up
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: sizes.sm,
    marginBottom: sizes.xs,
  },
  roundContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  roundText: {
    fontSize: sizes.fsm,
    paddingLeft: sizes.sm,
  },
  switch: {
    transform: [{ scale: 0.8 }],
  },
});

export default Header;
