import { useThemeColor } from "@/hooks/useThemeColors";
import React from "react";
import { Switch as NSwitch, StyleSheet } from "react-native";

type SwitchProps = {
  value: boolean | undefined;
  onValueChange: ((value: boolean) => Promise<void> | void) | null | undefined;
};

export default function Switch({ value, onValueChange }: SwitchProps) {
  const secColor = useThemeColor({}, "secondary");
  const accentColor = useThemeColor({}, "accent");

  return (
    <NSwitch
      value={value}
      style={styles.switch}
      trackColor={{
        false: secColor,
        true: accentColor,
      }}
      onValueChange={onValueChange}
    />
  );
}

const styles = StyleSheet.create({
  switch: {
    transform: [{ scale: 0.9 }],
  },
});
