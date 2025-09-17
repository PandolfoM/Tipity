import React from "react";
import { ThemedView } from "@/components/ThemedView";
import SettingsFolder from "@/components/ui/SettingsFolder";
import SettingsOption from "@/components/ui/SettingsOption";
import { useSettings } from "@/context/SettingsContext";

export default function Settings() {
  const { aiExtractTotal, setAiExtractTotal } = useSettings();
  return (
    <>
      <ThemedView style={{ flex: 1 }}>
        <SettingsOption
          name="AI Receipt Total Extraction"
          info="Extracts the total from your receipt photo using AI. This requires an internet connection and may be slower than local processing, but provides higher accuracy."
          settingKey="aiExtractTotal"
          value={aiExtractTotal}
          onValueChange={setAiExtractTotal}
        />
        <SettingsFolder title="Display Settings" url="/settings/display" />
        <SettingsFolder title="Past Tabs" url="/settings/pasttabs" />
      </ThemedView>
    </>
  );
}
