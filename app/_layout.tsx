import { AppProvider } from "@/context/AppContext";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { Stack } from "expo-router";
import { useColorScheme } from "react-native";
import { SettingsProvider } from "@/context/SettingsContext";
import ImageProvider from "@/context/ImageProvider";

export default function RootLayout() {
  const colorScheme = useColorScheme();

  return (
    <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
      <GestureHandlerRootView>
        <SettingsProvider>
          <AppProvider>
            <ImageProvider>
              <Stack>
                <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
                <Stack.Screen
                  name="+not-found"
                  options={{ headerShown: false }}
                />
              </Stack>
            </ImageProvider>
          </AppProvider>
        </SettingsProvider>
      </GestureHandlerRootView>
    </ThemeProvider>
  );
}
