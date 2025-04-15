import { ThemedView } from "@/components/ThemedView";
import SettingsFolder from "@/components/ui/SettingsFolder";
import SettingsOption from "@/components/ui/SettingsOption";
import { useSettings } from "@/context/SettingsContext";
import React from "react";

function Display() {
  const { keepAwake, setKeepAwake } = useSettings();

  return (
    <ThemedView style={[{ flex: 1 }]}>
      <SettingsOption
        name="Keep Awake"
        value={keepAwake}
        onValueChange={() => setKeepAwake(!keepAwake)}
      />
      <SettingsFolder title="Dark Mode" url="/settings/darkmode" />
    </ThemedView>
  );
}

export default Display;
