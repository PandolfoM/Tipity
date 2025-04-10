import React from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Appearance,
  ColorSchemeName,
  useColorScheme,
} from "react-native";
import { Text } from "./ThemedText";
import { Colors } from "@/constants/Colors";
import { useApp } from "@/context/AppContext";

type RadioButtonProps = {
  name: "auto" | "dark" | "light";
};

function RadioButton({ name }: RadioButtonProps) {
  const { themeColor, setThemeColor } = useApp();
  const colorScheme = useColorScheme();

  const setColorScheme = () => {
    const color = name === "auto" ? null : name;

    setThemeColor(name);
    Appearance.setColorScheme(color as ColorSchemeName);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={{
          flexDirection: "row",
          justifyContent: "space-evenly",
          alignItems: "center",
        }}
        onPress={setColorScheme}>
        <Text style={styles.text}>{name === null ? "Auto" : name}</Text>
        <View
          style={[
            styles.outer,
            {
              borderColor:
                colorScheme === "dark"
                  ? Colors.dark.accent
                  : Colors.light.accent,
            },
          ]}>
          {themeColor === name && (
            <View
              style={[
                styles.options,
                {
                  backgroundColor:
                    colorScheme === "dark"
                      ? Colors.dark.accent
                      : Colors.light.accent,
                },
              ]}
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
