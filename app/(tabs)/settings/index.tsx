import React from "react";
import { ThemedView } from "@/components/ThemedView";
import { Text } from "@/components/ThemedText";
import { Link } from "expo-router";

export default function Settings() {
  return (
    <ThemedView style={[{ flex: 1 }]}>
      <Link href="/settings/darkmode">
        <Text>Dark Mode</Text>
      </Link>
    </ThemedView>
  );
}
