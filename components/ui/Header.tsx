import { StyleSheet, Switch, TouchableOpacity, View } from "react-native";
import { useApp } from "@/context/AppContext";
import { Text } from "@/components/ThemedText";
import sizes from "@/config/sizes";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useState } from "react";
import { useThemeColor } from "@/hooks/useThemeColors";

function Header() {
  const { isRounding, setIsRounding } = useApp();
  const secColor = useThemeColor({}, "secondary");
  const accentColor = useThemeColor({}, "accent");

  return (
    <View style={styles.header}>
      <View style={styles.roundContainer}>
        <Switch
          value={isRounding}
          style={styles.switch}
          trackColor={{
            false: secColor,
            true: accentColor,
          }}
          onValueChange={() => setIsRounding(!isRounding)}
        />
        <Text type="defaultSemiBold" style={[styles.roundText]}>
          Round Up
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    width: "100%",
    height: "4%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: sizes.sm,
    marginBottom: sizes.xs,
  },
  roundContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  roundText: {
    paddingLeft: sizes.sm,
  },
  switch: {
    transform: [{ scale: 0.8 }],
  },
});

export default Header;
