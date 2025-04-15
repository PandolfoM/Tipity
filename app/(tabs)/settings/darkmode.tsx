import { ThemedView } from "@/components/ThemedView";
import SettingsOption from "@/components/ui/SettingsOption";
import { useApp } from "@/context/AppContext";
import storage from "@/utils/storage";
import React from "react";
import { Appearance, ColorSchemeName, useColorScheme } from "react-native";

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
      <SettingsOption
        name="Dark Mode"
        value={themeColor === "dark"}
        onValueChange={(value) => setDarkMode(value)}
      />
      <SettingsOption
        name="Use Device Setting"
        value={themeColor === "auto"}
        onValueChange={(value) => setAutoMode(value)}
      />
    </ThemedView>
  );
}
