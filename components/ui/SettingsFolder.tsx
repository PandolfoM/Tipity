import { useThemeColor } from "@/hooks/useThemeColors";
import React from "react";
import { Pressable, StyleSheet } from "react-native";
import { Text } from "../ThemedText";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Link } from "expo-router";
import sizes from "@/config/sizes";

type FolderProps = {
  url: string;
  title: string;
};

export default function SettingsFolder({ url, title }: FolderProps) {
  const whiteColor = useThemeColor({}, "white");

  return (
    // @ts-ignore
    <Link href={url} asChild style={styles.option}>
      <Pressable>
        <Text type="defaultSemiBold">{title}</Text>
        <MaterialCommunityIcons
          style={[styles.icon, { color: whiteColor }]}
          name="chevron-right"
        />
      </Pressable>
    </Link>
  );
}

const styles = StyleSheet.create({
  option: {
    height: 85,
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
    paddingHorizontal: sizes.sm,
  },
  icon: {
    fontSize: sizes.flg,
    opacity: 0.3,
  },
});
