import { Stack } from "expo-router";
import { useThemeColor } from "@/hooks/useThemeColors";

export default function SettingsLayout() {
  const backgroundColor = useThemeColor({}, "background");

  return (
    <Stack
      screenOptions={{
        headerStyle: {
          backgroundColor,
        },
      }}>
      <Stack.Screen name="index" options={{ title: "Settings" }} />
      <Stack.Screen name="darkmode" options={{ title: "Dark Mode" }} />
      <Stack.Screen name="display" options={{ title: "Display" }} />
    </Stack>
  );
}
