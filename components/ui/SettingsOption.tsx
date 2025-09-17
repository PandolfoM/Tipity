import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import { Text } from "@/components/ThemedText";
import Switch from "@/components/Switch";
import sizes from "@/config/sizes";
import Tooltip from "./Tooltip";

type OptionProps = {
  name: string;
  value: boolean;
  info?: string;
  onValueChange: ((value: boolean) => Promise<void> | void) | null | undefined;
};

export default function SettingsOption({
  name,
  value,
  info,
  onValueChange,
}: OptionProps) {
  const [showTooltip, setShowTooltip] = useState(false);
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
      <Switch value={value} onValueChange={onValueChange} />
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
