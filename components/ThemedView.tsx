import { useThemeColor } from "@/hooks/useThemeColors";
import { type ViewProps } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export type ThemedViewProps = ViewProps & {
  lightColor?: string;
  darkColor?: string;
};

export function ThemedView({
  style,
  lightColor,
  darkColor,
  ...otherProps
}: ThemedViewProps) {
  const backgroundColor = useThemeColor(
    { light: lightColor, dark: darkColor },
    "background",
  );

  return (
    <SafeAreaView
      edges={["top"]}
      style={[{ backgroundColor }, style]}
      {...otherProps}
    />
  );
}
