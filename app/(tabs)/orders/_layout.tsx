import { Stack } from "expo-router";
import { useThemeColor } from "@/hooks/useThemeColors";
import { getHeaderTitle, Header } from "@react-navigation/elements";

export default function SettingsLayout() {
  const backgroundColor = useThemeColor({}, "background");
  const whiteColor = useThemeColor({}, "white");

  return (
    <Stack
      screenOptions={{
        headerStyle: {
          backgroundColor,
        },
        headerBackTitleStyle: {
          fontSize: 16,
          fontWeight: "bold",
          color: "#fff",
        },
        headerTintColor: whiteColor,
        pressOpacity: 0,
        header: ({ options, route, back }: any) => (
          <Header
            {...options}
            back={back}
            title={getHeaderTitle(options, route.name)}
          />
        ),
      }}>
      <Stack.Screen name="index" options={{ title: "Past Tabs" }} />
    </Stack>
  );
}
