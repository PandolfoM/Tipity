import React from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import useDarkMode from "../hooks/useDarkMode";
import Text from "./Text";

function RadioButton({ name, darkMode, setDarkMode }) {
  const isDarkMode = useDarkMode();

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={{
          flexDirection: "row",
          justifyContent: "space-evenly",
          alignItems: "center",
        }}
        onPress={() => setDarkMode(name)}>
        <Text style={[styles.text, { color: isDarkMode.white }]}>{name}</Text>
        <View style={[styles.outer, { borderColor: isDarkMode.accent }]}>
          {darkMode === name && (
            <View
              style={[styles.options, { backgroundColor: isDarkMode.accent }]}
            />
          )}
        </View>
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
  text: {
    textTransform: "capitalize",
  },
});

export default RadioButton;
