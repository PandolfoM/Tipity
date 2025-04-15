import { ThemedView } from "@/components/ThemedView";
import SettingsFolder from "@/components/ui/SettingsFolder";
import SettingsOption from "@/components/ui/SettingsOption";
import React from "react";

function Display() {
  return (
    <ThemedView style={[{ flex: 1 }]}>
      {/* <SettingsOption name="Always on"  /> */}
      <SettingsFolder title="Dark Mode" url="/settings/darkmode" />
    </ThemedView>
  );
}

export default Display;
