import Switch from "@/components/Switch";
import { Text } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import sizes from "@/config/sizes";
import { useApp } from "@/context/AppContext";
import storage from "@/utils/storage";
import React from "react";
import {
  Appearance,
  ColorSchemeName,
  StyleSheet,
  useColorScheme,
  View,
} from "react-native";

type OptionProps = {
  name: string;
  value: boolean;
  onValueChange: ((value: boolean) => Promise<void> | void) | null | undefined;
};

const Option = ({ name, value, onValueChange }: OptionProps) => {
  return (
    <View style={styles.roundContainer}>
      <Text type="defaultSemiBold">{name}</Text>
      <Switch value={value} onValueChange={onValueChange} />
    </View>
  );
};

export default function Darkmode() {
  const { themeColor, setThemeColor } = useApp();
  const theme = useColorScheme();

  const setDarkMode = (value: boolean) => {
    const color = value ? "dark" : "light";

    setThemeColor(color);
    Appearance.setColorScheme(color);
    storage.storeData("darkMode", color);
  };

  const setAutoMode = (value: boolean) => {
    const color: "auto" | "dark" | "light" = value
      ? "auto"
      : (theme as "dark" | "light");

    setThemeColor(color);
    Appearance.setColorScheme(color as ColorSchemeName);
    storage.storeData("darkMode", color);
  };

  return (
    <ThemedView style={[{ flex: 1 }]}>
      <Option
        name="Dark Mode"
        value={themeColor === "dark"}
        onValueChange={(value) => setDarkMode(value)}
      />
      <Option
        name="Use Device Setting"
        value={themeColor === "auto"}
        onValueChange={(value) => setAutoMode(value)}
      />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  roundContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: sizes.sm,
    paddingVertical: sizes.sm,
  },
});
