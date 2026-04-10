import React from "react";
import { ThemedView } from "@/components/ThemedView";
import SettingsFolder from "@/components/ui/SettingsFolder";
import SettingsOption from "@/components/ui/SettingsOption";
import SettingsButton from "@/components/ui/SettingsButton";
import { useSettings } from "@/context/SettingsContext";

export default function Settings() {
  const { aiExtractTotal, setAiExtractTotal, adsDisabled, purchaseRemoveAds } =
    useSettings();
  return (
    <>
      <ThemedView style={{ flex: 1 }}>
        {!adsDisabled && (
          <SettingsButton name="Remove Ads" onPress={purchaseRemoveAds} />
        )}
        <SettingsOption
          name="AI Receipt Total Extraction"
          info={`Extracts the total from your receipt photo using AI. This requires an internet connection and may be slower than local processing, but provides higher accuracy.\n\n(5 minute cooldown between uses)`}
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
