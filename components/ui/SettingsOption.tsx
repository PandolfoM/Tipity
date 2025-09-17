import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import { Text } from "@/components/ThemedText";
import Switch from "@/components/Switch";
import sizes from "@/config/sizes";
import Tooltip from "./Tooltip";
import storage from "@/utils/storage";

type OptionProps = {
  name: string;
  value: boolean;
  settingKey?: string;
  info?: string;
  onValueChange: ((value: boolean) => Promise<void> | void) | null | undefined;
};

export default function SettingsOption({
  name,
  value,
  info,
  settingKey,
  onValueChange,
}: OptionProps) {
  const [showTooltip, setShowTooltip] = useState(false);

  const saveValue = async (newValue: boolean) => {
    if (!settingKey) return;

    if (onValueChange) {
      onValueChange(newValue);
    }

    await storage.storeData(settingKey, newValue);
  };

  return (
    <View style={styles.roundContainer}>
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <Text type="defaultSemiBold">{name}</Text>
        {info && (
          <Tooltip
            visible={showTooltip}
            onToggle={() => setShowTooltip((prev) => !prev)}
            text={info}
          />
        )}
      </View>
      {settingKey ? (
        <Switch value={value} onValueChange={(v) => saveValue(v)} />
      ) : (
        <Switch value={value} onValueChange={onValueChange} />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  roundContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: sizes.sm,
    paddingVertical: sizes.sm,
  },
});
