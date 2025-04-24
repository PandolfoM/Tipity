import React, { useState } from "react";
import { ThemedView } from "@/components/ThemedView";
import SettingsFolder from "@/components/ui/SettingsFolder";
import SettingsOption from "@/components/ui/SettingsOption";
import { useSettings } from "@/context/SettingsContext";
import ConfirmModal from "@/components/ConfirmModal";
import storage from "@/utils/storage";
import { useApp } from "@/context/AppContext";

export default function Settings() {
  const { saveBills, setSaveBills } = useSettings();
  const { setOrders, orders } = useApp();
  const [isVisible, setIsVisible] = useState<boolean>(false);

  const toggleSaveBills = () => {
    if (saveBills && orders.length > 0) return setIsVisible(true);
    setSaveBills(!saveBills);
  };

  const onConfirm = () => {
    storage.removeData("orders");
    setOrders([]);
    setSaveBills(false);
    setIsVisible(false);
  };

  return (
    <>
      <ConfirmModal
        visible={isVisible}
        text="Disabling past tabs will delete all saved orders. Are you sure you want to disable this feature?"
        onConfirm={onConfirm}
        onCancel={() => setIsVisible(false)}
      />
      <ThemedView style={[{ flex: 1 }]}>
        <SettingsOption
          name="Save Past Tabs"
          value={saveBills}
          onValueChange={toggleSaveBills}
        />
        <SettingsFolder title="Display" url="/settings/display" />
      </ThemedView>
    </>
  );
}
