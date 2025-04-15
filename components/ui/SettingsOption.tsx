import React from "react";
import { StyleSheet, View } from "react-native";
import { Text } from "@/components/ThemedText";
import Switch from "@/components/Switch";
import sizes from "@/config/sizes";

type OptionProps = {
  name: string;
  value: boolean;
  onValueChange: ((value: boolean) => Promise<void> | void) | null | undefined;
};

export default function SettingsOption({
  name,
  value,
  onValueChange,
}: OptionProps) {
  return (
    <View style={styles.roundContainer}>
      <Text type="defaultSemiBold">{name}</Text>
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
