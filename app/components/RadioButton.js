import React, { useState } from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  useColorScheme,
} from "react-native";
import useDarkMode from "../hooks/useDarkMode";
import Text from "./Text";

function RadioButton({ name, appearance, setAppearance }) {
  const colorScheme = useColorScheme();
  const isDarkMode = useDarkMode(colorScheme);

  return (
    <View style={styles.container}>
      <Text style={{ color: isDarkMode.white }}>{name}</Text>
      <TouchableOpacity
        style={[styles.outer, { borderColor: isDarkMode.accent }]}
        onPress={() => setAppearance(name)}>
        {appearance === name && (
          <View
            style={[styles.options, { backgroundColor: isDarkMode.accent }]}
          />
        )}
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  outer: {
    width: 25,
    height: 25,
    borderWidth: 2,
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
    margin: 10,
  },
  options: {
    width: 15,
    height: 15,
    margin: 10,
    borderRadius: 10,
  },
});

export default RadioButton;
