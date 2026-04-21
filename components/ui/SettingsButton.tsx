import React, { useState } from "react";
import { Pressable, StyleSheet, View } from "react-native";
import { Text } from "@/components/ThemedText";
import sizes from "@/config/sizes";
import Tooltip from "./Tooltip";
import { useThemeColor } from "@/hooks/useThemeColors";
import { MaterialCommunityIcons } from "@expo/vector-icons";

type OptionProps = {
  name: string;
  info?: string;
  onPress: () => Promise<void>;
};

export default function SettingsOption({ name, info, onPress }: OptionProps) {
  const [showTooltip, setShowTooltip] = useState(false);
  const accentColor = useThemeColor({}, "accent");
  const bgColor = useThemeColor({}, "background");

  const handlePress = async () => {
    if (onPress) {
      await onPress();
    }
  };

  return (
    <Pressable style={styles.roundContainer} onPress={handlePress}>
      <View
        style={[
          styles.button,
          {
            backgroundColor: bgColor,
            borderColor: accentColor,
          },
        ]}
      >
        <MaterialCommunityIcons
          name="star"
          size={sizes.md}
          color={accentColor}
        />
        <Text type="defaultSemiBold" style={{ alignSelf: "flex-end" }}>
          {name}
        </Text>
        {info && (
          <Tooltip
            visible={showTooltip}
            onToggle={() => setShowTooltip((prev) => !prev)}
            text={info}
          />
        )}
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: sizes.md,
    paddingVertical: sizes.sm,
    borderRadius: sizes.sm,
    borderWidth: sizes.xxs,
    gap: sizes.sm,
  },
  roundContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: sizes.sm,
    paddingVertical: sizes.sm,
  },
});
