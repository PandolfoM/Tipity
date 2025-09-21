import React from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Appearance,
  ColorSchemeName,
} from "react-native";
import { Text } from "./ThemedText";
import { useApp } from "@/context/AppContext";
import storage from "@/utils/storage";
import { useThemeColor } from "@/hooks/useThemeColors";

type RadioButtonProps = {
  name: "auto" | "dark" | "light";
};

function RadioButton({ name }: RadioButtonProps) {
  const { themeColor, setThemeColor } = useApp();
  const accentColor = useThemeColor({}, "accent");

  const setColorScheme = () => {
    const color = name === "auto" ? null : name;

    setThemeColor(name);
    Appearance.setColorScheme(color as ColorSchemeName);
    storage.storeData("darkMode", color);
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
              borderColor: accentColor,
            },
          ]}>
          {themeColor === name && (
            <View
              style={[
                styles.options,
                {
                  backgroundColor: accentColor,
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
