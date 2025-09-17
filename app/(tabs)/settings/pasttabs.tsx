import ConfirmModal from "@/components/ConfirmModal";
import { ThemedView } from "@/components/ThemedView";
import SettingsOption from "@/components/ui/SettingsOption";
import { useApp } from "@/context/AppContext";
import { useSettings } from "@/context/SettingsContext";
import storage from "@/utils/storage";
import React, { useState } from "react";

function Pasttabs() {
  const { saveBills, setSaveBills, autoSaveTabs, setAutoSaveTabs } =
    useSettings();
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
          settingKey="saveBills"
          value={saveBills}
          onValueChange={toggleSaveBills}
        />
        {saveBills && (
          <SettingsOption
            settingKey="autoSaveTabs"
            name="Auto Save"
            value={autoSaveTabs}
            onValueChange={(value) => setAutoSaveTabs(value)}
          />
        )}
      </ThemedView>
    </>
  );
}

export default Pasttabs;
