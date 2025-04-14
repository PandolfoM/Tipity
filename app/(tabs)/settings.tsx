import React from "react";
import { ThemedView } from "@/components/ThemedView";
import { Text } from "@/components/ThemedText";
import {
  Appearance,
  ColorSchemeName,
  SectionList,
  StyleSheet,
} from "react-native";
import sizes from "@/config/sizes";
import RadioButton from "@/components/RadioButton";
import { useApp } from "@/context/AppContext";
import storage from "@/utils/storage";

const data: { title: string; data: ("auto" | "dark" | "light")[] }[] = [
  { title: "Appearance", data: ["auto", "dark", "light"] },
];

function Settings() {
  const { themeColor, setThemeColor } = useApp();
  const styles = makeStyles();

  const setColorScheme = (name: "auto" | "dark" | "light") => {
    const color = name === "auto" ? null : name;

    setThemeColor(name);
    Appearance.setColorScheme(color as ColorSchemeName);
    storage.storeData("darkMode", color);
  };

  return (
    <ThemedView style={[{ flex: 1 }]}>
      <Text style={styles.header} type="title">
        Settings
      </Text>
      <SectionList
        sections={data}
        keyExtractor={(item, i) => item + i}
        renderItem={({ item }) => <RadioButton name={item} />}
        renderSectionHeader={({ section: { title } }) => (
          <Text style={styles.title}>{title}</Text>
        )}
      />
    </ThemedView>
  );
}

const makeStyles = () =>
  StyleSheet.create({
    header: {
      paddingLeft: sizes.sm,
    },
    title: {
      textAlign: "center",
      fontWeight: 500,
      fontSize: sizes.fmd,
    },
  });

export default Settings;
