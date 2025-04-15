import RadioButton from "@/components/RadioButton";
import { Text } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import sizes from "@/config/sizes";
import React from "react";
import { FlatList, SectionList, StyleSheet } from "react-native";

const data = ["auto", "dark", "light"];

export default function Darkmode() {
  return (
    <ThemedView style={[{ flex: 1 }]}>
      <FlatList
        data={data}
        keyExtractor={(item) => item}
        renderItem={({ item }) => (
          <RadioButton name={item as "auto" | "dark" | "light"} />
        )}
      />
    </ThemedView>
  );
}

const styles = StyleSheet.create({});
