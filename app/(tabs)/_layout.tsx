import React, { useEffect } from "react";
import { Platform, useColorScheme } from "react-native";
import { Tabs } from "expo-router";
import { HapticTab } from "@/components/HapticTab";
import { Colors } from "@/constants/Colors";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import sizes from "@/config/sizes";
import { useThemeColor } from "@/hooks/useThemeColors";
import { useSettings } from "@/context/SettingsContext";
import { activateKeepAwakeAsync, deactivateKeepAwake } from "expo-keep-awake";
import TabBar from "@/components/TabBar";

export default function TabLayout() {
  const { keepAwake } = useSettings();
  const colorScheme = useColorScheme();
  const whiteColor = useThemeColor({}, "white");

  useEffect(() => {
    if (keepAwake) {
      activateKeepAwakeAsync();
    } else {
      deactivateKeepAwake();
    }
  }, [keepAwake]);

  return (
    <Tabs
      // tabBar={(props: any) => <TabBar {...props} />}
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
        headerShown: false,
        tabBarButton: HapticTab,
        // tabBarBackground: TabBarBackground,
        tabBarStyle: Platform.select({
          ios: {
            // Use a transparent background on iOS to show the blur effect
            backgroundColor: Colors[colorScheme ?? "light"].background,
            // position: "absolute",
          },
          default: {
            backgroundColor: Colors[colorScheme ?? "light"].background,
          },
        }),
      }}>
      <Tabs.Screen
        name="settings"
        options={{
          title: "Settings",
          tabBarIcon: () => (
            <MaterialCommunityIcons
              name="cog"
              size={sizes.md}
              color={whiteColor}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="index"
        options={{
          title: "Calculator",
          tabBarIcon: () => (
            <MaterialCommunityIcons
              name="calculator"
              size={sizes.md}
              color={whiteColor}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="orders"
        options={{
          title: "Past Bills",
          tabBarIcon: () => (
            <MaterialCommunityIcons
              name="receipt"
              size={sizes.md}
              color={whiteColor}
            />
          ),
        }}
      />
    </Tabs>
  );
}
