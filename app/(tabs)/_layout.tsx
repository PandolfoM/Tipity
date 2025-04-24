import React, { useEffect } from "react";
import { StyleSheet } from "react-native";
import { TabList, Tabs, TabSlot, TabTrigger } from "expo-router/ui";
import { HapticTab } from "@/components/HapticTab";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useThemeColor } from "@/hooks/useThemeColors";
import { useSettings } from "@/context/SettingsContext";
import { activateKeepAwakeAsync, deactivateKeepAwake } from "expo-keep-awake";
import { Text } from "@/components/ThemedText";
import sizes from "@/config/sizes";
import { usePathname } from "expo-router";

export default function TabLayout() {
  const { keepAwake, saveBills } = useSettings();
  const whiteColor = useThemeColor({}, "white");
  const accentColor = useThemeColor({}, "accent");
  const backgroundColor = useThemeColor({}, "background");
  const pathname = usePathname();

  useEffect(() => {
    if (keepAwake) {
      activateKeepAwakeAsync();
    } else {
      deactivateKeepAwake();
    }
  }, [keepAwake]);

  const isActive = (route: string) => pathname === route;

  return (
    <Tabs>
      <TabSlot />
      <TabList
        style={[
          styles.tabList,
          { backgroundColor, borderTopColor: `${whiteColor}10` },
        ]}>
        <TabTrigger
          name="settings"
          href="/settings"
          asChild
          style={[styles.trigger]}>
          <HapticTab>
            <MaterialCommunityIcons
              name="cog"
              size={sizes.fmd}
              color={whiteColor}
              style={[isActive("/settings") && { color: accentColor }]}
            />
            <Text
              style={[
                styles.triggerText,
                isActive("/settings") && { color: accentColor },
              ]}>
              Settings
            </Text>
          </HapticTab>
        </TabTrigger>
        <TabTrigger name="index" href="/" asChild style={styles.trigger}>
          <HapticTab>
            <MaterialCommunityIcons
              name="calculator"
              size={sizes.fmd}
              color={whiteColor}
              style={[isActive("/") && { color: accentColor }]}
            />
            <Text
              style={[
                styles.triggerText,
                isActive("/") && { color: accentColor },
              ]}>
              Calculator
            </Text>
          </HapticTab>
        </TabTrigger>
        {saveBills && (
          <TabTrigger
            name="orders"
            href="/orders"
            asChild
            style={styles.trigger}>
            <HapticTab>
              <MaterialCommunityIcons
                name="receipt"
                size={sizes.fmd}
                color={whiteColor}
                style={[isActive("/orders") && { color: accentColor }]}
              />
              <Text
                style={[
                  styles.triggerText,
                  isActive("/orders") && { color: accentColor },
                ]}>
                Past Tabs
              </Text>
            </HapticTab>
          </TabTrigger>
        )}
      </TabList>
    </Tabs>
    // <Tabs
    //   // tabBar={(props: any) => <TabBar {...props} />}
    //   screenOptions={{
    //     tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
    //     headerShown: false,
    //     tabBarButton: HapticTab,
    //     // tabBarBackground: TabBarBackground,
    //     tabBarStyle: Platform.select({
    //       ios: {
    //         // Use a transparent background on iOS to show the blur effect
    //         backgroundColor: Colors[colorScheme ?? "light"].background,
    //         // position: "absolute",
    //       },
    //       default: {
    //         backgroundColor: Colors[colorScheme ?? "light"].background,
    //       },
    //     }),
    //   }}>
    //   <Tabs.Screen
    //     name="settings"
    //     options={{
    //       title: "Settings",
    //       tabBarIcon: () => (
    //         <MaterialCommunityIcons
    //           name="cog"
    //           size={sizes.md}
    //           color={whiteColor}
    //         />
    //       ),
    //     }}
    //   />
    //   <Tabs.Screen
    //     name="index"
    //     options={{
    //       title: "Calculator",
    //       tabBarIcon: () => (
    //         <MaterialCommunityIcons
    //           name="calculator"
    //           size={sizes.md}
    //           color={whiteColor}
    //         />
    //       ),
    //     }}
    //   />
    //   <Tabs.Screen
    //     name="orders"
    //     options={{
    //       title: "Past Tabs",
    //       href: !saveBills ? null : "/orders",
    //       tabBarIcon: () => (
    //         <MaterialCommunityIcons
    //           name="receipt"
    //           size={sizes.md}
    //           color={whiteColor}
    //         />
    //       ),
    //     }}
    //   />
    // </Tabs>
  );
}

const styles = StyleSheet.create({
  tabList: {
    height: 80,
    borderTopWidth: 1,
    paddingTop: 10,
    justifyContent: "space-around",
    alignItems: "flex-start",
  },
  trigger: {
    flexDirection: "column",
    alignItems: "center",
  },
  triggerText: {
    fontSize: sizes.fxs,
  },
});
