import React from "react";
import { ThemedView } from "@/components/ThemedView";
import { Text } from "@/components/ThemedText";
import { SectionList, StyleSheet, TouchableOpacity } from "react-native";
import sizes from "@/config/sizes";
import RadioButton from "@/components/RadioButton";

const data: { title: string; data: ("auto" | "dark" | "light")[] }[] = [
  { title: "Appearance", data: ["auto", "dark", "light"] },
];

function Settings() {
  const styles = makeStyles();

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
