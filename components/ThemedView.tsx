import { useThemeColor } from "@/hooks/useThemeColors";
import { type ViewProps } from "react-native";
import { Edge, SafeAreaView } from "react-native-safe-area-context";

export type ThemedViewProps = ViewProps & {
  lightColor?: string;
  darkColor?: string;
  edges?: Edge[];
};

export function ThemedView({
  style,
  lightColor,
  darkColor,
  edges = [],
  ...otherProps
}: ThemedViewProps) {
  const backgroundColor = useThemeColor(
    { light: lightColor, dark: darkColor },
    "background",
  );

  return (
    <SafeAreaView
      edges={edges}
      style={[{ backgroundColor }, style]}
      {...otherProps}
    />
  );
}
