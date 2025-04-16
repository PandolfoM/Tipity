import { Stack } from "expo-router";
import { useThemeColor } from "@/hooks/useThemeColors";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Pressable } from "react-native";
import { getHeaderTitle, Header } from "@react-navigation/elements";
import sizes from "@/config/sizes";

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
        headerLeft: (props: any) =>
          props.canGoBack && (
            <Pressable {...props}>
              <MaterialCommunityIcons
                name="arrow-left"
                style={[
                  {
                    color: whiteColor,
                    fontSize: sizes.flg,
                    width: 50,
                  },
                ]}
              />
            </Pressable>
          ),
        header: ({ options, route, back }: any) => (
          <Header
            {...options}
            back={back}
            title={getHeaderTitle(options, route.name)}
          />
        ),
      }}>
      <Stack.Screen name="index" options={{ title: "Settings" }} />
      <Stack.Screen name="darkmode" options={{ title: "Dark Mode" }} />
      <Stack.Screen name="display" options={{ title: "Display" }} />
    </Stack>
  );
}
