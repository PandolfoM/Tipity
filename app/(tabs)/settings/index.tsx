import React from "react";
import { ThemedView } from "@/components/ThemedView";
import SettingsFolder from "@/components/ui/SettingsFolder";
import SettingsOption from "@/components/ui/SettingsOption";
import { useSettings } from "@/context/SettingsContext";

export default function Settings() {
  const { saveBills, setSaveBills } = useSettings();

  return (
    <ThemedView style={[{ flex: 1 }]}>
      <SettingsOption
        name="Save Past Tabs"
        value={saveBills}
        onValueChange={() => setSaveBills(!saveBills)}
      />
      <SettingsFolder title="Display" url="/settings/display" />
    </ThemedView>
  );
}
