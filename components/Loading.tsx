import { useThemeColor } from "@/hooks/useThemeColors";
import React from "react";
import { ActivityIndicator, View, StyleSheet } from "react-native";
import { BlurView } from "expo-blur";
import { useApp } from "@/context/AppContext";

type LoadingProps = {
  size?: number | "large" | "small";
  style?: object;
};

export default function Loading({ size = "large", style = {} }: LoadingProps) {
  const { loading } = useApp();
  const bgColor = useThemeColor({}, "background");
  const accentColor = useThemeColor({}, "accent");
  const overlayColor = bgColor.startsWith("#")
    ? hexToRgba(bgColor, 0.7)
    : bgColor;

  return (
    <View
      style={[styles.container, style, { display: loading ? "flex" : "none" }]}>
      <BlurView intensity={30} tint="default" style={StyleSheet.absoluteFill}>
        <View
          style={[StyleSheet.absoluteFill, { backgroundColor: overlayColor }]}
        />
      </BlurView>
      <ActivityIndicator size={size} color={accentColor} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    zIndex: 1000,
  },
});

function hexToRgba(hex: string, alpha: number) {
  let c = hex.replace("#", "");
  if (c.length === 3) c = c[0] + c[0] + c[1] + c[1] + c[2] + c[2];
  const num = parseInt(c, 16);
  return `rgba(${(num >> 16) & 255},${(num >> 8) & 255},${num & 255},${alpha})`;
}
