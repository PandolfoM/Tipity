import { StyleSheet, TouchableOpacity, View } from "react-native";
import { useApp } from "@/context/AppContext";
import { Text } from "@/components/ThemedText";
import sizes from "@/config/sizes";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useState } from "react";
import { useThemeColor } from "@/hooks/useThemeColors";
import Switch from "@/components/Switch";

function Header() {
  const { isRounding, setIsRounding } = useApp();

  return (
    <View style={styles.header}>
      <View style={styles.roundContainer}>
        <Switch
          value={isRounding}
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
});

export default Header;
