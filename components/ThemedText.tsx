import { useThemeColor } from "@/hooks/useThemeColors";
import {
  Text as TextStock,
  type TextProps,
  StyleSheet,
  useWindowDimensions,
} from "react-native";

export type ThemedTextProps = TextProps & {
  lightColor?: string;
  darkColor?: string;
  type?: "default" | "title" | "defaultSemiBold" | "subtitle" | "link";
};

export function Text({
  style,
  lightColor,
  darkColor,
  type = "default",
  ...rest
}: ThemedTextProps) {
  const color = useThemeColor({ light: lightColor, dark: darkColor }, "text");
  const { fontScale } = useWindowDimensions();
  const styles = makeStyles(fontScale);

  return (
    <TextStock
      style={[
        { color },
        type === "default" ? styles.default : undefined,
        type === "title" ? styles.title : undefined,
        type === "defaultSemiBold" ? styles.defaultSemiBold : undefined,
        type === "subtitle" ? styles.subtitle : undefined,
        type === "link" ? styles.link : undefined,
        style,
      ]}
      {...rest}
    />
  );
}

const makeStyles = (fontScale: number) =>
  StyleSheet.create({
    default: {
      fontSize: 20 / fontScale,
      lineHeight: 20,
    },
    defaultSemiBold: {
      fontSize: 16 / fontScale,
      lineHeight: 16,
      fontWeight: "600",
    },
    title: {
      fontSize: 25 / fontScale,
      fontWeight: "bold",
      lineHeight: 35,
    },
    subtitle: {
      fontSize: 20 / fontScale,
    },
    link: {
      fontSize: 16 / fontScale,
      lineHeight: 16,
      color: "#0a7ea4",
    },
  });
