import React from "react";
import { ThemedView } from "@/components/ThemedView";
import SettingsFolder from "@/components/ui/SettingsFolder";

export default function Settings() {
  return (
    <ThemedView style={[{ flex: 1 }]}>
      <SettingsFolder title="Display" url="/settings/display" />
    </ThemedView>
  );
}
